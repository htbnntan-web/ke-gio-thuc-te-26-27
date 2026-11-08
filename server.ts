import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import geminiHandler from './api/gemini.ts';
import { INITIAL_TEACHERS, INITIAL_TOS, TeacherRecord, ToRecord } from './src/seedData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DbState {
  tos: Record<string, ToRecord>;
  teachers: Record<string, TeacherRecord>;
  updatedAt: string;
}

function loadDb(): DbState {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.tos && parsed.teachers) {
        const syncedTos: Record<string, ToRecord> = {};
        for (const [k, defTo] of Object.entries(INITIAL_TOS)) {
          syncedTos[k] = parsed.tos[k]
            ? { ...defTo, ...parsed.tos[k], name: defTo.name, kind: defTo.kind, order: defTo.order }
            : JSON.parse(JSON.stringify(defTo));
        }
        const validTeachers: Record<string, TeacherRecord> = {};
        for (const [id, t] of Object.entries(parsed.teachers as Record<string, TeacherRecord>)) {
          if (syncedTos[t.to]) {
            validTeachers[id] = t;
          }
        }
        const merged: DbState = {
          tos: syncedTos,
          teachers: Object.keys(validTeachers).length ? validTeachers : JSON.parse(JSON.stringify(INITIAL_TEACHERS)),
          updatedAt: new Date().toISOString(),
        };
        saveDb(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error('Error loading db.json:', err);
  }
  const initial: DbState = {
    tos: JSON.parse(JSON.stringify(INITIAL_TOS)),
    teachers: JSON.parse(JSON.stringify(INITIAL_TEACHERS)),
    updatedAt: new Date().toISOString(),
  };
  saveDb(initial);
  return initial;
}

function saveDb(state: DbState) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    state.updatedAt = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

let dbState = loadDb();
const sseClients = new Set<express.Response>();

function broadcastState() {
  const payload = `data: ${JSON.stringify(dbState)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  app.all('/api/gemini', (req, res) => {
    void geminiHandler(req, res);
  });

  app.get('/api/state', (_req, res) => {
    res.json(dbState);
  });

  app.get('/api/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();
    res.write(`data: ${JSON.stringify(dbState)}\n\n`);
    sseClients.add(res);
    req.on('close', () => {
      sseClients.delete(res);
    });
  });

  app.post('/api/teachers/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body as TeacherRecord;
    if (!body || !body.ten) {
      res.status(400).json({ error: 'Thiếu thông tin tên giáo viên' });
      return;
    }
    dbState.teachers[id] = {
      ...body,
      updatedAt: new Date().toISOString(),
    };
    saveDb(dbState);
    broadcastState();
    res.json({ ok: true, id, teacher: dbState.teachers[id] });
  });

  app.delete('/api/teachers/:id', (req, res) => {
    const { id } = req.params;
    if (dbState.teachers[id]) {
      delete dbState.teachers[id];
      saveDb(dbState);
      broadcastState();
    }
    res.json({ ok: true });
  });

  app.post('/api/tos/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body as ToRecord;
    if (!body || !body.name) {
      res.status(400).json({ error: 'Thiếu tên tổ chuyên môn' });
      return;
    }
    dbState.tos[id] = body;
    saveDb(dbState);
    broadcastState();
    res.json({ ok: true, id, to: dbState.tos[id] });
  });

  app.post('/api/import-to/:id', (req, res) => {
    const { id } = req.params;
    const { toPatch, teachers: newTeachers } = req.body as {
      toPatch?: Partial<ToRecord>;
      teachers: Record<string, TeacherRecord>;
    };
    if (!dbState.tos[id]) {
      res.status(404).json({ error: 'Không tìm thấy tổ chuyên môn' });
      return;
    }
    if (toPatch) {
      dbState.tos[id] = {
        ...dbState.tos[id],
        ...toPatch,
        name: dbState.tos[id].name,
        kind: dbState.tos[id].kind,
        order: dbState.tos[id].order,
      };
    }
    // Remove old teachers of this department before inserting imported ones
    for (const [tid, t] of Object.entries(dbState.teachers)) {
      if (t.to === id) {
        delete dbState.teachers[tid];
      }
    }
    if (newTeachers) {
      for (const [tid, t] of Object.entries(newTeachers)) {
        dbState.teachers[tid] = { ...t, to: id, updatedAt: new Date().toISOString() };
      }
    }
    saveDb(dbState);
    broadcastState();
    res.json({ ok: true, state: dbState });
  });

  app.post('/api/import', (req, res) => {
    const { tos, teachers, mode } = req.body as {
      tos?: Record<string, ToRecord>;
      teachers?: Record<string, TeacherRecord>;
      mode?: 'replace' | 'merge';
    };
    if (!tos && !teachers) {
      res.status(400).json({ error: 'Dữ liệu nhập không hợp lệ' });
      return;
    }
    if (mode === 'replace') {
      if (tos) dbState.tos = tos;
      if (teachers) dbState.teachers = teachers;
    } else {
      if (tos) dbState.tos = { ...dbState.tos, ...tos };
      if (teachers) dbState.teachers = { ...dbState.teachers, ...teachers };
    }
    saveDb(dbState);
    broadcastState();
    res.json({ ok: true, state: dbState });
  });

  app.post('/api/reset', (_req, res) => {
    dbState = {
      tos: JSON.parse(JSON.stringify(INITIAL_TOS)),
      teachers: JSON.parse(JSON.stringify(INITIAL_TEACHERS)),
      updatedAt: new Date().toISOString(),
    };
    saveDb(dbState);
    broadcastState();
    res.json({ ok: true, state: dbState });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
