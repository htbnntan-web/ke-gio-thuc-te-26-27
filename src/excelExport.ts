import { TeacherRecord, ToRecord } from './seedData';

declare global {
  interface Window {
    ExcelJS: any;
  }
}

export const COLS: [string, string][] = [
  ['chuan', 'Dạy chuẩn'],
  ['tang', 'Tăng tiết'],
  ['hn', 'Hướng nghiệp'],
  ['gddp', 'GDĐP'],
  ['kn', 'Kiêm nhiệm'],
  ['tc', 'Tăng cường'],
];

export const NW = 37;
export const YEARW = 35;

export const num = (v: any): number => {
  if (v === '' || v == null) return 0;
  const n = Number(String(v).replace(',', '.'));
  return isFinite(n) ? n : 0;
};

export const fmt = (n: number): string => {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded)
    ? rounded.toLocaleString('vi-VN')
    : rounded.toLocaleString('vi-VN', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });
};

export function wsum(w?: Record<string, any>): number {
  return w ? COLS.reduce((a, [k]) => a + num(w[k]), 0) : 0;
}

export interface CalcResult {
  cols: Record<string, number>;
  weeks: number[];
  thucTe: number;
  maxW: number;
  tc: number;
  nam: number;
}

export function calc(t: TeacherRecord, upto?: number): CalcResult {
  const r: CalcResult = {
    cols: Object.fromEntries(COLS.map(([k]) => [k, 0])),
    weeks: [],
    thucTe: 0,
    maxW: 0,
    tc: 0,
    nam: 0,
  };
  for (let i = 1; i <= NW; i++) {
    const w = t.weeks?.[i];
    const s = wsum(w);
    r.weeks[i] = s;
    if (upto && i > upto) continue;
    if (s > 0) r.maxW = i;
    COLS.forEach(([k]) => {
      r.cols[k] += num((w as any)?.[k]);
    });
    r.thucTe += s;
  }
  r.thucTe -= num(t.ktPpct);
  r.tc = num(t.tieuChuan);
  r.nam = r.thucTe - r.tc;
  return r;
}

const XL = {
  cl(c: number): string {
    let s = '';
    while (c > 0) {
      const m = (c - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      c = Math.floor((c - 1) / 26);
    }
    return s;
  },
  q(n: string): string {
    return "'" + String(n).replace(/'/g, "''") + "'";
  },
  n(v: any): number {
    if (v === '' || v == null) return 0;
    const x = Number(String(v).replace(',', '.'));
    return isFinite(x) ? x : 0;
  },
  ar(f: any): number | null {
    const s = String(f || '').replace(/^=/, '');
    if (!/^[0-9+\-*/(). ]+$/.test(s)) return null;
    try {
      return Function('return (' + s + ')')();
    } catch {
      return null;
    }
  },
  val(v: any): any {
    return v === 0 || v == null || v === '' ? null : v;
  },
  style(cell: any, si: number | undefined, M: any) {
    if (si == null) return;
    cell.style = JSON.parse(JSON.stringify(M.styles[si]));
  },
  setup(ws: any, spec: any, fitH: number) {
    const m = spec.margins || {};
    ws.pageSetup = {
      paperSize: 9,
      orientation: spec.page?.orientation || 'portrait',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: fitH,
      margins: {
        left: m.left ?? 0.7,
        right: m.right ?? 0.7,
        top: m.top ?? 0.75,
        bottom: m.bottom ?? 0.75,
        header: m.header ?? 0.3,
        footer: m.footer ?? 0.3,
      },
    };
  },
  f(formula: string, result?: any) {
    return { formula: String(formula).replace(/^=/, ''), result };
  },
};

export function xlSheetNames(list: TeacherRecord[]): string[] {
  const used = new Set<string>();
  return list.map((t) => {
    const ten = (t.ten || 'GV').trim().toUpperCase();
    const parts = (t.hoDem || '').trim().split(/\s+/).filter(Boolean);
    const lw = (parts[parts.length - 1] || '').toUpperCase();
    let n = (['THỊ', 'VĂN', ''].includes(lw) ? ten : lw + ' ' + ten).trim();
    if (used.has(n)) {
      n = (parts.slice(-2).join(' ') + ' ' + ten).toUpperCase().trim();
    }
    let k = 2;
    const b = n;
    while (used.has(n)) n = b + ' ' + k++;
    n = n.replace(/[[\]:*?/\\]/g, '').slice(0, 31) || 'GV' + used.size;
    used.add(n);
    return n;
  });
}

export function xlCalc(t: TeacherRecord) {
  const K = ['chuan', 'tang', 'hn', 'gddp', 'kn', 'tc'];
  const col = K.map(() => 0);
  const wk: Record<number, number[]> = {};
  for (let i = 1; i <= 37; i++) {
    const w: any = t.weeks?.[i] || {};
    const r = K.map((k) => XL.n(w[k]));
    wk[i] = r;
    r.forEach((v, j) => {
      col[j] += v;
    });
  }
  const kt = XL.n(t.ktPpct);
  const std = XL.n(t.tieuChuan);
  const b56 = col[0] + col[1] + col[2] + col[3];
  const d59 = b56 + col[4] + col[5] - kt;
  return {
    K,
    col,
    wk,
    kt,
    std,
    b56,
    d59,
    d61: d59 - std,
    h55: col.reduce((a, b) => a + b, 0),
  };
}

export function xlTeacherSheet(wb: any, M: any, name: string, t: TeacherRecord) {
  const S = M.gv;
  const ws = wb.addWorksheet(name, { properties: { defaultRowHeight: 15 } });
  for (const e of S.cells) {
    const cell = ws.getCell(e.r, e.c);
    XL.style(cell, e.s, M);
    if (e.v !== undefined) {
      cell.value = typeof e.v === 'string' && e.v.startsWith('=') ? XL.f(e.v) : e.v;
    }
  }
  for (const [r1, c1, r2, c2] of S.merges) ws.mergeCells(r1, c1, r2, c2);
  for (const [c, w] of Object.entries(S.widths)) ws.getColumn(+c).width = w;
  for (const [r, h] of Object.entries(S.heights)) ws.getRow(+r).height = h;
  for (const r of S.hidden) ws.getRow(r).hidden = true;
  XL.setup(ws, S, 1);
  const c = xlCalc(t);
  const up = (s: any) => String(s || '').toUpperCase();
  ws.getCell('A6').value = 'Họ và tên : ' + up(t.hoTen);
  ws.getCell('A7').value = 'Chức danh nghề nghiệp: ' + (t.chucDanh || '');
  ws.getCell('A12').value = 'Giáo viên bộ môn lớp: ' + (t.lop || '');
  ws.getCell('A13').value = 'Chức danh kiêm nhiệm: ' + (t.kiemNhiem || '');
  for (let i = 1; i <= 37; i++) {
    const r = 16 + i;
    const w = c.wk[i];
    w.forEach((v, j) => {
      ws.getCell(r, 2 + j).value = XL.val(v);
    });
    ws.getCell(r, 8).value = XL.f(`SUM(B${r}:G${r})`, w.reduce((a, b) => a + b, 0));
  }
  ws.getCell('B54').value = XL.val(c.kt);
  'BCDEFG'.split('').forEach((L, j) => {
    ws.getCell(L + '55').value = XL.f(`SUM(${L}17:${L}53)`, c.col[j]);
  });
  ws.getCell('H55').value = XL.f('SUM(H17:H53)', c.h55);
  ws.getCell('B56').value = XL.f('SUM(B55:E55)', c.b56);
  ws.getCell('D59').value = XL.f('SUM(B56,F55:G56)-B54', c.d59);
  ws.getCell('D60').value = c.std;
  ws.getCell('D61').value = XL.f('D59-D60', c.d61);
  ws.getCell('G70').value = up(t.hoTen);
  return c;
}

export function xlTnSheet(wb: any, M: any, key: string, name: string, N: number) {
  const S = M[key];
  const ws = wb.addWorksheet(name);
  const d = N - 11;
  const map = (r: number) => (r <= 18 ? r : r >= 30 ? r + d : null);
  for (const e of S.cells) {
    if (e.r === 19) {
      for (let i = 0; i < N; i++) {
        const cell = ws.getCell(19 + i, e.c);
        XL.style(cell, e.s, M);
      }
      continue;
    }
    const r = map(e.r);
    if (r == null) continue;
    const cell = ws.getCell(r, e.c);
    XL.style(cell, e.s, M);
    if (e.v !== undefined && !(typeof e.v === 'string' && e.v.startsWith('='))) {
      cell.value = e.v;
    }
  }
  for (const [r1, c1, r2, c2] of S.merges) {
    const a = map(r1);
    const b = map(r2);
    if (a == null || b == null) continue;
    ws.mergeCells(a, c1, b, c2);
  }
  for (const [c, w] of Object.entries(S.widths)) ws.getColumn(+c).width = w;
  for (const [r, h] of Object.entries(S.heights)) {
    const rr = +r;
    if (rr === 19) {
      for (let i = 0; i < N; i++) ws.getRow(19 + i).height = h;
    } else {
      const m = map(rr);
      if (m != null) ws.getRow(m).height = h;
    }
  }
  XL.setup(ws, S, 1);
  return ws;
}

export function xlToWorkbook(M: any, to: ToRecord, list: TeacherRecord[]) {
  const wb = new window.ExcelJS.Workbook();
  wb.creator = 'Kê giờ Hàm Thuận Bắc';
  wb.calcProperties.fullCalcOnLoad = true;
  const names = xlSheetNames(list);
  const N = list.length;
  const R0 = 19;
  const R1 = R0 + N - 1;
  const TOT = R1 + 1;
  const d = N - 11;
  const calcs = list.map((t, i) => xlTeacherSheet(wb, M, names[i], t));
  const mon = to.mon || to.name || '';
  const p1 = to.p1 || [
    ['Tăng cường', '', ''],
    ['Khối 10', '', ''],
    ['Khối 11', '', ''],
    ['Khối 12', '', ''],
    ['', '', ''],
  ];

  // TN_01
  const t1 = xlTnSheet(wb, M, 'tn1', 'TN_01', N);
  t1.getCell('A5').value = 'MÔN: ' + mon;
  const hnSum = calcs.reduce((a, c) => a + c.col[2], 0);
  const gdSum = calcs.reduce((a, c) => a + c.col[3], 0);
  const tcSum = calcs.reduce((a, c) => a + c.col[5], 0);
  const pv = (f: string): [string, number | null] => {
    const raw = String(f || '').trim();
    const up = raw.toUpperCase();
    if (up === '@HN') return [`TN_02!H${TOT}`, hnSum];
    if (up === '@GDDP') return [`TN_02!I${TOT}`, gdSum];
    if (up === '@TC') return [`TN_02!L${TOT}`, tcSum];
    return [raw, XL.ar(raw)];
  };

  let p1sum = 0;
  p1.forEach((row, j) => {
    const r = 8 + j;
    t1.getCell(r, 2).value = row[0] || null;
    const [fx, v] = pv(row[1]);
    p1sum += v || 0;
    t1.getCell(r, 3).value = row[1] ? XL.f(fx, v ?? 0) : null;
    t1.getCell(r, 4).value = row[2] || null;
    if (row[2] && String(row[2]).length > 60) {
      const c = t1.getCell(r, 4);
      c.alignment = { ...(c.alignment || {}), wrapText: true, vertical: 'middle' };
      t1.getRow(r).height = 30;
    }
  });
  t1.getCell('C13').value = XL.f('SUM(C8:C12)', p1sum);
  const S1: Record<string, number> = { D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0 };
  list.forEach((t, i) => {
    const r = R0 + i;
    const s = XL.q(names[i]);
    const c = calcs[i];
    const E = c.b56 - c.kt + c.col[4] + c.col[5];
    const row: Record<string, number> = {
      D: c.std,
      E,
      F: c.b56,
      G: c.kt,
      H: c.col[4],
      I: c.col[5],
      J: E - c.std,
    };
    t1.getCell(r, 1).value = i + 1;
    t1.getCell(r, 2).value = t.hoDem || '';
    t1.getCell(r, 3).value = t.ten || '';
    t1.getCell(r, 4).value = XL.f(`${s}!D60`, row.D);
    t1.getCell(r, 5).value = XL.f(`F${r}-G${r}+H${r}+I${r}`, row.E);
    t1.getCell(r, 6).value = XL.f(`${s}!B56`, row.F);
    t1.getCell(r, 7).value = XL.f(`${s}!B54`, row.G);
    t1.getCell(r, 8).value = XL.f(`${s}!F55`, row.H);
    t1.getCell(r, 9).value = XL.f(`${s}!G55`, row.I);
    t1.getCell(r, 10).value = XL.f(`E${r}-D${r}`, row.J);
    for (const k in S1) S1[k] += row[k];
  });
  t1.getCell(TOT, 2).value = 'TỔNG CỘNG';
  'DEFGHIJ'.split('').forEach((L) => {
    t1.getCell(L + TOT).value = XL.f(`SUM(${L}${R0}:${L}${R1})`, S1[L]);
  });
  t1.getCell(TOT + 1, 2).value = XL.f(
    `"Tổng số tiết thừa (thiếu):"&" "&J${TOT}&" tiết "`,
    `Tổng số tiết thừa (thiếu): ${S1.J} tiết `
  );
  t1.getCell(38 + d, 8).value = to.tt || '';

  // TN_02
  const t2 = xlTnSheet(wb, M, 'tn2', 'TN_02', N);
  t2.getCell('A5').value = 'MÔN: ' + mon;
  p1.forEach((row, j) => {
    const r = 8 + j;
    t2.getCell(r, 1).value = j + 1;
    t2.getCell(r, 2).value = XL.f(`TN_01!B${r}`, row[0] || '');
    t2.getCell(r, 3).value = XL.f(`TN_01!C${r}`, pv(row[1])[1] ?? 0);
    t2.getCell(r, 4).value = XL.f(`IF(TN_01!D${r}="","",TN_01!D${r})`, row[2] || '');
    if (row[2] && String(row[2]).length > 60) {
      const c = t2.getCell(r, 4);
      c.alignment = { ...(c.alignment || {}), wrapText: true, vertical: 'middle' };
      t2.getRow(r).height = 30;
    }
  });
  t2.getCell('C13').value = XL.f('SUM(C8:C12)', p1sum);
  const S2: Record<string, number> = {
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
    J: 0,
    K: 0,
    L: 0,
    M: 0,
  };
  list.forEach((t, i) => {
    const r = R0 + i;
    const s = XL.q(names[i]);
    const c = calcs[i];
    const row: Record<string, number> = {
      D: c.std,
      F: c.col[0] - c.kt,
      G: c.col[1],
      H: c.col[2],
      I: c.col[3],
      J: c.kt,
      K: c.col[4],
      L: c.col[5],
      E: 0,
      M: 0,
    };
    row.E = row.F + row.G + row.H + row.I + row.K + row.L;
    row.M = row.E - row.D;
    t2.getCell(r, 1).value = i + 1;
    t2.getCell(r, 2).value = XL.f(`TN_01!B${r}`, t.hoDem || '');
    t2.getCell(r, 3).value = XL.f(`TN_01!C${r}`, t.ten || '');
    t2.getCell(r, 4).value = XL.f(`${s}!D60`, row.D);
    t2.getCell(r, 5).value = XL.f(`SUM(F${r}:I${r},K${r}:L${r})`, row.E);
    t2.getCell(r, 6).value = XL.f(`${s}!B55-${s}!B54`, row.F);
    t2.getCell(r, 7).value = XL.f(`${s}!C55`, row.G);
    t2.getCell(r, 8).value = XL.f(`${s}!D55`, row.H);
    t2.getCell(r, 9).value = XL.f(`${s}!E55`, row.I);
    t2.getCell(r, 10).value = XL.f(`${s}!B54`, row.J);
    t2.getCell(r, 11).value = XL.f(`${s}!F55`, row.K);
    t2.getCell(r, 12).value = XL.f(`${s}!G55`, row.L);
    t2.getCell(r, 13).value = XL.f(`E${r}-D${r}`, row.M);
    for (const k in S2) S2[k] += row[k];
  });
  t2.getCell(TOT, 2).value = 'TỔNG CỘNG';
  'DEFGHIJKLM'.split('').forEach((L) => {
    t2.getCell(L + TOT).value = XL.f(`SUM(${L}${R0}:${L}${R1})`, S2[L]);
  });
  t2.getCell(TOT + 1, 6).value = XL.f(`SUM(F${TOT}:J${TOT})`, S2.F + S2.G + S2.H + S2.I + S2.J);
  t2.getCell(TOT + 2, 2).value = XL.f(
    `"Tổng số tiết thừa (thiếu):"&" "&M${TOT}&" tiết "`,
    `Tổng số tiết thừa (thiếu): ${S2.M} tiết `
  );
  t2.getCell(39 + d, 11).value = to.tt || '';

  // TN_03
  const S3 = M.tn3;
  const t3 = wb.addWorksheet('TN_03');
  const TC = 2 + N;
  const TL = XL.cl(TC);
  const LL = XL.cl(1 + N);
  const cmap = (c: number) =>
    c === 1 ? [1] : c === 2 ? Array.from({ length: N }, (_, i) => 2 + i) : c === 13 ? [TC] : [];
  for (const e of S3.cells) {
    for (const cc of cmap(e.c)) {
      const cell = t3.getCell(e.r, cc);
      XL.style(cell, e.s, M);
      if (e.v !== undefined && !(typeof e.v === 'string' && e.v.startsWith('=')) && e.c !== 2) {
        cell.value = e.v;
      }
    }
  }
  for (const [r1, c1, r2, c2] of S3.merges) {
    let a = c1;
    let b = c2;
    if (c1 === 13) {
      a = TC;
      b = TC;
    } else if (c1 === 1 && c2 === 13) {
      b = TC;
    } else if (c1 !== 1) continue;
    t3.mergeCells(r1, a, r2, b);
  }
  for (const [c, w] of Object.entries(S3.widths)) {
    const cc = +c;
    if (cc === 1) t3.getColumn(1).width = w;
    else if (cc === 2) for (let i = 0; i < N; i++) t3.getColumn(2 + i).width = w;
    else if (cc === 13) t3.getColumn(TC).width = w;
  }
  for (const [r, h] of Object.entries(S3.heights)) t3.getRow(+r).height = h;
  for (const r of S3.hidden || []) t3.getRow(r).hidden = true;
  XL.setup(t3, S3, 0);
  t3.getCell('A4').value = 'KIỂM TRA LỖI KÊ GIỜ THEO TUẦN - MÔN ' + mon.toUpperCase();
  const colTot = Array(57).fill(0);
  list.forEach((t, i) => {
    const cc = 2 + i;
    const L = XL.cl(cc);
    const s = XL.q(names[i]);
    const c = calcs[i];
    let sum = 0;
    t3.getCell(9, cc).value = i + 1;
    t3.getCell(15, cc).value = XL.f(`VLOOKUP(${L}9,TN_01!$A$${R0}:$C$${R1},2,0)`, t.hoDem || '');
    t3.getCell(16, cc).value = XL.f(`VLOOKUP(${L}9,TN_01!$A$${R0}:$C$${R1},3,0)`, t.ten || '');
    for (let r = 17; r <= 51; r++) {
      const v = c.wk[r - 16][0];
      sum += v;
      colTot[r] += v;
      t3.getCell(r, cc).value = XL.f(`${s}!B${r}`, v);
    }
    t3.getCell(52, cc).value = XL.f(`${s}!B54`, c.kt);
    sum += c.kt;
    colTot[52] += c.kt;
    t3.getCell(54, cc).value = XL.f(`SUM(${L}17:${L}52)`, sum);
  });
  for (let r = 17; r <= 52; r++) {
    t3.getCell(r, TC).value = XL.f(`SUM(B${r}:${LL}${r})`, colTot[r]);
  }
  t3.getCell(54, TC).value = XL.f(
    `SUM(${TL}17:${TL}52)`,
    colTot.slice(17, 53).reduce((a, b) => a + b, 0)
  );
  t3.getCell(15, TC).value = 'TỔNG CỘNG';
  return wb;
}

export function xlGvWorkbook(M: any, t: TeacherRecord) {
  const wb = new window.ExcelJS.Workbook();
  wb.creator = 'Kê giờ Hàm Thuận Bắc';
  wb.calcProperties.fullCalcOnLoad = true;
  xlTeacherSheet(wb, M, xlSheetNames([t])[0], t);
  return wb;
}

export function xlSchoolWorkbook(
  N: number,
  tos: [string, ToRecord][],
  teachersOf: (k: string) => [string, TeacherRecord][]
) {
  const wb = new window.ExcelJS.Workbook();
  wb.creator = 'Kê giờ Hàm Thuận Bắc';
  wb.calcProperties.fullCalcOnLoad = true;
  const s = wb.addWorksheet('TONG_HOP');
  const g = wb.addWorksheet('GIAO_VIEN');
  const w = wb.addWorksheet('THEO_TUAN');
  const F = 'Times New Roman';
  const B = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };
  const K = COLS.map((c) => c[0]);
  const r1 = (x: number) => Math.round(x * 10) / 10;
  const gv = tos.flatMap(([k, to]) =>
    teachersOf(k).map(([, t]) => ({ k, to, t, r: calc(t, N), rf: calc(t) }))
  );

  function head(ws: any, lastCol: number, title: string, sub: string) {
    const m = Math.max(4, Math.min(6, Math.floor(lastCol / 3)));
    ws.mergeCells(1, 1, 1, m);
    ws.getCell(1, 1).value = 'SỞ GIÁO DỤC VÀ ĐÀO TẠO LÂM ĐỒNG';
    ws.mergeCells(2, 1, 2, m);
    ws.getCell(2, 1).value = 'TRƯỜNG THPT HÀM THUẬN BẮC';
    [1, 2].forEach((r) => {
      const c = ws.getCell(r, 1);
      c.font = { name: F, size: 11, bold: r === 2 };
      c.alignment = { horizontal: 'center' };
    });
    ws.mergeCells(4, 1, 4, lastCol);
    ws.getCell(4, 1).value = title;
    ws.getCell(4, 1).font = { name: F, size: 14, bold: true };
    ws.getCell(4, 1).alignment = { horizontal: 'center' };
    ws.mergeCells(5, 1, 5, lastCol);
    ws.getCell(5, 1).value = 'NĂM HỌC 2026 - 2027';
    ws.getCell(5, 1).font = { name: F, size: 12, bold: true };
    ws.getCell(5, 1).alignment = { horizontal: 'center' };
    ws.mergeCells(6, 1, 6, lastCol);
    ws.getCell(6, 1).value = sub;
    ws.getCell(6, 1).font = { name: F, size: 11, italic: true };
    ws.getCell(6, 1).alignment = { horizontal: 'center' };
  }

  function hdrRow(ws: any, r: number, labels: string[], h: number) {
    ws.getRow(r).height = h || 42;
    labels.forEach((l, i) => {
      const c = ws.getCell(r, i + 1);
      c.value = l;
      c.font = { name: F, size: 11, bold: true };
      c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      c.border = B;
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7EEF8' } };
    });
  }

  function body(c: any, bold = false, left = false) {
    c.font = { name: F, size: 11, bold: !!bold };
    c.border = B;
    c.alignment = { horizontal: left ? 'left' : 'center', vertical: 'middle', wrapText: !!left };
  }

  function sign(ws: any, r0: number, cols: [number, number][]) {
    const [a1, a2] = cols[2];
    ws.mergeCells(r0, a1, r0, a2);
    const d = ws.getCell(r0, a1);
    d.value = 'Hàm Thuận, ngày …… tháng …… năm 2027';
    d.font = { name: F, size: 11, italic: true };
    d.alignment = { horizontal: 'center' };
    const roles = [
      ['HIỆU TRƯỞNG', 'Trần Trung Toàn'],
      ['P. HIỆU TRƯỞNG', 'Nguyễn Ngọc Tân'],
      ['KẾ TOÁN', ''],
    ];
    roles.forEach(([a, b], i) => {
      const [c1, c2] = cols[i];
      ws.mergeCells(r0 + 1, c1, r0 + 1, c2);
      ws.mergeCells(r0 + 6, c1, r0 + 6, c2);
      const x = ws.getCell(r0 + 1, c1);
      const y = ws.getCell(r0 + 6, c1);
      x.value = a;
      y.value = b || null;
      x.font = { name: F, size: 12, bold: true };
      y.font = { name: F, size: 12, bold: true };
      x.alignment = y.alignment = { horizontal: 'center' };
    });
  }

  // GIAO_VIEN
  const GL = [
    'STT',
    'Tổ / nhóm',
    'Họ và tên',
    'Chức danh kiêm nhiệm',
    ...COLS.map((c) => c[1]),
    'KT theo PPCT',
    'Thực tế đến tuần ' + N,
    'Định mức đến tuần ' + N,
    'Chênh lệch so định mức',
    'Tiêu chuẩn cả năm',
    'Đã kê đến tuần',
  ];
  const gLast = GL.length;
  head(
    g,
    gLast,
    'DANH SÁCH KÊ GIỜ THỰC TẾ CỦA GIÁO VIÊN TOÀN TRƯỜNG',
    'Số liệu cộng từ tuần 01 đến tuần ' + String(N).padStart(2, '0')
  );
  hdrRow(g, 8, GL, 48);
  const g0 = 9;
  gv.forEach((x, i) => {
    const r = g0 + i;
    const t = x.t;
    const R = x.r;
    const dm = r1((R.tc * N) / YEARW);
    const cK = 5;
    const cKT = 5 + K.length;
    const cTT = cKT + 1;
    const cDM = cTT + 1;
    const cCL = cDM + 1;
    const cTC = cCL + 1;
    const L = XL.cl;
    const vals = [
      i + 1,
      x.to.name,
      t.hoTen,
      t.kiemNhiem || '',
      ...K.map((k) => R.cols[k] || 0),
      num(t.ktPpct),
    ];
    vals.forEach((v, j) => {
      const c = g.getCell(r, j + 1);
      c.value = v;
      body(c, false, j >= 1 && j <= 3);
    });
    const sumF = `SUM(${L(cK)}${r}:${L(cKT - 1)}${r})-${L(cKT)}${r}`;
    g.getCell(r, cTT).value = XL.f(sumF, R.thucTe);
    body(g.getCell(r, cTT), true);
    g.getCell(r, cDM).value = XL.f(`ROUND(${L(cTC)}${r}*${N}/${YEARW},1)`, dm);
    body(g.getCell(r, cDM));
    g.getCell(r, cCL).value = XL.f(`${L(cTT)}${r}-${L(cDM)}${r}`, r1(R.thucTe - dm));
    body(g.getCell(r, cCL), true);
    g.getCell(r, cTC).value = R.tc;
    body(g.getCell(r, cTC));
    g.getCell(r, cTC + 1).value = x.r.maxW ? 'Tuần ' + String(x.r.maxW).padStart(2, '0') : 'Chưa kê';
    body(g.getCell(r, cTC + 1));
  });
  const gT = g0 + gv.length;
  g.mergeCells(gT, 1, gT, 4);
  g.getCell(gT, 1).value = 'TỔNG CỘNG TOÀN TRƯỜNG';
  for (let c = 1; c <= gLast; c++) body(g.getCell(gT, c), true, c === 1);
  for (let c = 5; c <= gLast - 1; c++) {
    const L = XL.cl(c);
    let v = 0;
    if (c < 5 + K.length) v = gv.reduce((a, x) => a + (x.r.cols[K[c - 5]] || 0), 0);
    else if (c === 5 + K.length) v = gv.reduce((a, x) => a + num(x.t.ktPpct), 0);
    else if (c === 6 + K.length) v = gv.reduce((a, x) => a + x.r.thucTe, 0);
    else if (c === 7 + K.length) v = gv.reduce((a, x) => a + r1((x.r.tc * N) / YEARW), 0);
    else if (c === 8 + K.length)
      v = gv.reduce((a, x) => a + r1(x.r.thucTe - r1((x.r.tc * N) / YEARW)), 0);
    else v = gv.reduce((a, x) => a + x.r.tc, 0);
    g.getCell(gT, c).value = XL.f(`SUM(${L}${g0}:${L}${gT - 1})`, r1(v));
  }
  [6, 16, 26, 30, ...K.map(() => 10), 9, 11, 11, 11, 10, 10].forEach(
    (wCol, i) => (g.getColumn(i + 1).width = wCol)
  );
  sign(g, gT + 2, [
    [1, 3],
    [5, 9],
    [gLast - 4, gLast],
  ]);
  g.pageSetup = {
    paperSize: 9,
    orientation: 'landscape',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
    printTitlesRow: '8:8',
    margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.3, footer: 0.3 },
  };

  // TONG_HOP
  const SL = [
    'STT',
    'Tổ / nhóm chuyên môn',
    'Tổ trưởng',
    'Số GV',
    ...COLS.map((c) => c[1]),
    'KT theo PPCT',
    'Thực tế đến tuần ' + N,
    'Định mức đến tuần ' + N,
    'Chênh lệch so định mức',
    'Tiêu chuẩn cả năm',
  ];
  const sLast = SL.length;
  head(
    s,
    sLast,
    'TỔNG HỢP KÊ GIỜ THỰC TẾ TOÀN TRƯỜNG',
    'Số liệu cộng từ tuần 01 đến tuần ' +
      String(N).padStart(2, '0') +
      ' (chi tiết từng giáo viên ở sheet GIAO_VIEN)'
  );
  hdrRow(s, 8, SL, 48);
  const gRange = (c: number) => `GIAO_VIEN!$${XL.cl(c)}$${g0}:$${XL.cl(c)}$${gT - 1}`;
  const gTo = `GIAO_VIEN!$B$${g0}:$B$${gT - 1}`;
  tos.forEach(([k, to], i) => {
    const r = 9 + i;
    const xs = gv.filter((x) => x.k === k);
    [i + 1, to.name, to.tt || ''].forEach((v, j) => {
      const c = s.getCell(r, j + 1);
      c.value = v;
      body(c, false, j > 0);
    });
    s.getCell(r, 4).value = XL.f(`COUNTIF(${gTo},B${r})`, xs.length);
    body(s.getCell(r, 4));
    for (let j = 0; j < SL.length - 4; j++) {
      const gc = 5 + j;
      let v: number;
      if (j < K.length) v = xs.reduce((a, x) => a + (x.r.cols[K[j]] || 0), 0);
      else if (j === K.length) v = xs.reduce((a, x) => a + num(x.t.ktPpct), 0);
      else if (j === K.length + 1) v = xs.reduce((a, x) => a + x.r.thucTe, 0);
      else if (j === K.length + 2) v = xs.reduce((a, x) => a + r1((x.r.tc * N) / YEARW), 0);
      else if (j === K.length + 3)
        v = xs.reduce((a, x) => a + r1(x.r.thucTe - r1((x.r.tc * N) / YEARW)), 0);
      else v = xs.reduce((a, x) => a + x.r.tc, 0);
      const c = s.getCell(r, gc);
      c.value = XL.f(`SUMIF(${gTo},$B${r},${gRange(gc)})`, r1(v));
      body(c, j === K.length + 1 || j === K.length + 3);
    }
  });
  const sT = 9 + tos.length;
  s.mergeCells(sT, 1, sT, 3);
  s.getCell(sT, 1).value = 'TOÀN TRƯỜNG';
  for (let c = 1; c <= sLast; c++) body(s.getCell(sT, c), true, c === 1);
  for (let c = 4; c <= sLast; c++) {
    const L = XL.cl(c);
    s.getCell(sT, c).value = XL.f(
      `SUM(${L}9:${L}${sT - 1})`,
      c === 4
        ? gv.length
        : r1(
            gv.reduce((a, x) => {
              const j = c - 5;
              return (
                a +
                (j < K.length
                  ? x.r.cols[K[j]] || 0
                  : j === K.length
                  ? num(x.t.ktPpct)
                  : j === K.length + 1
                  ? x.r.thucTe
                  : j === K.length + 2
                  ? r1((x.r.tc * N) / YEARW)
                  : j === K.length + 3
                  ? r1(x.r.thucTe - r1((x.r.tc * N) / YEARW))
                  : x.r.tc)
              );
            }, 0)
          )
    );
  }
  s.mergeCells(sT + 1, 1, sT + 1, sLast);
  const ln = s.getCell(sT + 1, 1);
  const totalDiff = r1(
    gv.reduce((a, x) => a + r1(x.r.thucTe - r1((x.r.tc * N) / YEARW)), 0)
  );
  ln.value = XL.f(
    `"Toàn trường "&IF(${XL.cl(sLast - 1)}${sT}<0,"thiếu ","thừa ")&ROUND(ABS(${XL.cl(
      sLast - 1
    )}${sT}),1)&" tiết so với định mức đến tuần ${N}."`,
    `Toàn trường ${totalDiff < 0 ? 'thiếu ' : 'thừa '}${Math.abs(totalDiff)} tiết so với định mức đến tuần ${N}.`
  );
  ln.font = { name: F, size: 12, bold: true, italic: true };
  [6, 30, 24, 7, ...K.map(() => 10), 9, 11, 11, 11, 11].forEach(
    (wCol, i) => (s.getColumn(i + 1).width = wCol)
  );
  sign(s, sT + 3, [
    [1, 3],
    [5, 9],
    [sLast - 4, sLast],
  ]);
  s.pageSetup = {
    paperSize: 9,
    orientation: 'landscape',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.3, footer: 0.3 },
  };

  // THEO_TUAN
  const WL = [
    'STT',
    'Tổ / nhóm',
    ...Array.from({ length: N }, (_, i) => 'T' + String(i + 1).padStart(2, '0')),
    'Cộng',
  ];
  head(
    w,
    WL.length,
    'TIẾN ĐỘ KÊ GIỜ THEO TUẦN CỦA CÁC TỔ',
    'Tổng số tiết các giáo viên trong tổ đã kê từng tuần (chưa trừ KT theo PPCT)'
  );
  hdrRow(w, 8, WL, 30);
  tos.forEach(([k, to], i) => {
    const r = 9 + i;
    const xs = gv.filter((x) => x.k === k);
    w.getCell(r, 1).value = i + 1;
    w.getCell(r, 2).value = to.name;
    body(w.getCell(r, 1));
    body(w.getCell(r, 2), false, true);
    let tt = 0;
    for (let j = 1; j <= N; j++) {
      const v = xs.reduce((a, x) => a + (x.rf.weeks[j] || 0), 0);
      tt += v;
      const c = w.getCell(r, 2 + j);
      c.value = v || null;
      body(c);
    }
    const c = w.getCell(r, N + 3);
    c.value = XL.f(`SUM(${XL.cl(3)}${r}:${XL.cl(N + 2)}${r})`, tt);
    body(c, true);
  });
  const wT = 9 + tos.length;
  w.mergeCells(wT, 1, wT, 2);
  w.getCell(wT, 1).value = 'TOÀN TRƯỜNG';
  for (let c = 1; c <= N + 3; c++) body(w.getCell(wT, c), true, c === 1);
  for (let c = 3; c <= N + 3; c++) {
    const L = XL.cl(c);
    const v =
      c <= N + 2
        ? gv.reduce((a, x) => a + (x.rf.weeks[c - 2] || 0), 0)
        : gv.reduce((a, x) => a + x.rf.weeks.slice(1, N + 1).reduce((p, q) => p + (q || 0), 0), 0);
    w.getCell(wT, c).value = XL.f(`SUM(${L}9:${L}${wT - 1})`, v);
  }
  w.getColumn(1).width = 6;
  w.getColumn(2).width = 30;
  for (let c = 3; c <= N + 3; c++) w.getColumn(c).width = 7;
  w.pageSetup = {
    paperSize: 9,
    orientation: 'landscape',
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.3, footer: 0.3 },
  };
  return wb;
}

let cachedMau: any = null;
export async function loadMau(): Promise<any> {
  if (cachedMau) return cachedMau;
  const r = await fetch('/mau.json');
  if (!r.ok) throw new Error('Không tải được mau.json');
  cachedMau = await r.json();
  return cachedMau;
}

export function evalP1Value(
  formula: string,
  hnSum: number,
  gdSum: number,
  tcSum = 0
): number | null {
  const raw = String(formula || '').trim();
  if (!raw) return null;
  const up = raw.toUpperCase();
  if (up === '@HN') return hnSum;
  if (up === '@GDDP') return gdSum;
  if (up === '@TC') return tcSum;
  return XL.ar(raw);
}

export function slugVi(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function triggerBlobDownload(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function downloadCsv(filename: string, rows: any[][]) {
  const content =
    '\uFEFF' +
    rows
      .map((r) =>
        r
          .map((v) => {
            const s = String(v ?? '');
            return /[",;\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
          })
          .join(',')
      )
      .join('\r\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  triggerBlobDownload(filename, blob);
}

export function buildTeacherCsvRows(
  list: [string, TeacherRecord][],
  tos: Record<string, ToRecord>,
  N: number
): any[][] {
  const hdr = [
    'Tổ',
    'TT',
    'Họ và tên',
    'Kiêm nhiệm',
    ...COLS.map((c) => c[1]),
    'KT PPCT',
    'Thực tế đến tuần ' + N,
    'Định mức đến tuần ' + N,
    'Chênh lệch',
    'Tiêu chuẩn năm',
    ...Array.from({ length: NW }, (_, i) => 'T' + (i + 1)),
  ];
  const out: any[][] = [hdr];
  for (const [, t] of list) {
    const r = calc(t, N);
    const rf = calc(t);
    out.push([
      tos[t.to]?.name || t.to,
      t.stt,
      t.hoTen,
      t.kiemNhiem,
      ...COLS.map(([c]) => r.cols[c]),
      num(t.ktPpct),
      r.thucTe,
      Math.round(((r.tc * N) / YEARW) * 10) / 10,
      Math.round((r.thucTe - (r.tc * N) / YEARW) * 10) / 10,
      r.tc,
      ...Array.from({ length: NW }, (_, i) => rf.weeks[i + 1] || ''),
    ]);
  }
  return out;
}

function cellText(ws: any, r: number, c: number): string {
  const cell = ws.getCell(r, c);
  const v = cell?.value;
  if (v == null) return '';
  if (typeof v === 'string' || typeof v === 'number') return String(v).trim();
  if (typeof v === 'object') {
    if (Array.isArray(v.richText)) {
      return v.richText.map((x: any) => x.text || '').join('').trim();
    }
    if (v.result !== undefined && v.result !== null && typeof v.result !== 'object') {
      return String(v.result).trim();
    }
    if (typeof v.text === 'string') return v.text.trim();
  }
  return '';
}

function cellNum(ws: any, r: number, c: number): number {
  const cell = ws.getCell(r, c);
  const v = cell?.value;
  if (v == null) return 0;
  if (typeof v === 'number') return isFinite(v) ? v : 0;
  if (typeof v === 'string') return num(v);
  if (typeof v === 'object') {
    if (typeof v.result === 'number') return isFinite(v.result) ? v.result : 0;
    if (typeof v.result === 'string') return num(v.result);
    if (typeof v.formula === 'string') {
      const evaluated = XL.ar(v.formula);
      if (evaluated != null && isFinite(evaluated)) return evaluated;
    }
  }
  return 0;
}

function cellFormula(ws: any, r: number, c: number): string {
  const cell = ws.getCell(r, c);
  const v = cell?.value;
  if (v && typeof v === 'object' && typeof v.formula === 'string') {
    return v.formula.trim();
  }
  if (typeof v === 'string' && v.trim().startsWith('=')) {
    return v.trim().slice(1);
  }
  return '';
}

function toTitleCaseVi(str: string): string {
  const s = str.trim().replace(/\s+/g, ' ');
  if (!s) return '';
  if (s !== s.toUpperCase()) return s;
  return s
    .toLowerCase()
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

function splitFullName(fullName: string): { hoDem: string; ten: string; hoTen: string } {
  const clean = toTitleCaseVi(fullName);
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { hoDem: '', ten: '', hoTen: '' };
  if (parts.length === 1) return { hoDem: '', ten: parts[0], hoTen: parts[0] };
  const ten = parts[parts.length - 1];
  const hoDem = parts.slice(0, -1).join(' ');
  return { hoDem, ten, hoTen: `${hoDem} ${ten}`.trim() };
}

function normSearch(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function guessToKey(
  filename: string,
  monText: string,
  tos: Record<string, ToRecord>
): string | null {
  const combined = normSearch(`${monText} ${filename}`);
  // Priority specific matches first
  const rules: [string, RegExp][] = [
    ['vat-li', /\b(vat li|vat ly)\b/],
    ['cncn', /\b(cn cong nghiep|cong nghiep|cncn)\b/],
    ['sinh-hoc', /\b(sinh hoc)\b/],
    ['cnnn', /\b(cn nong nghiep|nong nghiep|cnnn)\b/],
    ['gdktpl', /\b(gdkt|ktpl|gdktpl|kinh te|phap luat)\b/],
    ['gdqp-an', /\b(gdqp|qpan|gdqpan|quoc phong|an ninh)\b/],
    ['gdtc', /\b(gdtc|the chat|the duc)\b/],
    ['tin-hoc', /\b(tin hoc|tinhoc|\btin\b)\b/],
    ['tieng-anh', /\b(tieng anh|ngoai ngu|\banh\b)\b/],
    ['ngu-van', /\b(ngu van|\bvan\b)\b/],
    ['toan', /\b(toan)\b/],
    ['hoa-hoc', /\b(hoa hoc|\bhoa\b)\b/],
    ['lich-su', /\b(lich su|\bsu\b)\b/],
    ['dia-li', /\b(dia li|dia ly|\bdia\b)\b/],
  ];
  for (const [key, regex] of rules) {
    if (tos[key] && regex.test(combined)) {
      return key;
    }
  }
  for (const [key, to] of Object.entries(tos)) {
    const nName = normSearch(to.name);
    const nMon = normSearch(to.mon);
    if ((nName && combined.includes(nName)) || (nMon && combined.includes(nMon))) {
      return key;
    }
  }
  return null;
}

export interface ParsedToWorkbook {
  detectedToKey: string | null;
  mon: string;
  tt: string;
  p1: [string, string, string][] | null;
  teachers: TeacherRecord[];
}

export async function parseXlsxWorkbook(
  buffer: ArrayBuffer,
  filename: string,
  tos: Record<string, ToRecord>,
  forcedToKey?: string
): Promise<ParsedToWorkbook> {
  if (typeof window.ExcelJS === 'undefined') {
    throw new Error('Thư viện ExcelJS chưa sẵn sàng');
  }
  const wb = new window.ExcelJS.Workbook();
  await wb.xlsx.load(buffer);

  const wsByName = new Map<string, any>();
  wb.worksheets.forEach((ws: any) => {
    wsByName.set(String(ws.name).trim(), ws);
    wsByName.set(String(ws.name).trim().toUpperCase(), ws);
  });

  const tn1 = wsByName.get('TN_01');
  const tn2 = wsByName.get('TN_02');

  let mon = '';
  let tt = '';
  let p1: [string, string, string][] | null = null;

  const tn1Entries: {
    stt: number;
    hoDem: string;
    ten: string;
    sheetName: string;
    tieuChuan: number;
  }[] = [];

  if (tn1) {
    const a5 = cellText(tn1, 5, 1);
    if (a5) {
      mon = a5.replace(/^MÔN\s*:\s*/i, '').trim();
    }
    const p1Rows: [string, string, string][] = [];
    for (let r = 8; r <= 12; r++) {
      const bText = cellText(tn1, r, 2);
      const cForm = cellFormula(tn1, r, 3);
      const cText = cellText(tn1, r, 3);
      const dText = cellText(tn1, r, 4);
      let cVal = '';
      if (/^'?TN_02'?!\$?H\$?\d+$/i.test(cForm)) {
        cVal = '@HN';
      } else if (/^'?TN_02'?!\$?I\$?\d+$/i.test(cForm)) {
        cVal = '@GDDP';
      } else if (/^'?TN_02'?!\$?L\$?\d+$/i.test(cForm)) {
        cVal = '@TC';
      } else if (cForm) {
        cVal = '=' + cForm.replace(/^=/, '');
      } else if (cText && cText !== '0') {
        cVal = cText;
      }
      p1Rows.push([bText, cVal, dText]);
    }
    if (p1Rows.some((r) => r[0] || r[1] || r[2])) {
      p1 = p1Rows;
    }

    let r = 19;
    while (r <= 150) {
      const bVal = cellText(tn1, r, 2);
      const cVal = cellText(tn1, r, 3);
      if (bVal.toUpperCase().includes('TỔNG CỘNG') || cellText(tn1, r, 1).toUpperCase().includes('TỔNG CỘNG')) {
        break;
      }
      let sheetRef = '';
      for (const colIdx of [4, 6, 7, 8, 9]) {
        const f = cellFormula(tn1, r, colIdx);
        const m = f.match(/^'?([^'!]+)'?!/);
        if (m && m[1] && !['TN_01', 'TN_02', 'TN_03'].includes(m[1].toUpperCase())) {
          sheetRef = m[1].replace(/''/g, "'").trim();
          break;
        }
      }
      if (!bVal && !cVal && !sheetRef) {
        break;
      }
      const stt = cellNum(tn1, r, 1) || tn1Entries.length + 1;
      const tcVal = cellNum(tn1, r, 4) || 595;
      tn1Entries.push({
        stt,
        hoDem: bVal,
        ten: cVal,
        sheetName: sheetRef,
        tieuChuan: tcVal,
      });
      r++;
    }

    // Look for Tổ trưởng name below "TỔ TRƯỞNG" in TN_01
    for (let rr = r; rr <= r + 18; rr++) {
      for (let cc = 6; cc <= 11; cc++) {
        const txt = cellText(tn1, rr, cc);
        if (txt && /^(TỔ TRƯỞNG|TTCM)$/i.test(txt)) {
          for (let k = rr + 2; k <= rr + 7; k++) {
            const nameCandidate = cellText(tn1, k, cc);
            if (nameCandidate && nameCandidate.length > 3) {
              tt = nameCandidate;
              break;
            }
          }
        }
      }
      if (tt) break;
    }
  }

  if (!tt && tn2) {
    for (let rr = 20; rr <= 60; rr++) {
      for (let cc = 8; cc <= 13; cc++) {
        const txt = cellText(tn2, rr, cc);
        if (txt && /^(TỔ TRƯỞNG|TTCM)$/i.test(txt)) {
          for (let k = rr + 2; k <= rr + 7; k++) {
            const nameCandidate = cellText(tn2, k, cc);
            if (nameCandidate && nameCandidate.length > 3) {
              tt = nameCandidate;
              break;
            }
          }
        }
      }
      if (tt) break;
    }
  }

  const targetToKey = forcedToKey || guessToKey(filename, mon, tos);

  function parseTeacherSheet(
    ws: any,
    stt: number,
    toKey: string,
    hintHoDem?: string,
    hintTen?: string,
    hintTc?: number
  ): TeacherRecord | null {
    const a6 = cellText(ws, 6, 1);
    const rawName = a6.replace(/^Họ và tên\s*:\s*/i, '').trim() || cellText(ws, 70, 7);
    let hoDem = (hintHoDem || '').trim();
    let ten = (hintTen || '').trim();
    let hoTen = (hoDem + ' ' + ten).trim();
    if (!ten && rawName) {
      const sp = splitFullName(rawName);
      hoDem = sp.hoDem;
      ten = sp.ten;
      hoTen = sp.hoTen;
    } else if (!ten) {
      const sp = splitFullName(String(ws.name || ''));
      hoDem = sp.hoDem;
      ten = sp.ten;
      hoTen = sp.hoTen;
    }
    if (!ten) return null;

    const chucDanh =
      cellText(ws, 7, 1).replace(/^Chức danh nghề nghiệp\s*:\s*/i, '').trim() ||
      'Giáo viên THPT Hạng III - Mã số: V.07.05.15';
    const lop = cellText(ws, 12, 1).replace(/^Giáo viên bộ môn lớp\s*:\s*/i, '').trim();
    const kiemNhiem = cellText(ws, 13, 1).replace(/^Chức danh kiêm nhiệm\s*:\s*/i, '').trim();

    // Find row for Tuần 01 (default 17)
    let week1Row = 17;
    for (let r = 14; r <= 22; r++) {
      const lbl = cellText(ws, r, 1);
      if (/^Tuần\s*0?1$/i.test(lbl)) {
        week1Row = r;
        break;
      }
    }

    const weeks: Record<number, Record<string, number>> = {};
    const keys = ['chuan', 'tang', 'hn', 'gddp', 'kn', 'tc'];
    for (let i = 1; i <= 37; i++) {
      const r = week1Row + i - 1;
      const wObj: Record<string, number> = {};
      keys.forEach((k, j) => {
        const val = cellNum(ws, r, 2 + j);
        if (val > 0) wObj[k] = val;
      });
      if (Object.keys(wObj).length > 0) {
        weeks[i] = wObj;
      }
    }

    const ktRow = week1Row + 37; // row 54
    const ktPpct = cellNum(ws, ktRow, 2);

    let tieuChuan = cellNum(ws, ktRow + 6, 4) || cellNum(ws, 60, 4) || hintTc || 595;
    if (tieuChuan <= 0) tieuChuan = 595;

    return {
      to: toKey,
      stt,
      hoDem,
      ten,
      hoTen,
      chucDanh,
      lop,
      kiemNhiem,
      tieuChuan,
      ktPpct,
      weeks,
    };
  }

  const parsedTeachers: TeacherRecord[] = [];
  const usedSheets = new Set<any>();
  const effectiveTo = targetToKey || 'ngu-van';

  // 1. Parse in TN_01 order if TN_01 exists
  if (tn1Entries.length > 0) {
    tn1Entries.forEach((entry, idx) => {
      let ws =
        (entry.sheetName &&
          (wsByName.get(entry.sheetName) || wsByName.get(entry.sheetName.toUpperCase()))) ||
        null;
      if (!ws && entry.ten) {
        const tenUp = entry.ten.toUpperCase();
        ws = wb.worksheets.find(
          (w: any) =>
            !usedSheets.has(w) &&
            !['TN_01', 'TN_02', 'TN_03', 'TONG_HOP', 'GIAO_VIEN', 'THEO_TUAN'].includes(
              String(w.name).toUpperCase()
            ) &&
            String(w.name).toUpperCase().includes(tenUp)
        );
      }
      if (ws) {
        usedSheets.add(ws);
        const t = parseTeacherSheet(
          ws,
          entry.stt || idx + 1,
          effectiveTo,
          entry.hoDem,
          entry.ten,
          entry.tieuChuan
        );
        if (t) parsedTeachers.push(t);
      } else if (entry.ten) {
        parsedTeachers.push({
          to: effectiveTo,
          stt: entry.stt || idx + 1,
          hoDem: entry.hoDem,
          ten: entry.ten,
          hoTen: `${entry.hoDem} ${entry.ten}`.trim(),
          chucDanh: 'Giáo viên THPT Hạng III - Mã số: V.07.05.15',
          lop: '',
          kiemNhiem: '',
          tieuChuan: entry.tieuChuan || 595,
          ktPpct: 0,
          weeks: {},
        });
      }
    });
  }

  // 2. Also scan any remaining teacher sheets (Mẫu số 03) in workbook
  wb.worksheets.forEach((ws: any) => {
    if (usedSheets.has(ws)) return;
    const upName = String(ws.name).trim().toUpperCase();
    if (['TN_01', 'TN_02', 'TN_03', 'TONG_HOP', 'GIAO_VIEN', 'THEO_TUAN'].includes(upName)) {
      return;
    }
    const isMau03 =
      cellText(ws, 4, 1).toUpperCase().includes('BẢNG KÊ GIỜ') ||
      cellText(ws, 6, 1).toUpperCase().includes('HỌ VÀ TÊN') ||
      cellText(ws, 17, 1).toUpperCase().includes('TUẦN');
    if (!isMau03) return;
    usedSheets.add(ws);
    const t = parseTeacherSheet(ws, parsedTeachers.length + 1, effectiveTo);
    if (t) parsedTeachers.push(t);
  });

  return {
    detectedToKey: targetToKey,
    mon,
    tt,
    p1,
    teachers: parsedTeachers,
  };
}

