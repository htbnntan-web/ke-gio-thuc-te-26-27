import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildTeacherCsvRows,
  calc,
  COLS,
  downloadCsv,
  evalP1Value,
  fmt,
  loadMau,
  num,
  NW,
  parseXlsxWorkbook,
  slugVi,
  triggerBlobDownload,
  wsum,
  xlGvWorkbook,
  xlSchoolWorkbook,
  xlToWorkbook,
  YEARW,
} from './excelExport';
import {
  INITIAL_TEACHERS,
  INITIAL_TOS,
  PcPeriod,
  TeacherRecord,
  ToRecord,
} from './seedData';

const W1 = new Date(2026, 8, 7); // 2026-09-07

function curWeek(): number {
  const n = Math.floor((Date.now() - W1.getTime()) / 864e5 / 7) + 1;
  return Math.max(1, Math.min(NW, n));
}

function calcMaxWeek(map: Record<string, TeacherRecord>): number {
  let m = 0;
  for (const t of Object.values(map)) {
    for (let i = NW; i >= 1; i--) {
      if (wsum(t.weeks?.[i]) > 0) {
        m = Math.max(m, i);
        break;
      }
    }
  }
  return m;
}

function pcOf(p: PcPeriod[] | undefined, w: number): PcPeriod | undefined {
  return (p || []).find((x) => x.tu <= w && (x.den == null || w <= x.den));
}

function seedPc(d: TeacherRecord): TeacherRecord {
  if (Array.isArray(d.pc) && d.pc.length) return d;
  const filled: number[] = [];
  for (let i = 1; i <= NW; i++) {
    if (wsum(d.weeks?.[i])) filled.push(i);
  }
  let mw = filled[filled.length - 1];
  for (let k = filled.length - 1; k > 0; k--) {
    const a = d.weeks[filled[k]] as Record<string, any>;
    const b = d.weeks[filled[k - 1]] as Record<string, any>;
    if (COLS.every(([c]) => num(a?.[c]) === num(b?.[c]))) {
      mw = filled[k];
      break;
    }
  }
  const src: Record<string, any> = mw ? (d.weeks[mw] as any) : {};
  return {
    ...d,
    pc: [
      {
        tu: 1,
        den: null,
        lop: d.lop || '',
        kn: d.kiemNhiem || '',
        mau: Object.fromEntries(COLS.map(([c]) => [c, num(src[c])])),
        ghiChu: filled.length ? `Phân công đầu năm (số tiết mẫu lấy theo tuần ${mw})` : '',
      },
    ],
  };
}

function rng(a: number, b: number | null): string {
  return b == null ? (a === 1 ? '' : 'từ tuần ' + a) : a === b ? 'tuần ' + a : `tuần ${a}–${b}`;
}

function composePc(p: PcPeriod[], f: 'lop' | 'kn'): string {
  if (p.length <= 1) return p[0]?.[f] ?? '';
  const g: { v: string; tu: number; den: number | null }[] = [];
  p.forEach((x) => {
    const v = (x[f] || '').trim();
    const l = g[g.length - 1];
    if (l && l.v === v) {
      l.den = x.den;
    } else {
      g.push({ v, tu: x.tu, den: x.den });
    }
  });
  if (g.length === 1) return g[0].v;
  return g
    .filter((x) => x.v)
    .map((x) => {
      const r = rng(x.tu, x.den);
      return (r ? r[0].toUpperCase() + r.slice(1) + ': ' : '') + x.v;
    })
    .join('; ');
}

function syncPcText(d: TeacherRecord): TeacherRecord {
  const p = d.pc || [];
  if (p.length > 1) {
    return {
      ...d,
      lop: composePc(p, 'lop'),
      kiemNhiem: composePc(p, 'kn'),
    };
  }
  if (p.length === 1) {
    return {
      ...d,
      lop: p[0].lop,
      kiemNhiem: p[0].kn,
    };
  }
  return d;
}

function SgnValue({ n }: { n: number }) {
  const rounded = Math.round(n * 10) / 10;
  const cls = rounded < 0 ? 'neg' : rounded > 0 ? 'pos' : 'zero';
  return (
    <span className={cls}>
      {rounded > 0 ? '+' : ''}
      {fmt(rounded)}
    </span>
  );
}

export default function App() {
  const [tos, setTos] = useState<Record<string, ToRecord>>(() => {
    try {
      const raw = localStorage.getItem('htb_kegio_state_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.tos) return { ...INITIAL_TOS, ...parsed.tos };
      }
    } catch {
      // ignore storage error
    }
    return INITIAL_TOS;
  });
  const [teachers, setTeachers] = useState<Record<string, TeacherRecord>>(() => {
    try {
      const raw = localStorage.getItem('htb_kegio_state_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.teachers) return { ...INITIAL_TEACHERS, ...parsed.teachers };
      }
    } catch {
      // ignore storage error
    }
    return INITIAL_TEACHERS;
  });
  const [syncText, setSyncText] = useState<string>('Đã đồng bộ');
  const [syncOk, setSyncOk] = useState<boolean>(true);

  const [view, setView] = useState<string>('truong');
  const [uptoWeek, setUptoWeek] = useState<number>(() => {
    const mw = calcMaxWeek(INITIAL_TEACHERS);
    return Math.max(1, Math.min(NW, mw || curWeek()));
  });
  const [searchQ, setSearchQ] = useState<string>('');
  const [sortBy, setSortBy] = useState<'to' | 'lack' | 'over'>('to');

  const [selId, setSelId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TeacherRecord | null>(null);
  const [dirtyWeeks, setDirtyWeeks] = useState<Set<number>>(new Set());
  const [leaveArmed, setLeaveArmed] = useState<boolean>(false);

  const [saveBanner, setSaveBanner] = useState<{ kind: 'ok' | 'err' | 'warn'; text: string } | null>(
    null
  );
  const [pcBanner, setPcBanner] = useState<{ kind: 'ok' | 'err' | 'warn'; text: string } | null>(
    null
  );
  const [xlBanner, setXlBanner] = useState<{ kind: 'ok' | 'err' | 'warn'; text: string } | null>(
    null
  );
  const [busyXlsx, setBusyXlsx] = useState<string | null>(null);
  const [confirmDeleteGv, setConfirmDeleteGv] = useState<boolean>(false);

  // Add period form state
  const [pcAddTu, setPcAddTu] = useState<string>('10');
  const [pcAddLop, setPcAddLop] = useState<string>('');
  const [pcAddKn, setPcAddKn] = useState<string>('');
  const [pcAddMau, setPcAddMau] = useState<Record<string, string>>({});
  const [pcAddGhiChu, setPcAddGhiChu] = useState<string>('');
  const [pfFrom, setPfFrom] = useState<string>('1');
  const [pfTo, setPfTo] = useState<string>(() => String(curWeek()));
  const [pfOverwrite, setPfOverwrite] = useState<boolean>(false);

  // Department config editor state
  const [toDraft, setToDraft] = useState<ToRecord | null>(null);
  const [toBanner, setToBanner] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const editorRef = useRef<HTMLElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const xlsxSchoolInputRef = useRef<HTMLInputElement | null>(null);
  const xlsxToInputRef = useRef<HTMLInputElement | null>(null);
  const [busyImport, setBusyImport] = useState<boolean>(false);
  const [pendingSaveTos, setPendingSaveTos] = useState<string[]>([]);
  const [busySaveTo, setBusySaveTo] = useState<boolean>(false);

  // Keep localStorage synced with current tos & teachers
  useEffect(() => {
    try {
      localStorage.setItem(
        'htb_kegio_state_v2',
        JSON.stringify({ tos, teachers, savedAt: new Date().toISOString() })
      );
    } catch {
      // ignore quota errors
    }
  }, [tos, teachers]);

  // Load initial state & connect SSE
  useEffect(() => {
    let active = true;
    fetch('/api/state')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!active) return;
        if (data?.tos) setTos(data.tos);
        if (data?.teachers) {
          setTeachers(data.teachers);
          const mw = calcMaxWeek(data.teachers);
          if (mw > 0) setUptoWeek(mw);
        }
        setSyncOk(true);
        setSyncText(
          'Đã đồng bộ · ' +
            new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        );
      })
      .catch(() => {
        if (!active) return;
        setSyncOk(true);
        setSyncText('Đã lưu cục bộ');
      });

    const es = new EventSource('/api/events');
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data?.tos) setTos(data.tos);
        if (data?.teachers) setTeachers(data.teachers);
        setSyncOk(true);
        setSyncText(
          'Đã đồng bộ · ' +
            new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        );
      } catch {
        // ignore parse errors
      }
    };
    es.onerror = () => {
      // keep working seamlessly
    };
    return () => {
      active = false;
      es.close();
    };
  }, []);

  // Hash routing (#truong or #to-<key>)
  useEffect(() => {
    const applyHash = () => {
      const h = (window.location.hash || '').slice(1);
      if (h.startsWith('to-')) {
        const k = h.slice(3);
        setView(k);
      } else {
        setView('truong');
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const toList = useMemo(() => {
    return Object.entries(tos).sort((a, b) => (a[1].order || 99) - (b[1].order || 99));
  }, [tos]);

  const teachersOf = (k: string): [string, TeacherRecord][] => {
    return Object.entries(teachers)
      .filter(([, t]) => t.to === k)
      .sort((a, b) => (a[1].stt || 99) - (b[1].stt || 99));
  };

  const maxW = useMemo(() => {
    let m = 0;
    for (const t of Object.values(teachers)) {
      for (let i = NW; i >= 1; i--) {
        if (wsum(t.weeks?.[i]) > 0) {
          m = Math.max(m, i);
          break;
        }
      }
    }
    return m;
  }, [teachers]);

  // When switching department view, select first teacher if current selId isn't in this department
  useEffect(() => {
    setSaveBanner(null);
    setPcBanner(null);
    setXlBanner(null);
    setToBanner(null);
    setLeaveArmed(false);
    setConfirmDeleteGv(false);
    if (view !== 'truong' && tos[view]) {
      setToDraft(JSON.parse(JSON.stringify(tos[view])));
      const ts = teachersOf(view);
      if (selId === '__new') return;
      if (!selId || teachers[selId]?.to !== view) {
        const firstId = ts[0]?.[0] || null;
        setSelId(firstId);
        setDraft(null);
        setDirtyWeeks(new Set());
      }
    }
  }, [view, tos]);

  // Initialize draft when selId or teachers changes (only if not dirty)
  useEffect(() => {
    if (!selId) {
      setDraft(null);
      return;
    }
    if (selId === '__new') return;
    if (dirtyWeeks.size > 0 && draft) return;
    const base = teachers[selId];
    if (!base) {
      setDraft(null);
      return;
    }
    const seeded = seedPc(JSON.parse(JSON.stringify(base)));
    setDraft(seeded);
    initPcAddForm(seeded);
  }, [selId, teachers]);

  function initPcAddForm(d: TeacherRecord) {
    const cw = curWeek();
    const p = d.pc || [];
    const last = p[p.length - 1] || { tu: 1, lop: '', kn: '', mau: {} };
    let firstEmpty = 1;
    for (let i = 1; i <= NW; i++) {
      if (!wsum(d.weeks?.[i])) {
        firstEmpty = i;
        break;
      }
    }
    const nextTu = Math.max(firstEmpty, (last.tu || 0) + 1);
    setPcAddTu(String(nextTu));
    setPcAddLop(last.lop || '');
    setPcAddKn(last.kn || '');
    const mStr: Record<string, string> = {};
    COLS.forEach(([c]) => {
      const v = num(last.mau?.[c]);
      mStr[c] = v ? String(v).replace('.', ',') : '';
    });
    setPcAddMau(mStr);
    setPcAddGhiChu('');
    setPfFrom(String(firstEmpty));
    setPfTo(String(Math.max(firstEmpty, cw)));
    setPfOverwrite(false);
  }

  function selectTeacher(id: string, scroll = true) {
    if (selId !== id) {
      if (dirtyWeeks.size > 0 && !leaveArmed) {
        setLeaveArmed(true);
        return;
      }
      setLeaveArmed(false);
      setDirtyWeeks(new Set());
      setSaveBanner(null);
      setPcBanner(null);
      setConfirmDeleteGv(false);
      setSelId(id);
      const base = teachers[id];
      if (base) {
        const seeded = seedPc(JSON.parse(JSON.stringify(base)));
        setDraft(seeded);
        initPcAddForm(seeded);
      }
    }
    if (scroll) {
      setTimeout(() => {
        editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  function handleAddGv(toKey: string) {
    if (dirtyWeeks.size > 0 && !leaveArmed) {
      setLeaveArmed(true);
      return;
    }
    setLeaveArmed(false);
    setDirtyWeeks(new Set());
    setSaveBanner(null);
    setPcBanner(null);
    setConfirmDeleteGv(false);
    const ts = teachersOf(toKey);
    const newDraft = seedPc({
      to: toKey,
      stt: ts.length + 1,
      hoDem: '',
      ten: '',
      hoTen: '',
      chucDanh: 'Giáo viên THPT Hạng III - Mã số: V.07.05.15',
      lop: '',
      kiemNhiem: '',
      tieuChuan: 595,
      ktPpct: 0,
      weeks: {},
    });
    setSelId('__new');
    setDraft(newDraft);
    initPcAddForm(newDraft);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function handleResetDraft() {
    setDirtyWeeks(new Set());
    setLeaveArmed(false);
    setSaveBanner(null);
    setPcBanner(null);
    setConfirmDeleteGv(false);
    if (selId === '__new') {
      const ts = teachersOf(view);
      setSelId(ts[0]?.[0] || null);
      setDraft(null);
    } else if (selId && teachers[selId]) {
      const seeded = seedPc(JSON.parse(JSON.stringify(teachers[selId])));
      setDraft(seeded);
      initPcAddForm(seeded);
    }
  }

  async function handleSaveTeacher() {
    if (!draft) return;
    const hoDem = draft.hoDem.trim();
    const ten = draft.ten.trim();
    const hoTen = (hoDem + ' ' + ten).trim();
    if (!ten) {
      setSaveBanner({ kind: 'err', text: 'Nhập tên giáo viên trước khi lưu.' });
      return;
    }
    const cleanWeeks: Record<number, Record<string, number>> = {};
    for (const [w, v] of Object.entries(draft.weeks || {})) {
      const o: Record<string, number> = {};
      COLS.forEach(([c]) => {
        const val = num((v as any)?.[c]);
        if (val) o[c] = val;
      });
      if (Object.keys(o).length) cleanWeeks[+w] = o;
    }
    const body: TeacherRecord = {
      to: draft.to,
      stt: draft.stt,
      hoDem,
      ten,
      hoTen,
      chucDanh: draft.chucDanh || '',
      lop: draft.lop || '',
      kiemNhiem: draft.kiemNhiem || '',
      tieuChuan: num(draft.tieuChuan),
      ktPpct: num(draft.ktPpct),
      weeks: cleanWeeks,
      pc: (draft.pc || []).map((x) => ({
        tu: +x.tu,
        den: x.den == null ? null : +x.den,
        lop: x.lop || '',
        kn: x.kn || '',
        mau: Object.fromEntries(
          COLS.filter(([c]) => num(x.mau?.[c])).map(([c]) => [c, num(x.mau[c])])
        ),
        ghiChu: x.ghiChu || '',
      })),
      updatedAt: new Date().toISOString(),
    };
    const id = selId === '__new' || !selId ? `${draft.to}-${Date.now().toString(36)}` : selId;
    try {
      const res = await fetch(`/api/teachers/${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Save failed');
      setTeachers((prev) => ({ ...prev, [id]: body }));
      setSelId(id);
      setDirtyWeeks(new Set());
      setLeaveArmed(false);
      setDraft(seedPc(JSON.parse(JSON.stringify(body))));
      setSaveBanner({ kind: 'ok', text: `Đã lưu phiếu của ${hoTen}.` });
    } catch {
      // Fallback local save
      setTeachers((prev) => ({ ...prev, [id]: body }));
      setSelId(id);
      setDirtyWeeks(new Set());
      setLeaveArmed(false);
      setDraft(seedPc(JSON.parse(JSON.stringify(body))));
      setSaveBanner({ kind: 'ok', text: `Đã lưu phiếu của ${hoTen}.` });
    }
  }

  async function handleDeleteTeacher() {
    if (!selId || selId === '__new') return;
    const id = selId;
    const name = teachers[id]?.hoTen || '';
    try {
      await fetch(`/api/teachers/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // ignore
    }
    setTeachers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setConfirmDeleteGv(false);
    setDirtyWeeks(new Set());
    const remaining = teachersOf(view).filter(([k]) => k !== id);
    setSelId(remaining[0]?.[0] || null);
    setSaveBanner({ kind: 'ok', text: `Đã xóa phiếu của ${name}.` });
  }

  async function handleSaveToConfig() {
    if (!toDraft || view === 'truong') return;
    try {
      const res = await fetch(`/api/tos/${encodeURIComponent(view)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toDraft),
      });
      if (!res.ok) throw new Error('Save failed');
      const fullLabel = toDraft.kind ? `${toDraft.kind} ${toDraft.name}` : toDraft.name;
      setTos((prev) => ({ ...prev, [view]: toDraft }));
      setToBanner({ kind: 'ok', text: `Đã lưu cấu hình ${fullLabel}.` });
    } catch {
      const fullLabel = toDraft.kind ? `${toDraft.kind} ${toDraft.name}` : toDraft.name;
      setTos((prev) => ({ ...prev, [view]: toDraft }));
      setToBanner({ kind: 'ok', text: `Đã lưu cấu hình ${fullLabel}.` });
    }
  }

  // ExcelJS export helpers
  async function runXlsxExport(
    key: string,
    filename: string,
    builder: (M: any) => any
  ) {
    if (typeof window.ExcelJS === 'undefined') {
      setXlBanner({
        kind: 'err',
        text: 'Chưa tải được thư viện tạo tệp Excel. Kiểm tra kết nối mạng rồi tải lại trang.',
      });
      return;
    }
    setBusyXlsx(key);
    setXlBanner(null);
    try {
      const M = await loadMau();
      const wb = builder(M);
      const buf = await wb.xlsx.writeBuffer();
      const blob = new Blob([buf], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      triggerBlobDownload(filename, blob);
      setXlBanner({ kind: 'ok', text: `Đã tạo tệp ${filename}.` });
    } catch (e) {
      console.error(e);
      setXlBanner({ kind: 'err', text: 'Chưa xuất được tệp Excel. Thử lại sau ít giây.' });
    } finally {
      setBusyXlsx(null);
    }
  }

  function handleExportSchoolXlsx() {
    const N = uptoWeek;
    const filename = `Tong-hop-ke-gio-toan-truong-den-tuan-${String(N).padStart(
      2,
      '0'
    )}-2026-2027.xlsx`;
    runXlsxExport('school', filename, () => xlSchoolWorkbook(N, toList, teachersOf));
  }

  function handleExportToXlsx(toKey: string) {
    const list = teachersOf(toKey).map(([, t]) => t);
    if (!list.length) return;
    const to = tos[toKey];
    const filename = `Ke-gio-to-${slugVi(to?.name || toKey)}-2026-2027.xlsx`;
    runXlsxExport('to', filename, (M) => xlToWorkbook(M, to, list));
  }

  function handleExportGvXlsx() {
    if (!selId || selId === '__new') return;
    if (dirtyWeeks.size > 0) {
      setSaveBanner({
        kind: 'warn',
        text: 'Phiếu đang có thay đổi chưa lưu. Bấm "Lưu phiếu" trước, rồi xuất phiếu cá nhân.',
      });
      return;
    }
    const t = teachers[selId];
    if (!t) return;
    const filename = `Phieu-ke-gio-${slugVi(t.hoTen)}-2026-2027.xlsx`;
    runXlsxExport('gv', filename, (M) => xlGvWorkbook(M, t));
  }

  function handleExportJsonBackup() {
    const payload = JSON.stringify({ tos, teachers, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8;' });
    triggerBlobDownload(`sao-luu-ke-gio-ham-thuan-bac-${uptoWeek}.json`, blob);
  }

  function handleImportJsonBackup(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed.tos && !parsed.teachers) {
          setXlBanner({ kind: 'err', text: 'Tệp JSON không đúng định dạng dữ liệu kê giờ.' });
          return;
        }
        await fetch('/api/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tos: parsed.tos, teachers: parsed.teachers, mode: 'merge' }),
        });
        if (parsed.tos) setTos((prev) => ({ ...prev, ...parsed.tos }));
        if (parsed.teachers) setTeachers((prev) => ({ ...prev, ...parsed.teachers }));
        setXlBanner({ kind: 'ok', text: 'Đã nạp dữ liệu từ tệp sao lưu JSON thành công.' });
      } catch {
        setXlBanner({ kind: 'err', text: 'Không đọc được tệp JSON. Vui lòng kiểm tra lại.' });
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  async function handleSaveToProfile(targetKeys?: string[]) {
    const keys =
      targetKeys && targetKeys.length > 0
        ? targetKeys
        : pendingSaveTos.length > 0
        ? pendingSaveTos
        : view !== 'truong'
        ? [view]
        : [];
    if (keys.length === 0) return;

    setBusySaveTo(true);
    try {
      const savedNames: string[] = [];
      for (const toKey of keys) {
        const baseTo = toKey === view && toDraft ? toDraft : tos[toKey];
        if (!baseTo) continue;
        const deptTeachers: Record<string, TeacherRecord> = {};
        for (const [tid, t] of Object.entries(teachers)) {
          if (t.to === toKey) {
            deptTeachers[tid] = tid === selId && draft ? draft : t;
          }
        }
        const toPatch: Partial<ToRecord> = {
          tt: baseTo.tt || '',
          mon: baseTo.mon || baseTo.name,
          p1: baseTo.p1,
        };
        try {
          const res = await fetch(`/api/import-to/${encodeURIComponent(toKey)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toPatch, teachers: deptTeachers }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.state?.tos) setTos(data.state.tos);
            if (data?.state?.teachers) setTeachers(data.state.teachers);
          } else {
            setTos((prev) => ({ ...prev, [toKey]: { ...prev[toKey], ...toPatch } }));
            setTeachers((prev) => ({ ...prev, ...deptTeachers }));
          }
        } catch {
          setTos((prev) => ({ ...prev, [toKey]: { ...prev[toKey], ...toPatch } }));
          setTeachers((prev) => ({ ...prev, ...deptTeachers }));
        }
        const gvCount = Object.keys(deptTeachers).length;
        const fullLabel = baseTo.kind ? `${baseTo.kind} ${baseTo.name}` : baseTo.name;
        savedNames.push(`${fullLabel} (${gvCount} GV)`);
      }

      if (keys.includes(view)) {
        setDirtyWeeks(new Set());
      }
      setPendingSaveTos((prev) => prev.filter((k) => !keys.includes(k)));
      const nowStr = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setSyncOk(true);
      setSyncText(`Đã lưu · ${nowStr}`);
      setXlBanner({
        kind: 'ok',
        text: `Đã lưu hồ sơ ${savedNames.join(', ')} thành công lúc ${nowStr}.`,
      });
    } finally {
      setBusySaveTo(false);
    }
  }

  async function handleImportXlsxFiles(
    e: React.ChangeEvent<HTMLInputElement>,
    forcedToKey?: string
  ) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const files: File[] = Array.from(fileList);
    e.target.value = '';

    setBusyImport(true);
    setXlBanner(null);
    const importedSummary: string[] = [];
    const importedKeys: string[] = [];
    const failedFiles: string[] = [];

    try {
      for (const file of files) {
        try {
          const buf = await file.arrayBuffer();
          const parsed = await parseXlsxWorkbook(buf, file.name, tos, forcedToKey);
          const toKey = forcedToKey || parsed.detectedToKey;
          if (!toKey || !tos[toKey]) {
            failedFiles.push(`${file.name} (chưa nhận diện được tổ — hãy mở tab Tổ tương ứng rồi bấm Nạp lại hồ sơ tổ)`);
            continue;
          }
          if (!parsed.teachers.length) {
            failedFiles.push(`${file.name} (không tìm thấy sheet phiếu giáo viên Mẫu số 03 hoặc TN_01)`);
            continue;
          }
          const newTeachersMap: Record<string, TeacherRecord> = {};
          parsed.teachers.forEach((t, idx) => {
            const id = `${toKey}-${idx + 1}`;
            newTeachersMap[id] = seedPc({
              ...t,
              to: toKey,
              stt: idx + 1,
            });
          });
          const curTo = tos[toKey];
          const toPatch: Partial<ToRecord> = {
            tt: parsed.tt || curTo.tt || '',
            mon: parsed.mon || curTo.mon || curTo.name,
            p1: parsed.p1 || curTo.p1,
          };

          const res = await fetch(`/api/import-to/${encodeURIComponent(toKey)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toPatch, teachers: newTeachersMap }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.state?.tos) setTos(data.state.tos);
            if (data?.state?.teachers) setTeachers(data.state.teachers);
          } else {
            setTos((prev) => ({
              ...prev,
              [toKey]: { ...prev[toKey], ...toPatch },
            }));
            setTeachers((prev) => {
              const next = { ...prev };
              for (const [tid, t] of Object.entries(next)) {
                if (t.to === toKey) delete next[tid];
              }
              return { ...next, ...newTeachersMap };
            });
          }

          if (forcedToKey === toKey || view === toKey) {
            setToDraft((prev) => (prev ? { ...prev, ...toPatch } : prev));
            const firstId = Object.keys(newTeachersMap)[0] || null;
            setSelId(firstId);
            setDraft(firstId ? newTeachersMap[firstId] : null);
            setDirtyWeeks(new Set());
          }
          importedKeys.push(toKey);
          importedSummary.push(`${tos[toKey].name} (${parsed.teachers.length} GV)`);
        } catch (err) {
          console.error(err);
          failedFiles.push(file.name);
        }
      }

      if (importedKeys.length > 0) {
        setPendingSaveTos((prev) => Array.from(new Set([...prev, ...importedKeys])));
      }

      if (importedSummary.length > 0 && failedFiles.length === 0) {
        setXlBanner({
          kind: 'ok',
          text: `Đã nạp hồ sơ tổ: ${importedSummary.join(', ')}. Bấm "Lưu hồ sơ tổ" để xác nhận lưu dữ liệu.`,
        });
      } else if (importedSummary.length > 0 && failedFiles.length > 0) {
        setXlBanner({
          kind: 'warn',
          text: `Đã nạp: ${importedSummary.join(', ')}. Chưa nạp được: ${failedFiles.join('; ')}.`,
        });
      } else {
        setXlBanner({
          kind: 'err',
          text: `Không nạp được tệp: ${failedFiles.join('; ')}.`,
        });
      }
    } finally {
      setBusyImport(false);
    }
  }

  // Week select element
  const cw = curWeek();
  const renderWeekSelect = () => (
    <label htmlFor="upto">
      Tính đến{' '}
      <select
        id="upto"
        value={uptoWeek}
        onChange={(e) => setUptoWeek(Number(e.target.value))}
      >
        {Array.from({ length: NW }, (_, idx) => {
          const i = idx + 1;
          const tag = [i === cw ? 'tuần hiện tại' : '', i === maxW ? 'đã kê đến' : '']
            .filter(Boolean)
            .join(', ');
          return (
            <option key={i} value={i}>
              Tuần {String(i).padStart(2, '0')}
              {tag ? ` (${tag})` : ''}
            </option>
          );
        })}
      </select>
    </label>
  );

  // School-wide aggregation
  const schoolData = useMemo(() => {
    const N = uptoWeek;
    const rows: {
      k: string;
      to: ToRecord;
      n: number;
      cols: Record<string, number>;
      kt: number;
      tt: number;
      tc: number;
      dm: number;
      weeks: number[];
      maxW: number;
    }[] = [];
    const tot = {
      cols: Object.fromEntries(COLS.map(([k]) => [k, 0])),
      kt: 0,
      tt: 0,
      tc: 0,
      dm: 0,
      n: 0,
    };

    for (const [k, to] of toList) {
      const ts = teachersOf(k);
      const agg = {
        cols: Object.fromEntries(COLS.map(([c]) => [c, 0])),
        kt: 0,
        tt: 0,
        tc: 0,
        dm: 0,
        weeks: Array(NW + 1).fill(0),
        maxW: 0,
      };
      for (const [, t] of ts) {
        const r = calc(t, N);
        COLS.forEach(([c]) => {
          agg.cols[c] += r.cols[c];
        });
        agg.kt += num(t.ktPpct);
        agg.tt += r.thucTe;
        agg.tc += r.tc;
        agg.dm += (r.tc * N) / YEARW;
        const rf = calc(t);
        for (let i = 1; i <= NW; i++) agg.weeks[i] += rf.weeks[i];
        agg.maxW = Math.max(agg.maxW, r.maxW);
      }
      rows.push({ k, to, n: ts.length, ...agg });
      COLS.forEach(([c]) => {
        tot.cols[c] += agg.cols[c];
      });
      tot.kt += agg.kt;
      tot.tt += agg.tt;
      tot.tc += agg.tc;
      tot.dm += agg.dm;
      tot.n += ts.length;
    }
    const behind = rows.filter((r) => r.maxW < N).map((r) => r.to.name);
    const diff = tot.tt - tot.dm;
    return { rows, tot, behind, diff };
  }, [toList, teachers, uptoWeek]);

  const filteredAllTeachers = useMemo(() => {
    const N = uptoWeek;
    const q = searchQ.trim().toLowerCase();
    const list = Object.entries(teachers)
      .map(([id, t]) => {
        const r = calc(t, N);
        return { id, t, r, d: r.thucTe - (r.tc * N) / YEARW };
      })
      .filter(
        (x) =>
          !q ||
          x.t.hoTen.toLowerCase().includes(q) ||
          (tos[x.t.to]?.name || '').toLowerCase().includes(q)
      );
    const ord = Object.fromEntries(toList.map(([k], i) => [k, i]));
    if (sortBy === 'to') {
      list.sort((a, b) => (ord[a.t.to] ?? 99) - (ord[b.t.to] ?? 99) || a.t.stt - b.t.stt);
    } else if (sortBy === 'lack') {
      list.sort((a, b) => a.d - b.d);
    } else if (sortBy === 'over') {
      list.sort((a, b) => b.d - a.d);
    }
    return list;
  }, [teachers, uptoWeek, searchQ, sortBy, toList, tos]);

  return (
    <div className="wrap">
      <header className="top">
        <div>
          <div className="org">
            Sở Giáo dục và Đào tạo Lâm Đồng · <b>Trường THPT Hàm Thuận Bắc</b>
          </div>
          <h1>Kê giờ thực tế lên lớp</h1>
          <div className="yr">Năm học 2026 – 2027 · Mẫu số 03</div>
        </div>
        <div className="status" id="status">
          <span className={`status-text ${syncOk ? 'ok' : 'err'}`}>{syncText}</span>
        </div>
      </header>

      <nav className="tabs" id="tabs" aria-label="Chọn trang">
        <a
          href="#truong"
          className={view === 'truong' ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = 'truong';
          }}
        >
          <span>Toàn trường</span>
          <span className="cnt">{schoolData.tot.n}</span>
        </a>
        <span className="sep" />
        {toList.map(([k, t]) => {
          const cnt = teachersOf(k).length;
          return (
            <a
              key={k}
              href={`#to-${k}`}
              className={view === k ? 'on' : ''}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = `to-${k}`;
              }}
            >
              <span>{t.name}</span>
              <span className="cnt">{cnt}</span>
            </a>
          );
        })}
      </nav>

      <main id="view">
        {xlBanner && (
          <div className={`banner ${xlBanner.kind} flex items-center justify-between gap-3 flex-wrap`}>
            <span>{xlBanner.text}</span>
            {pendingSaveTos.length > 0 && (
              <button
                type="button"
                className="primary"
                disabled={busySaveTo}
                onClick={() => handleSaveToProfile()}
              >
                {busySaveTo ? 'Đang lưu hồ sơ tổ…' : 'Lưu hồ sơ tổ'}
              </button>
            )}
          </div>
        )}

        {view === 'truong' ? (
          <div className="grid2">
            <div className="toolbar-bar">
              <div className="toolbar">
                {renderWeekSelect()}
                <button
                  type="button"
                  className="primary"
                  disabled={busyXlsx === 'school'}
                  onClick={handleExportSchoolXlsx}
                  title="Tổng hợp theo tổ, danh sách giáo viên và tiến độ theo tuần, tính đến tuần đang chọn"
                >
                  {busyXlsx === 'school'
                    ? 'Đang tạo tệp…'
                    : 'Xuất tổng hợp toàn trường (.xlsx)'}
                </button>
                <button
                  type="button"
                  disabled={busyImport}
                  onClick={() => xlsxSchoolInputRef.current?.click()}
                  title="Chọn một hoặc nhiều tệp Excel (.xlsx) hồ sơ của các tổ chuyên môn để nạp lại dữ liệu"
                >
                  {busyImport ? 'Đang nạp hồ sơ…' : 'Nạp lại hồ sơ tổ (.xlsx)'}
                </button>
                {pendingSaveTos.length > 0 && (
                  <button
                    type="button"
                    className="primary"
                    disabled={busySaveTo}
                    onClick={() => handleSaveToProfile()}
                    title="Lưu xác nhận các hồ sơ tổ vừa nạp vào hệ thống"
                  >
                    {busySaveTo ? 'Đang lưu…' : 'Lưu hồ sơ tổ'}
                  </button>
                )}
                <input
                  ref={xlsxSchoolInputRef}
                  type="file"
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  multiple
                  hidden
                  onChange={(e) => handleImportXlsxFiles(e)}
                />
              </div>
              <div className="toolbar">
                <button
                  type="button"
                  className="subtle"
                  onClick={() => {
                    const list = toList.flatMap(([k]) => teachersOf(k));
                    downloadCsv(
                      `ke-gio-toan-truong-den-tuan-${uptoWeek}.csv`,
                      buildTeacherCsvRows(list, tos, uptoWeek)
                    );
                  }}
                >
                  Tải CSV toàn trường
                </button>
                <button type="button" className="subtle" onClick={handleExportJsonBackup}>
                  Sao lưu dữ liệu (.json)
                </button>
                <button
                  type="button"
                  className="subtle"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Nhập sao lưu (.json)
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  hidden
                  onChange={handleImportJsonBackup}
                />
              </div>
            </div>

            <div className="kpis">
              <div className="kpi">
                <span className="l">Giáo viên đã có phiếu</span>
                <span className="v">{schoolData.tot.n}</span>
                <span className="s">{schoolData.rows.length} tổ / nhóm môn</span>
              </div>
              <div className="kpi">
                <span className="l">Tiết thực tế đến tuần {uptoWeek}</span>
                <span className="v">{fmt(schoolData.tot.tt)}</span>
                <span className="s">đã trừ tiết KT theo PPCT</span>
              </div>
              <div className="kpi">
                <span className="l">Định mức đến tuần {uptoWeek}</span>
                <span className="v">{fmt(schoolData.tot.dm)}</span>
                <span className="s">
                  tiêu chuẩn năm × {uptoWeek}/{YEARW}
                </span>
              </div>
              <div className="kpi">
                <span className="l">Chênh lệch so định mức</span>
                <span className={`v ${schoolData.diff < 0 ? 'neg' : 'pos'}`}>
                  {schoolData.diff > 0 ? '+' : ''}
                  {fmt(schoolData.diff)}
                </span>
                <span className="s">
                  {schoolData.diff < 0
                    ? 'toàn trường đang thiếu'
                    : 'toàn trường đang thừa'}
                </span>
              </div>
            </div>

            {schoolData.behind.length > 0 ? (
              <div className="banner warn">
                Chưa kê đến tuần {uptoWeek}: {schoolData.behind.join(', ')}.
              </div>
            ) : (
              <div className="banner ok">
                Tất cả các tổ đã kê đến tuần {uptoWeek}.
              </div>
            )}

            <section className="card">
              <h2>Tổng hợp theo tổ</h2>
              <p className="sub">
                Số liệu cộng từ tuần 01 đến tuần {uptoWeek}. Chọn một tổ để xem phiếu từng giáo
                viên.
              </p>
              <div className="scroll">
                <table>
                  <thead>
                    <tr>
                      <th className="l">Tổ</th>
                      <th className="l">Tổ trưởng</th>
                      <th>GV</th>
                      {COLS.map(([k, l]) => (
                        <th key={k}>{l}</th>
                      ))}
                      <th>KT PPCT</th>
                      <th>Thực tế</th>
                      <th>Định mức đến T{uptoWeek}</th>
                      <th>Chênh lệch</th>
                      <th>Tiêu chuẩn năm</th>
                      <th>Đã kê đến</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolData.rows.map((r) => {
                      const d = r.tt - r.dm;
                      return (
                        <tr
                          key={r.k}
                          className="click"
                          onClick={() => {
                            window.location.hash = `to-${r.k}`;
                          }}
                        >
                          <td className="l tname">{r.to.name}</td>
                          <td className="l">{r.to.tt || '—'}</td>
                          <td>{r.n}</td>
                          {COLS.map(([c]) => (
                            <td key={c}>{fmt(r.cols[c])}</td>
                          ))}
                          <td>{fmt(r.kt)}</td>
                          <td>
                            <b>{fmt(r.tt)}</b>
                          </td>
                          <td>{fmt(r.dm)}</td>
                          <td>
                            <SgnValue n={d} />
                          </td>
                          <td>{fmt(r.tc)}</td>
                          <td>
                            {r.maxW ? `Tuần ${String(r.maxW).padStart(2, '0')}` : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="l" colSpan={2}>
                        Toàn trường
                      </td>
                      <td>{schoolData.tot.n}</td>
                      {COLS.map(([c]) => (
                        <td key={c}>{fmt(schoolData.tot.cols[c])}</td>
                      ))}
                      <td>{fmt(schoolData.tot.kt)}</td>
                      <td>{fmt(schoolData.tot.tt)}</td>
                      <td>{fmt(schoolData.tot.dm)}</td>
                      <td>
                        <SgnValue n={schoolData.diff} />
                      </td>
                      <td>{fmt(schoolData.tot.tc)}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            <section className="card">
              <h2>Tiến độ kê theo tuần</h2>
              <p className="sub">
                Tổng số tiết mỗi tổ đã kê trong từng tuần (ô trống: chưa kê).
              </p>
              <div className="scroll">
                <table className="heat">
                  <thead>
                    <tr>
                      <th className="l">Tổ</th>
                      {Array.from({ length: NW }, (_, i) => (
                        <th
                          key={i}
                          className={`text-center ${i + 1 === uptoWeek ? 'cur-w' : ''}`}
                        >
                          {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schoolData.rows.map((r) => (
                      <tr key={r.k}>
                        <td className="l tname">{r.to.name}</td>
                        {Array.from({ length: NW }, (_, i) => {
                          const v = r.weeks[i + 1];
                          return (
                            <td
                              key={i}
                              className={`w ${v ? 'has' : 'none'}${
                                i + 1 > uptoWeek ? ' after' : ''
                              }`}
                            >
                              {v ? fmt(v) : '·'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card">
              <div className="row">
                <div>
                  <h2>Giáo viên toàn trường</h2>
                  <p className="sub">
                    Đến tuần {uptoWeek}. Bấm vào tên để mở phiếu kê giờ.
                  </p>
                </div>
                <div className="toolbar">
                  <input
                    type="search"
                    id="q"
                    placeholder="Tìm tên giáo viên"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    aria-label="Tìm tên giáo viên"
                  />
                  <label htmlFor="sort">
                    Sắp xếp{' '}
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                    >
                      <option value="to">Theo tổ</option>
                      <option value="lack">Thiếu nhiều nhất</option>
                      <option value="over">Thừa nhiều nhất</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="scroll" id="gvAll">
                {filteredAllTeachers.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th className="l">Họ và tên</th>
                        <th className="l">Tổ</th>
                        <th className="l">Kiêm nhiệm</th>
                        <th>Thực tế</th>
                        <th>Định mức đến T{uptoWeek}</th>
                        <th>Chênh lệch</th>
                        <th>Tiêu chuẩn năm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAllTeachers.map((x) => (
                        <tr
                          key={x.id}
                          className="click"
                          onClick={() => {
                            setSelId(x.id);
                            setDraft(null);
                            setDirtyWeeks(new Set());
                            window.location.hash = `to-${x.t.to}`;
                            setTimeout(() => {
                              editorRef.current?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                              });
                            }, 80);
                          }}
                        >
                          <td className="l tname">{x.t.hoTen}</td>
                          <td className="l">{tos[x.t.to]?.name || x.t.to}</td>
                          <td className="l">{x.t.kiemNhiem || ''}</td>
                          <td>
                            <b>{fmt(x.r.thucTe)}</b>
                          </td>
                          <td>{fmt((x.r.tc * uptoWeek) / YEARW)}</td>
                          <td>
                            <SgnValue n={x.d} />
                          </td>
                          <td>{fmt(x.r.tc)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty">
                    Không có giáo viên nào khớp "{searchQ}".
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          // Department view (#to-<key>)
          (() => {
            const to = tos[view];
            if (!to) {
              return <div className="empty">Không tìm thấy tổ chuyên môn này.</div>;
            }
            const ts = teachersOf(view);
            const N = uptoWeek;
            let tt = 0;
            let tc = 0;
            let dm = 0;
            let kt = 0;
            const sum: Record<string, number> = Object.fromEntries(COLS.map(([c]) => [c, 0]));
            const teacherRowsData = ts.map(([id, t]) => {
              const r = calc(t, N);
              tt += r.thucTe;
              tc += r.tc;
              dm += (r.tc * N) / YEARW;
              kt += num(t.ktPpct);
              COLS.forEach(([c]) => {
                sum[c] += r.cols[c];
              });
              const d = r.thucTe - (r.tc * N) / YEARW;
              return { id, t, r, d };
            });

            const isNew = selId === '__new';
            const multiPc = (draft?.pc?.length || 0) > 1;
            const weekTotals: Record<string, number> = Object.fromEntries(
              COLS.map(([c]) => [c, 0])
            );
            let allWeeksSum = 0;
            if (draft) {
              for (let i = 1; i <= NW; i++) {
                const w = draft.weeks?.[i] || {};
                const s = wsum(w);
                allWeeksSum += s;
                COLS.forEach(([c]) => {
                  weekTotals[c] += num((w as any)[c]);
                });
              }
            }
            const draftThucTe = draft ? allWeeksSum - num(draft.ktPpct) : 0;

            const draftCalcN = draft ? calc(draft, N) : null;
            const deptDiffN = tt - dm;
            const deptDiffYear = tt - tc;

            let hnFull = 0;
            let gdFull = 0;
            let tcFull = 0;
            for (const [, t] of ts) {
              const rf = calc(t);
              hnFull += rf.cols.hn || 0;
              gdFull += rf.cols.gddp || 0;
              tcFull += rf.cols.tc || 0;
            }
            const p1Rows = toDraft?.p1 || [];
            let p1Sum = 0;
            const p1Evaluated = p1Rows.map((row) => {
              const v = evalP1Value(row[1], hnFull, gdFull, tcFull);
              if (v != null) p1Sum += v;
              return v;
            });

            return (
              <div className="grid2">
                <div className="dept-head">
                  <div>
                    <h2 className="font-serif text-[22px] font-bold m-0">
                      {to.kind ? `${to.kind} ${to.name}` : to.name}
                    </h2>
                    <p className="sub">
                      Tổ trưởng: <b>{to.tt || 'chưa ghi'}</b> · Môn hồ sơ: <b>{to.mon || to.name}</b> · {ts.length} giáo viên
                    </p>
                  </div>
                  <div className="toolbar">
                    {renderWeekSelect()}
                    <button
                      type="button"
                      disabled={busyImport}
                      onClick={() => xlsxToInputRef.current?.click()}
                      title="Nạp tệp Excel (.xlsx) hồ sơ của tổ này (gồm các phiếu Mẫu số 03 và TN_01, TN_02, TN_03)"
                    >
                      {busyImport ? 'Đang nạp hồ sơ…' : 'Nạp lại hồ sơ tổ (.xlsx)'}
                    </button>
                    <button
                      type="button"
                      className={pendingSaveTos.includes(view) ? 'primary' : ''}
                      disabled={busySaveTo}
                      onClick={() => handleSaveToProfile([view])}
                      title="Lưu toàn bộ hồ sơ của tổ chuyên môn này (danh sách giáo viên, các phiếu kê giờ và cấu hình TN_01)"
                    >
                      {busySaveTo ? 'Đang lưu hồ sơ tổ…' : 'Lưu hồ sơ tổ'}
                    </button>
                    <input
                      ref={xlsxToInputRef}
                      type="file"
                      accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      hidden
                      onChange={(e) => handleImportXlsxFiles(e, view)}
                    />
                    <button
                      type="button"
                      disabled={busyXlsx === 'to' || ts.length === 0}
                      onClick={() => handleExportToXlsx(view)}
                      title="Các phiếu Mẫu số 03 của tổ kèm TN_01, TN_02, TN_03"
                    >
                      {busyXlsx === 'to' ? 'Đang tạo tệp…' : 'Xuất hồ sơ tổ (.xlsx)'}
                    </button>
                    <button
                      type="button"
                      className="subtle"
                      onClick={() =>
                        downloadCsv(
                          `ke-gio-to-${view}-den-tuan-${N}.csv`,
                          buildTeacherCsvRows(ts, tos, N)
                        )
                      }
                    >
                      Tải CSV của tổ
                    </button>
                    <button type="button" className="primary" onClick={() => handleAddGv(view)}>
                      + Thêm giáo viên
                    </button>
                  </div>
                </div>

                <div className="kpis">
                  <div className="kpi">
                    <span className="l">Giáo viên trong tổ</span>
                    <span className="v">{ts.length}</span>
                    <span className="s">Tổ trưởng: {to.tt || 'chưa ghi'}</span>
                  </div>
                  <div className="kpi">
                    <span className="l">Tiết thực tế đến tuần {N}</span>
                    <span className="v">{fmt(tt)}</span>
                    <span className="s">đã trừ {fmt(kt)} tiết KT theo PPCT</span>
                  </div>
                  <div className="kpi">
                    <span className="l">Định mức tổ đến tuần {N}</span>
                    <span className="v">{fmt(dm)}</span>
                    <span className="s">tiêu chuẩn cả năm: {fmt(tc)} tiết</span>
                  </div>
                  <div className="kpi">
                    <span className="l">Chênh lệch đến tuần {N}</span>
                    <span className={`v ${deptDiffN < 0 ? 'neg' : 'pos'}`}>
                      {deptDiffN > 0 ? '+' : ''}
                      {fmt(deptDiffN)}
                    </span>
                    <span className="s">
                      cả năm: {deptDiffYear > 0 ? '+' : ''}
                      {fmt(deptDiffYear)} tiết
                    </span>
                  </div>
                </div>

                {toDraft && (
                  <details className="pc">
                    <summary>
                      <span>
                        Thông tin tổ & Giờ lên lớp theo chương trình (bảng 1 trên TN_01, TN_02)
                      </span>
                      <span className="badge-inline">
                        Tổng giờ chương trình (C13): <b>{fmt(p1Sum)}</b> tiết
                      </span>
                    </summary>
                    {toBanner && (
                      <div className={`banner ${toBanner.kind}`}>{toBanner.text}</div>
                    )}
                    <div className="form">
                      <label>
                        Tên tổ chuyên môn
                        <input
                          type="text"
                          value={toDraft.name}
                          onChange={(e) => setToDraft({ ...toDraft, name: e.target.value })}
                        />
                      </label>
                      <label>
                        Tổ trưởng chuyên môn (ký tên TN_01, TN_02)
                        <input
                          type="text"
                          value={toDraft.tt}
                          onChange={(e) => setToDraft({ ...toDraft, tt: e.target.value })}
                        />
                      </label>
                      <label>
                        Môn học hiển thị trên hồ sơ
                        <input
                          type="text"
                          value={toDraft.mon}
                          onChange={(e) => setToDraft({ ...toDraft, mon: e.target.value })}
                        />
                      </label>
                    </div>
                    <div className="scroll">
                      <table>
                        <thead>
                          <tr>
                            <th className="l">TT</th>
                            <th className="l">Nội dung (Khối / Tăng cường / GDĐP)</th>
                            <th className="l">
                              Công thức / Tổng tiết (VD: =24*105, @HN, @GDDP)
                            </th>
                            <th>Thành tiết</th>
                            <th className="l">Ghi chú (Diễn giải trên TN_01, TN_02)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p1Rows.map((row, idx) => (
                            <tr key={idx}>
                              <td className="l">{idx + 1}</td>
                              <td className="l">
                                <input
                                  className="t"
                                  type="text"
                                  value={row[0]}
                                  onChange={(e) => {
                                    const nextP1 = toDraft.p1.map((r, i) =>
                                      i === idx
                                        ? ([e.target.value, r[1], r[2]] as [
                                            string,
                                            string,
                                            string
                                          ])
                                        : r
                                    );
                                    setToDraft({ ...toDraft, p1: nextP1 });
                                  }}
                                />
                              </td>
                              <td className="l">
                                <input
                                  className="t"
                                  type="text"
                                  value={row[1]}
                                  onChange={(e) => {
                                    const nextP1 = toDraft.p1.map((r, i) =>
                                      i === idx
                                        ? ([r[0], e.target.value, r[2]] as [
                                            string,
                                            string,
                                            string
                                          ])
                                        : r
                                    );
                                    setToDraft({ ...toDraft, p1: nextP1 });
                                  }}
                                />
                              </td>
                              <td>
                                <b>
                                  {p1Evaluated[idx] != null ? fmt(p1Evaluated[idx]!) : '—'}
                                </b>
                              </td>
                              <td className="l">
                                <input
                                  className="t"
                                  type="text"
                                  value={row[2]}
                                  onChange={(e) => {
                                    const nextP1 = toDraft.p1.map((r, i) =>
                                      i === idx
                                        ? ([r[0], r[1], e.target.value] as [
                                            string,
                                            string,
                                            string
                                          ])
                                        : r
                                    );
                                    setToDraft({ ...toDraft, p1: nextP1 });
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="l" colSpan={3}>
                              Tổng cộng giờ lên lớp theo chương trình (ô C13 trên TN_01, TN_02)
                            </td>
                            <td>
                              <b>{fmt(p1Sum)}</b>
                            </td>
                            <td />
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="toolbar">
                      <button type="button" className="primary" onClick={handleSaveToConfig}>
                        Lưu thông tin tổ
                      </button>
                    </div>
                  </details>
                )}

                <section className="card">
                  <h2>Tổng hợp thừa giờ của tổ (TN_01)</h2>
                  <p className="sub">
                    Cộng từ tuần 01 đến tuần {N}. "Chênh lệch" so với định mức đến tuần {N};
                    "Thừa/thiếu năm" so với tiêu chuẩn cả năm.
                  </p>
                  <div className="scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>TT</th>
                          <th className="l">Họ và tên</th>
                          {COLS.map(([k, l]) => (
                            <th key={k}>{l}</th>
                          ))}
                          <th>KT PPCT</th>
                          <th>Thực tế</th>
                          <th>Chênh lệch</th>
                          <th>Tiêu chuẩn năm</th>
                          <th>Thừa/thiếu năm</th>
                          <th>Kê đến</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacherRowsData.length > 0 ? (
                          teacherRowsData.map(({ id, t, r, d }) => (
                            <tr
                              key={id}
                              className={`click ${selId === id ? 'selected' : ''}`}
                              onClick={() => selectTeacher(id, true)}
                            >
                              <td>{t.stt}</td>
                              <td className="l tname">{t.hoTen}</td>
                              {COLS.map(([c]) => (
                                <td key={c}>{fmt(r.cols[c])}</td>
                              ))}
                              <td>{fmt(num(t.ktPpct))}</td>
                              <td>
                                <b>{fmt(r.thucTe)}</b>
                              </td>
                              <td>
                                <SgnValue n={d} />
                              </td>
                              <td>{fmt(r.tc)}</td>
                              <td>
                                <SgnValue n={r.nam} />
                              </td>
                              <td>
                                {r.maxW ? 'T' + String(r.maxW).padStart(2, '0') : '—'}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={14} className="empty">
                              Tổ chưa có giáo viên nào. Bấm "Thêm giáo viên" để tạo phiếu đầu
                              tiên.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td />
                          <td className="l">Tổng cộng</td>
                          {COLS.map(([c]) => (
                            <td key={c}>{fmt(sum[c])}</td>
                          ))}
                          <td>{fmt(kt)}</td>
                          <td>{fmt(tt)}</td>
                          <td>
                            <SgnValue n={tt - dm} />
                          </td>
                          <td>{fmt(tc)}</td>
                          <td>
                            <SgnValue n={tt - tc} />
                          </td>
                          <td />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>

                <section className="card" id="editor" ref={editorRef}>
                  {!draft ? (
                    <div className="empty">
                      Chọn một giáo viên trong bảng trên để mở phiếu kê giờ.
                    </div>
                  ) : (
                    <>
                      <div className="row">
                        <div>
                          <h2>
                            {isNew
                              ? 'Phiếu giáo viên mới'
                              : `Phiếu kê giờ: ${draft.hoTen || (draft.hoDem + ' ' + draft.ten).trim()}`}
                          </h2>
                          <p className="sub">
                            Bảng kê giờ thực tế lên lớp (Mẫu số 03). Ô trống được tính là 0;
                            nhập số lẻ dùng dấu phẩy, ví dụ 14,5.
                          </p>
                        </div>
                        <div className="toolbar">
                          {!isNew && (
                            <button
                              type="button"
                              disabled={busyXlsx === 'gv'}
                              onClick={handleExportGvXlsx}
                              title="Phiếu Mẫu số 03 của giáo viên này, một trang để in và ký"
                            >
                              {busyXlsx === 'gv'
                                ? 'Đang tạo tệp…'
                                : 'Xuất phiếu cá nhân (.xlsx)'}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={dirtyWeeks.size === 0 && !isNew}
                            onClick={handleResetDraft}
                          >
                            Bỏ thay đổi
                          </button>
                          <button
                            type="button"
                            className="primary"
                            onClick={handleSaveTeacher}
                          >
                            Lưu phiếu
                          </button>
                          {!isNew &&
                            (!confirmDeleteGv ? (
                              <button
                                type="button"
                                className="danger"
                                onClick={() => setConfirmDeleteGv(true)}
                              >
                                Xóa phiếu
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="danger"
                                  onClick={handleDeleteTeacher}
                                >
                                  Xác nhận xóa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteGv(false)}
                                >
                                  Hủy
                                </button>
                              </>
                            ))}
                        </div>
                      </div>

                      {leaveArmed && (
                        <div className="banner warn" id="leaveWarn">
                          Phiếu đang có thay đổi chưa lưu. Bấm "Lưu phiếu" để giữ lại, hoặc bấm
                          lại vào giáo viên khác để bỏ các thay đổi.
                        </div>
                      )}

                      {saveBanner && (
                        <div className={`banner ${saveBanner.kind}`}>{saveBanner.text}</div>
                      )}

                      <div className="form">
                        <label htmlFor="f-hoDem">
                          Họ đệm
                          <input
                            type="text"
                            id="f-hoDem"
                            value={draft.hoDem}
                            onChange={(e) => {
                              const hoDem = e.target.value;
                              setDraft({
                                ...draft,
                                hoDem,
                                hoTen: (hoDem.trim() + ' ' + draft.ten.trim()).trim(),
                              });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                        </label>
                        <label htmlFor="f-ten">
                          Tên
                          <input
                            type="text"
                            id="f-ten"
                            value={draft.ten}
                            onChange={(e) => {
                              const ten = e.target.value;
                              setDraft({
                                ...draft,
                                ten,
                                hoTen: (draft.hoDem.trim() + ' ' + ten.trim()).trim(),
                              });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                        </label>
                        <label htmlFor="f-chucDanh">
                          Chức danh nghề nghiệp
                          <input
                            type="text"
                            id="f-chucDanh"
                            value={draft.chucDanh}
                            onChange={(e) => {
                              setDraft({ ...draft, chucDanh: e.target.value });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                        </label>
                        <label htmlFor="f-tieuChuan">
                          Tiêu chuẩn cả năm (tiết)
                          <input
                            type="text"
                            inputMode="decimal"
                            id="f-tieuChuan"
                            value={String(draft.tieuChuan ?? '').replace('.', ',')}
                            onChange={(e) => {
                              setDraft({ ...draft, tieuChuan: num(e.target.value) });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                        </label>
                        <label htmlFor="f-lop" className="col-span-full">
                          Giáo viên bộ môn lớp
                          <input
                            type="text"
                            id="f-lop"
                            value={draft.lop}
                            disabled={multiPc}
                            onChange={(e) => {
                              const lop = e.target.value;
                              const nextPc =
                                draft.pc?.length === 1
                                  ? [{ ...draft.pc[0], lop }]
                                  : draft.pc;
                              setDraft({ ...draft, lop, pc: nextPc });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                          {multiPc && (
                            <span className="note">
                              Tự ghép từ các giai đoạn phân công bên dưới
                            </span>
                          )}
                        </label>
                        <label htmlFor="f-kiemNhiem" className="col-span-full">
                          Chức danh kiêm nhiệm
                          <input
                            type="text"
                            id="f-kiemNhiem"
                            value={draft.kiemNhiem}
                            disabled={multiPc}
                            onChange={(e) => {
                              const kiemNhiem = e.target.value;
                              const nextPc =
                                draft.pc?.length === 1
                                  ? [{ ...draft.pc[0], kn: kiemNhiem }]
                                  : draft.pc;
                              setDraft({ ...draft, kiemNhiem, pc: nextPc });
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                            }}
                          />
                          {multiPc && (
                            <span className="note">
                              Tự ghép từ các giai đoạn phân công bên dưới
                            </span>
                          )}
                        </label>
                      </div>

                      <details className="guide">
                        <summary>
                          Hướng dẫn nhập khi đổi lớp dạy, đổi chủ nhiệm giữa năm
                        </summary>
                        <ol>
                          <li>
                            Mở phiếu của giáo viên. Phần <b>Phân công theo giai đoạn</b> đã có
                            sẵn giai đoạn đầu năm (lớp, kiêm nhiệm và số tiết mỗi tuần).
                          </li>
                          <li>
                            Khi có TKB mới hoặc quyết định đổi chủ nhiệm: ở{' '}
                            <b>Thêm thay đổi phân công</b>, nhập <b>Từ tuần</b> bắt đầu áp
                            dụng, lớp dạy và kiêm nhiệm <i>sau khi đổi</i>, số tiết mỗi tuần
                            theo phân công mới, ghi căn cứ. Bấm <b>Thêm giai đoạn</b>; giai
                            đoạn cũ tự kết thúc ở tuần liền trước.
                          </li>
                          <li>
                            Ô "Giáo viên bộ môn lớp" và "Chức danh kiêm nhiệm" tự ghép theo
                            giai đoạn (VD: "Tuần 1–9: GVCN 10A16; Từ tuần 10: TPCM"), in lên
                            phiếu Excel.
                          </li>
                          <li>
                            Bấm <b>Điền số tiết theo phân công</b> để điền các tuần đã dạy; mỗi
                            tuần lấy số tiết của giai đoạn chứa tuần đó. Chỉ điền tuần trống,
                            trừ khi tích "Ghi đè".
                          </li>
                          <li>
                            Sửa tay các tuần đặc biệt (kiểm tra giữa kì/cuối kì, nghỉ lễ, dạy
                            thay). Bấm <b>Lưu phiếu</b>.
                          </li>
                          <li>
                            Đổi chủ nhiệm: giáo viên <b>giao</b> lớp thêm giai đoạn bỏ GVCN và
                            giảm cột Kiêm nhiệm; giáo viên <b>nhận</b> lớp thêm giai đoạn có
                            GVCN và tăng cột Kiêm nhiệm, cùng một tuần bắt đầu. Đổi lớp dạy
                            giữa hai giáo viên cũng làm tương tự cho cả hai phiếu.
                          </li>
                          <li>
                            Giáo viên mới về giữa năm: bấm thêm giáo viên, nhập Từ tuần ở giai
                            đoạn đầu rồi điền số tiết; các tuần trước để trống.
                          </li>
                        </ol>
                      </details>

                      <details className="pc" open>
                        <summary>
                          Phân công theo giai đoạn — đổi lớp dạy, đổi chủ nhiệm, kiêm nhiệm từ
                          tuần nào thì thêm giai đoạn từ tuần đó
                        </summary>
                        <div className="scroll">
                          <table>
                            <thead>
                              <tr>
                                <th className="l">Từ tuần</th>
                                <th className="l">Đến tuần</th>
                                <th className="l">Lớp dạy</th>
                                <th className="l">Kiêm nhiệm / chủ nhiệm</th>
                                {COLS.map(([c, l]) => (
                                  <th key={c}>
                                    {l}
                                    <br />
                                    /tuần
                                  </th>
                                ))}
                                <th>Tổng</th>
                                <th className="l">Ghi chú</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {(draft.pc || []).map((x, idx) => {
                                const isCurrent = pcOf(draft.pc, cw) === x;
                                return (
                                  <tr key={idx} className={isCurrent ? 'cur' : ''}>
                                    <td className="l">{x.tu}</td>
                                    <td className="l">
                                      {x.den == null ? (
                                        <span className="note">đang áp dụng</span>
                                      ) : (
                                        x.den
                                      )}
                                    </td>
                                    <td className="l">
                                      <input
                                        className="t"
                                        type="text"
                                        value={x.lop}
                                        onChange={(e) => {
                                          const nextPc = (draft.pc || []).map((p, i) =>
                                            i === idx ? { ...p, lop: e.target.value } : p
                                          );
                                          setDraft(syncPcText({ ...draft, pc: nextPc }));
                                          setDirtyWeeks((prev) => new Set(prev).add(0));
                                        }}
                                      />
                                    </td>
                                    <td className="l">
                                      <input
                                        className="t"
                                        type="text"
                                        value={x.kn}
                                        onChange={(e) => {
                                          const nextPc = (draft.pc || []).map((p, i) =>
                                            i === idx ? { ...p, kn: e.target.value } : p
                                          );
                                          setDraft(syncPcText({ ...draft, pc: nextPc }));
                                          setDirtyWeeks((prev) => new Set(prev).add(0));
                                        }}
                                      />
                                    </td>
                                    {COLS.map(([c]) => (
                                      <td key={c}>
                                        <input
                                          type="text"
                                          inputMode="decimal"
                                          value={
                                            num(x.mau?.[c])
                                              ? String(x.mau[c]).replace('.', ',')
                                              : ''
                                          }
                                          onChange={(e) => {
                                            const nextPc = (draft.pc || []).map((p, i) =>
                                              i === idx
                                                ? {
                                                    ...p,
                                                    mau: {
                                                      ...(p.mau || {}),
                                                      [c]: num(e.target.value),
                                                    },
                                                  }
                                                : p
                                            );
                                            setDraft({ ...draft, pc: nextPc });
                                            setDirtyWeeks((prev) => new Set(prev).add(0));
                                          }}
                                        />
                                      </td>
                                    ))}
                                    <td>{fmt(wsum(x.mau))}</td>
                                    <td className="l">
                                      <input
                                        className="t"
                                        type="text"
                                        value={x.ghiChu || ''}
                                        onChange={(e) => {
                                          const nextPc = (draft.pc || []).map((p, i) =>
                                            i === idx ? { ...p, ghiChu: e.target.value } : p
                                          );
                                          setDraft({ ...draft, pc: nextPc });
                                          setDirtyWeeks((prev) => new Set(prev).add(0));
                                        }}
                                      />
                                    </td>
                                    <td>
                                      {idx === (draft.pc?.length || 0) - 1 && idx > 0 && (
                                        <button
                                          type="button"
                                          title="Xóa giai đoạn này, giai đoạn trước sẽ áp dụng tiếp"
                                          onClick={() => {
                                            const nextPc = [...(draft.pc || [])];
                                            nextPc.pop();
                                            if (nextPc.length) {
                                              nextPc[nextPc.length - 1] = {
                                                ...nextPc[nextPc.length - 1],
                                                den: null,
                                              };
                                            }
                                            setDraft(syncPcText({ ...draft, pc: nextPc }));
                                            setDirtyWeeks((prev) => new Set(prev).add(0));
                                          }}
                                        >
                                          Xóa
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="addf">
                          <b className="basis-full text-[13px]">Thêm thay đổi phân công</b>
                          <label>
                            Từ tuần
                            <input
                              type="text"
                              inputMode="numeric"
                              value={pcAddTu}
                              onChange={(e) => setPcAddTu(e.target.value)}
                            />
                          </label>
                          <label>
                            Lớp dạy (sau thay đổi)
                            <input
                              className="t"
                              type="text"
                              value={pcAddLop}
                              onChange={(e) => setPcAddLop(e.target.value)}
                            />
                          </label>
                          <label>
                            Kiêm nhiệm / chủ nhiệm
                            <input
                              className="t"
                              type="text"
                              value={pcAddKn}
                              onChange={(e) => setPcAddKn(e.target.value)}
                            />
                          </label>
                          {COLS.map(([c, l]) => (
                            <label key={c}>
                              {l}
                              <input
                                type="text"
                                inputMode="decimal"
                                value={pcAddMau[c] ?? ''}
                                onChange={(e) =>
                                  setPcAddMau({ ...pcAddMau, [c]: e.target.value })
                                }
                              />
                            </label>
                          ))}
                          <label>
                            Ghi chú / căn cứ
                            <input
                              className="t"
                              type="text"
                              value={pcAddGhiChu}
                              placeholder="VD: TKB lần 04, QĐ số…"
                              onChange={(e) => setPcAddGhiChu(e.target.value)}
                            />
                          </label>
                          <button
                            type="button"
                            className="primary"
                            onClick={() => {
                              const p = [...(draft.pc || [])];
                              const last = p[p.length - 1];
                              const tu = parseInt(pcAddTu, 10) || 0;
                              if (!(tu >= 2 && tu <= NW)) {
                                setPcBanner({
                                  kind: 'err',
                                  text: `Nhập "Từ tuần" từ 2 đến ${NW}.`,
                                });
                                return;
                              }
                              if (last && tu <= last.tu) {
                                setPcBanner({
                                  kind: 'err',
                                  text: `Tuần bắt đầu phải sau tuần ${last.tu} (giai đoạn đang áp dụng). Muốn sửa giai đoạn cũ thì sửa trực tiếp trong bảng giai đoạn.`,
                                });
                                return;
                              }
                              if (last) {
                                p[p.length - 1] = { ...last, den: tu - 1 };
                              }
                              const mauNum: Record<string, number> = {};
                              COLS.forEach(([c]) => {
                                const v = num(pcAddMau[c]);
                                if (v) mauNum[c] = v;
                              });
                              p.push({
                                tu,
                                den: null,
                                lop: pcAddLop.trim(),
                                kn: pcAddKn.trim(),
                                mau: mauNum,
                                ghiChu: pcAddGhiChu.trim(),
                              });
                              const updated = syncPcText({ ...draft, pc: p });
                              setDraft(updated);
                              setDirtyWeeks((prev) => new Set(prev).add(0));
                              const filled: number[] = [];
                              for (let i = tu; i <= NW; i++) {
                                if (wsum(draft.weeks?.[i])) filled.push(i);
                              }
                              setPcAddTu(String(tu + 1));
                              setPcAddGhiChu('');
                              setPfFrom(String(tu));
                              setPfTo(String(Math.max(tu, cw)));
                              setPcBanner({
                                kind: 'ok',
                                text:
                                  `Đã thêm giai đoạn từ tuần ${tu}.` +
                                  (filled.length
                                    ? ` Các tuần ${filled.join(
                                        ', '
                                      )} đã có số: tích "Ghi đè" rồi bấm "Điền số tiết theo phân công" nếu muốn tính lại theo phân công mới.`
                                    : ' Bấm "Điền số tiết theo phân công" để điền các tuần đã dạy.') +
                                  ' Nhớ bấm "Lưu phiếu".',
                              });
                            }}
                          >
                            Thêm giai đoạn
                          </button>
                        </div>

                        <div className="addf">
                          <b className="basis-full text-[13px]">
                            Điền số tiết các tuần theo phân công
                          </b>
                          <label>
                            Từ tuần
                            <input
                              type="text"
                              inputMode="numeric"
                              value={pfFrom}
                              onChange={(e) => setPfFrom(e.target.value)}
                            />
                          </label>
                          <label>
                            Đến tuần
                            <input
                              type="text"
                              inputMode="numeric"
                              value={pfTo}
                              onChange={(e) => setPfTo(e.target.value)}
                            />
                          </label>
                          <label className="flex-row items-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={pfOverwrite}
                              onChange={(e) => setPfOverwrite(e.target.checked)}
                              className="w-auto"
                            />{' '}
                            Ghi đè tuần đã có số
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const a = parseInt(pfFrom, 10) || 0;
                              const b = parseInt(pfTo, 10) || 0;
                              if (!(a >= 1 && b <= NW && a <= b)) {
                                setPcBanner({
                                  kind: 'err',
                                  text: `Khoảng tuần không hợp lệ (1–${NW}).`,
                                });
                                return;
                              }
                              const done: number[] = [];
                              const skip: number[] = [];
                              const nextWeeks = { ...(draft.weeks || {}) };
                              const nextDirty = new Set(dirtyWeeks);
                              for (let w = a; w <= b; w++) {
                                const x = pcOf(draft.pc, w);
                                if (!x) continue;
                                if (wsum(nextWeeks[w]) && !pfOverwrite) {
                                  skip.push(w);
                                  continue;
                                }
                                const o: Record<string, number> = {};
                                COLS.forEach(([c]) => {
                                  if (num(x.mau?.[c])) o[c] = num(x.mau[c]);
                                });
                                nextWeeks[w] = o;
                                nextDirty.add(w);
                                done.push(w);
                              }
                              setDraft({ ...draft, weeks: nextWeeks });
                              setDirtyWeeks(nextDirty);
                              setPcBanner({
                                kind: 'ok',
                                text:
                                  (done.length
                                    ? `Đã điền tuần ${done.join(', ')}. `
                                    : 'Không có tuần nào được điền. ') +
                                  (skip.length
                                    ? `Giữ nguyên tuần đã có số: ${skip.join(', ')}. `
                                    : '') +
                                  'Kiểm tra lại tuần đặc biệt rồi bấm "Lưu phiếu".',
                              });
                            }}
                          >
                            Điền số tiết theo phân công
                          </button>
                          <span className="note">
                            Tuần hiện tại: {cw}. Tuần kiểm tra, nghỉ lễ, dạy thay… sửa tay ở
                            bảng tuần bên dưới sau khi điền.
                          </span>
                        </div>
                        {pcBanner && (
                          <div className={`banner ${pcBanner.kind}`}>{pcBanner.text}</div>
                        )}
                      </details>

                      {draftCalcN && (
                        <div className="gv-summary-bar">
                          <div className="gv-summary-item">
                            <span className="lbl">Thực tế đến tuần {N}</span>
                            <span className="val">{fmt(draftCalcN.thucTe)} tiết</span>
                          </div>
                          <div className="gv-summary-item">
                            <span className="lbl">Định mức đến tuần {N}</span>
                            <span className="val">
                              {fmt((num(draft.tieuChuan) * N) / YEARW)} tiết
                            </span>
                          </div>
                          <div className="gv-summary-item">
                            <span className="lbl">Chênh lệch đến tuần {N}</span>
                            <span className="val">
                              <SgnValue
                                n={draftCalcN.thucTe - (num(draft.tieuChuan) * N) / YEARW}
                              />{' '}
                              tiết
                            </span>
                          </div>
                          <div className="gv-summary-item">
                            <span className="lbl">Tổng thực tế cả năm (D59)</span>
                            <span className="val">{fmt(draftThucTe)} tiết</span>
                          </div>
                          <div className="gv-summary-item">
                            <span className="lbl">Tiêu chuẩn cả năm (D60)</span>
                            <span className="val">{fmt(num(draft.tieuChuan))} tiết</span>
                          </div>
                          <div className="gv-summary-item">
                            <span className="lbl">Thừa / thiếu cả năm (D61)</span>
                            <span className="val">
                              <SgnValue n={draftThucTe - num(draft.tieuChuan)} /> tiết
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="scroll">
                        <table className="sheet">
                          <thead>
                            <tr>
                              <th className="l">Tuần</th>
                              {COLS.map(([k, l]) => (
                                <th key={k}>{l}</th>
                              ))}
                              <th>Tổng</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: NW }, (_, idx) => {
                              const i = idx + 1;
                              const w: any = draft.weeks?.[i] || {};
                              const s = wsum(w);
                              return (
                                <tr
                                  key={i}
                                  className={`${s ? 'filled' : ''} ${
                                    dirtyWeeks.has(i) ? 'dirty' : ''
                                  } ${i === uptoWeek ? 'upto-row' : ''}`}
                                >
                                  <td className="l wk">
                                    Tuần {String(i).padStart(2, '0')}
                                    {i === uptoWeek ? (
                                      <span className="note"> · đang chọn</span>
                                    ) : null}
                                  </td>
                                  {COLS.map(([c]) => (
                                    <td key={c}>
                                      <input
                                        type="text"
                                        inputMode="decimal"
                                        aria-label={`Tuần ${i} ${c}`}
                                        value={
                                          w[c] !== undefined && w[c] !== 0 && w[c] !== ''
                                            ? String(w[c]).replace('.', ',')
                                            : ''
                                        }
                                        onChange={(e) => {
                                          const raw = e.target.value;
                                          const nextW = { ...(draft.weeks?.[i] || {}) } as any;
                                          nextW[c] = raw === '' ? '' : num(raw);
                                          setDraft({
                                            ...draft,
                                            weeks: { ...(draft.weeks || {}), [i]: nextW },
                                          });
                                          setDirtyWeeks((prev) => new Set(prev).add(i));
                                        }}
                                      />
                                    </td>
                                  ))}
                                  <td>
                                    <b>{s ? fmt(s) : ''}</b>
                                  </td>
                                  <td>
                                    {i > 1 && (
                                      <button
                                        type="button"
                                        className="cp"
                                        title={`Chép số tiết của tuần ${i - 1}`}
                                        onClick={() => {
                                          const prevW = draft.weeks?.[i - 1] || {};
                                          setDraft({
                                            ...draft,
                                            weeks: {
                                              ...(draft.weeks || {}),
                                              [i]: { ...prevW },
                                            },
                                          });
                                          setDirtyWeeks((prev) => new Set(prev).add(i));
                                        }}
                                      >
                                        Chép tuần trước
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td className="l">Tổng cộng</td>
                              {COLS.map(([c]) => (
                                <td key={c}>{fmt(weekTotals[c])}</td>
                              ))}
                              <td>{fmt(allWeeksSum)}</td>
                              <td />
                            </tr>
                            <tr>
                              <td className="l">KT theo PPCT</td>
                              <td colSpan={6} className="l">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  id="f-ktPpct"
                                  className="w-20"
                                  value={
                                    num(draft.ktPpct)
                                      ? String(draft.ktPpct).replace('.', ',')
                                      : ''
                                  }
                                  onChange={(e) => {
                                    setDraft({ ...draft, ktPpct: num(e.target.value) });
                                    setDirtyWeeks((prev) => new Set(prev).add(0));
                                  }}
                                />{' '}
                                <span className="note">
                                  tiết kiểm tra theo PPCT, được trừ khỏi tổng
                                </span>
                              </td>
                              <td />
                              <td />
                            </tr>
                            <tr>
                              <td className="l">Cả năm</td>
                              <td colSpan={8} className="l">
                                Thực tế <b>{fmt(draftThucTe)}</b> · Tiêu chuẩn{' '}
                                {fmt(num(draft.tieuChuan))} · Thừa/thiếu{' '}
                                <SgnValue n={draftThucTe - num(draft.tieuChuan)} />
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </>
                  )}
                </section>
              </div>
            );
          })()
        )}
      </main>
    </div>
  );
}
