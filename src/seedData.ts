export interface PcPeriod {
  tu: number;
  den: number | null;
  lop: string;
  kn: string;
  mau: Record<string, number>;
  ghiChu: string;
}

export interface WeekHours {
  chuan?: number;
  tang?: number;
  hn?: number;
  gddp?: number;
  kn?: number;
  tc?: number;
}

export interface TeacherRecord {
  to: string;
  stt: number;
  hoDem: string;
  ten: string;
  hoTen: string;
  chucDanh: string;
  lop: string;
  kiemNhiem: string;
  tieuChuan: number;
  ktPpct: number;
  weeks: Record<number, WeekHours>;
  pc?: PcPeriod[];
  updatedAt?: string;
}

export interface ToRecord {
  name: string;
  kind?: string;
  order: number;
  tt: string;
  mon: string;
  p1: [string, string, string][];
}

export const INITIAL_TOS: Record<string, ToRecord> = {
  "ngu-van": {
    "name": "Ngữ văn",
    "kind": "Tổ",
    "order": 1,
    "tt": "Trần Thị Ngọc Chi",
    "mon": "Ngữ văn",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*105",
        "Ngữ văn: 24 lớp × 105 tiết = 2.520"
      ],
      [
        "Khối 11",
        "=15*105",
        "Ngữ văn: 15 lớp × 105 tiết = 1.575"
      ],
      [
        "Khối 12",
        "=17*105",
        "Ngữ văn: 17 lớp × 105 tiết = 1.785"
      ],
      [
        "GDĐP",
        "=24*8+15*8+17*9",
        "GDĐP (Ngữ văn): K10 24×8 + K11 15×8 + K12 17×9 = 465"
      ]
    ]
  },
  "toan": {
    "name": "Toán",
    "kind": "Tổ",
    "order": 2,
    "tt": "Lê Hoài Bảo",
    "mon": "Toán học",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*105+16*35",
        "Toán: 24 lớp × 105 = 2.520; chuyên đề: 16 lớp × 35 = 560"
      ],
      [
        "Khối 11",
        "=15*105+10*35",
        "Toán: 15 lớp × 105 = 1.575; chuyên đề: 10 lớp × 35 = 350"
      ],
      [
        "Khối 12",
        "=17*105+11*35",
        "Toán: 17 lớp × 105 = 1.785; chuyên đề: 11 lớp × 35 = 385"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "vat-li": {
    "name": "Vật lí (tổ Lí - CNCN)",
    "kind": "",
    "order": 3,
    "tt": "Nguyễn Thị Thu Lộc",
    "mon": "Vật lí (Tổ Vật lí - CNCN)",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=14*105",
        "Vật lí: 14 lớp × 105 tiết = 1.470"
      ],
      [
        "Khối 11",
        "=9*105",
        "Vật lí: 9 lớp × 105 tiết = 945"
      ],
      [
        "Khối 12",
        "=9*105",
        "Vật lí: 9 lớp × 105 tiết = 945"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "cncn": {
    "name": "CN Công nghiệp (tổ Lí - CNCN)",
    "kind": "",
    "order": 4,
    "tt": "Nguyễn Thị Thu Lộc",
    "mon": "Công nghệ (Công nghiệp) (Tổ Vật lí - CNCN)",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=5*2*35",
        "Công nghệ: 5 lớp × 2 tiết × 35 tuần = 350"
      ],
      [
        "Khối 11",
        "=4*3*35",
        "Công nghệ: 4 lớp × 3 tiết × 35 tuần = 420 (gồm chuyên đề)"
      ],
      [
        "Khối 12",
        "=4*2*35",
        "Công nghệ: 4 lớp × 2 tiết × 35 tuần = 280"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "hoa-hoc": {
    "name": "Hoá học",
    "kind": "Tổ",
    "order": 5,
    "tt": "Tống Thị Lan",
    "mon": "Hoá học",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=11*105",
        "Hoá học: 11 lớp × 105 tiết = 1.155"
      ],
      [
        "Khối 11",
        "=7*105",
        "Hoá học: 7 lớp × 105 tiết = 735"
      ],
      [
        "Khối 12",
        "=7*105",
        "Hoá học: 7 lớp × 105 tiết = 735"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "sinh-hoc": {
    "name": "Sinh học (tổ Sinh - CNNN)",
    "kind": "",
    "order": 6,
    "tt": "Hồ Thúy Hiệp",
    "mon": "Sinh học (Tổ Sinh học - CNNN)",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=10*105",
        "Sinh học: 10 lớp × 105 tiết = 1.050"
      ],
      [
        "Khối 11",
        "=2*105+4*70",
        "Sinh học: 2 lớp × 105 + 4 lớp × 70 = 490"
      ],
      [
        "Khối 12",
        "=8*105",
        "Sinh học: 8 lớp × 105 tiết = 840"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "cnnn": {
    "name": "CN Nông nghiệp (tổ Sinh - CNNN)",
    "kind": "",
    "order": 7,
    "tt": "Hồ Thúy Hiệp",
    "mon": "Công nghệ (Nông nghiệp) (Tổ Sinh học - CNNN)",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=10*70",
        "Công nghệ: 10 lớp × 70 tiết = 700"
      ],
      [
        "Khối 11",
        "=4*105+2*70",
        "Công nghệ: 4 lớp × 105 + 2 lớp × 70 = 560"
      ],
      [
        "Khối 12",
        "=6*105+2*70",
        "Công nghệ: 6 lớp × 105 + 2 lớp × 70 = 770"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "lich-su": {
    "name": "Lịch sử",
    "kind": "Tổ",
    "order": 8,
    "tt": "Nguyễn Thị Như Hằng",
    "mon": "Lịch sử",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*70",
        "Lịch sử: 24 lớp × 70 tiết = 1.680"
      ],
      [
        "Khối 11",
        "=15*70",
        "Lịch sử: 15 lớp × 70 tiết = 1.050"
      ],
      [
        "Khối 12",
        "=17*70",
        "Lịch sử: 17 lớp × 70 tiết = 1.190"
      ],
      [
        "GDĐP",
        "=24*14+15*14+17*9",
        "GDĐP (Lịch sử): K10 24×14 + K11 15×14 + K12 17×9 = 699"
      ]
    ]
  },
  "dia-li": {
    "name": "Địa lí",
    "kind": "Nhóm",
    "order": 9,
    "tt": "Nguyễn Quốc Trung",
    "mon": "Địa lí",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=9*70+8*105",
        "Địa lí: 9 lớp × 70 + 8 lớp × 105 = 1.470"
      ],
      [
        "Khối 11",
        "=5*70+4*105",
        "Địa lí: 5 lớp × 70 + 4 lớp × 105 = 770"
      ],
      [
        "Khối 12",
        "=5*70+6*105",
        "Địa lí: 5 lớp × 70 + 6 lớp × 105 = 980"
      ],
      [
        "GDĐP",
        "=24*13+15*6+17*11",
        "GDĐP (Địa lí): K10 24×13 + K11 15×6 + K12 17×11 = 589"
      ]
    ]
  },
  "gdktpl": {
    "name": "GDKT&PL",
    "kind": "Nhóm",
    "order": 10,
    "tt": "Nguyễn Thị Hồng Thơ",
    "mon": "GDKT&PL",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=5*70+8*105",
        "GDKT&PL: 5 lớp × 70 + 8 lớp × 105 = 1.190"
      ],
      [
        "Khối 11",
        "=8*70",
        "GDKT&PL: 8 lớp × 70 tiết = 560"
      ],
      [
        "Khối 12",
        "=10*70",
        "GDKT&PL: 10 lớp × 70 tiết = 700"
      ],
      [
        "GDĐP",
        "=15*7+17*6",
        "GDĐP (GDKT&PL): K11 15×7 + K12 17×6 = 207"
      ]
    ]
  },
  "tieng-anh": {
    "name": "Tiếng Anh",
    "kind": "Tổ",
    "order": 11,
    "tt": "Phùng Thị Như Mơ",
    "mon": "Tiếng Anh",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*105",
        "Tiếng Anh: 24 lớp × 105 tiết = 2.520"
      ],
      [
        "Khối 11",
        "=15*105",
        "Tiếng Anh: 15 lớp × 105 tiết = 1.575"
      ],
      [
        "Khối 12",
        "=17*105",
        "Tiếng Anh: 17 lớp × 105 tiết = 1.785"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "tin-hoc": {
    "name": "Tin học",
    "kind": "Tổ",
    "order": 12,
    "tt": "Nguyễn Thanh Sang",
    "mon": "Tin học",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=11*70+5*105",
        "Tin học: 11 lớp × 70 + 5 lớp × 105 = 1.295"
      ],
      [
        "Khối 11",
        "=6*70+5*105",
        "Tin học: 6 lớp × 70 + 5 lớp × 105 = 945"
      ],
      [
        "Khối 12",
        "=7*70+4*105",
        "Tin học: 7 lớp × 70 + 4 lớp × 105 = 910"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "gdtc": {
    "name": "GDTC",
    "kind": "Tổ",
    "order": 13,
    "tt": "Lê Duy Nhân",
    "mon": "Giáo dục thể chất",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*70",
        "GDTC: 24 lớp × 70 tiết = 1.680"
      ],
      [
        "Khối 11",
        "=15*70",
        "GDTC: 15 lớp × 70 tiết = 1.050"
      ],
      [
        "Khối 12",
        "=17*70",
        "GDTC: 17 lớp × 70 tiết = 1.190 (TKB HK1 tăng 2 tiết/lớp/tuần)"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  },
  "gdqp-an": {
    "name": "GDQPAN-VP",
    "kind": "Tổ",
    "order": 14,
    "tt": "Nguyễn Ngọc Vũ",
    "mon": "GDQP-AN",
    "p1": [
      [
        "Tăng cường",
        "",
        ""
      ],
      [
        "Khối 10",
        "=24*35",
        "GDQP-AN: 24 lớp × 35 tiết = 840"
      ],
      [
        "Khối 11",
        "=15*35",
        "GDQP-AN: 15 lớp × 35 tiết = 525"
      ],
      [
        "Khối 12",
        "=17*35",
        "GDQP-AN: 17 lớp × 35 tiết = 595 (TKB HK1 tăng 1 tiết/lớp/tuần)"
      ],
      [
        "HĐTN-HN",
        "@HN",
        "HĐTN-HN: lấy theo tổng số tiết thực tế giáo viên trong tổ đã kê (cột Hướng nghiệp, TN_02), tự cập nhật khi đổi lớp, đổi giáo viên dạy"
      ]
    ]
  }
};

export const INITIAL_TEACHERS: Record<string, TeacherRecord> = {
  "toan-1": {
    "to": "toan",
    "stt": 1,
    "hoDem": "Trần Thị",
    "ten": "Thảo",
    "hoTen": "Trần Thị Thảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 11A02, 11A11; HĐTN-HN: 11A11. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A11",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 11A02, 11A11; HĐTN-HN: 11A11. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A11",
        "mau": {
          "chuan": 12,
          "tang": 2,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-2": {
    "to": "toan",
    "stt": 2,
    "hoDem": "Trần Thanh",
    "ten": "Liêm",
    "hoTen": "Trần Thanh Liêm",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A07, 12A11, 10A05, 10A13.",
    "kiemNhiem": "Chủ nhiệm 10A05",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 4
      },
      "2": {
        "chuan": 14,
        "kn": 4
      },
      "3": {
        "chuan": 14,
        "kn": 4
      },
      "4": {
        "chuan": 14,
        "kn": 4
      },
      "5": {
        "chuan": 14,
        "kn": 4
      },
      "6": {
        "chuan": 14,
        "kn": 4
      },
      "7": {
        "chuan": 14,
        "kn": 4
      },
      "8": {
        "chuan": 14,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A07, 12A11, 10A05, 10A13.",
        "kn": "Chủ nhiệm 10A05",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-3": {
    "to": "toan",
    "stt": 3,
    "hoDem": "Bùi Thị Mai",
    "ten": "Linh",
    "hoTen": "Bùi Thị Mai Linh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A08, 10A01, 10A15, 10A23.",
    "kiemNhiem": "Chủ nhiệm 10A15",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 4
      },
      "2": {
        "chuan": 14,
        "kn": 4
      },
      "3": {
        "chuan": 14,
        "kn": 4
      },
      "4": {
        "chuan": 14,
        "kn": 4
      },
      "5": {
        "chuan": 14,
        "kn": 4
      },
      "6": {
        "chuan": 14,
        "kn": 4
      },
      "7": {
        "chuan": 14,
        "kn": 4
      },
      "8": {
        "chuan": 14,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A08, 10A01, 10A15, 10A23.",
        "kn": "Chủ nhiệm 10A15",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-4": {
    "to": "toan",
    "stt": 4,
    "hoDem": "Nguyễn Thị Mỹ",
    "ten": "Trang",
    "hoTen": "Nguyễn Thị Mỹ Trang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A04, 11A06, 10A11, 10A21. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A04",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "2": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "3": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "4": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "5": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "6": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "7": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "8": {
        "chuan": 14,
        "tang": 2,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A04, 11A06, 10A11, 10A21. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A04",
        "mau": {
          "chuan": 14,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-5": {
    "to": "toan",
    "stt": 5,
    "hoDem": "Huỳnh Thanh",
    "ten": "Vinh",
    "hoTen": "Huỳnh Thanh Vinh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A07, 11A15, 10A10; HĐTN-HN: 11A15. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A15",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A07, 11A15, 10A10; HĐTN-HN: 11A15. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A15",
        "mau": {
          "chuan": 11,
          "tang": 2,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-6": {
    "to": "toan",
    "stt": 6,
    "hoDem": "Nguyễn Ngọc",
    "ten": "Tân",
    "hoTen": "Nguyễn Ngọc Tân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A14.",
    "kiemNhiem": "Phó Hiệu trưởng (định mức 4 tiết/tuần)",
    "tieuChuan": 140,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 4
      },
      "2": {
        "chuan": 4
      },
      "3": {
        "chuan": 4
      },
      "4": {
        "chuan": 4
      },
      "5": {
        "chuan": 4
      },
      "6": {
        "chuan": 4
      },
      "7": {
        "chuan": 4
      },
      "8": {
        "chuan": 4
      },
      "9": {
        "chuan": 2
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A14.",
        "kn": "Phó Hiệu trưởng (định mức 4 tiết/tuần)",
        "mau": {
          "chuan": 4,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-7": {
    "to": "toan",
    "stt": 7,
    "hoDem": "Huỳnh Thị Hoàng",
    "ten": "Oanh",
    "hoTen": "Huỳnh Thị Hoàng Oanh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A09, 11A03, 11A08; HĐTN-HN: 12A09. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 12A09",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A09, 11A03, 11A08; HĐTN-HN: 12A09. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 12A09",
        "mau": {
          "chuan": 10,
          "tang": 2,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-8": {
    "to": "toan",
    "stt": 8,
    "hoDem": "Nguyễn Thị Kim",
    "ten": "Uyên",
    "hoTen": "Nguyễn Thị Kim Uyên",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A12, 11A05, 11A13; HĐTN-HN: 12A12. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 12A12",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 10,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A12, 11A05, 11A13; HĐTN-HN: 12A12. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 12A12",
        "mau": {
          "chuan": 10,
          "tang": 2,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-9": {
    "to": "toan",
    "stt": 9,
    "hoDem": "Lê Kiều Xuyên Vân",
    "ten": "Én",
    "hoTen": "Lê Kiều Xuyên Vân Én",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A17, 10A02, 10A24.",
    "kiemNhiem": "Tổ phó chuyên môn (1 tiết/tuần) (tuần 1-2), Tổ phó chuyên môn, Tư vấn tâm lí (2 tiết/tuần) (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "kn": 1
      },
      "2": {
        "chuan": 16,
        "kn": 1
      },
      "3": {
        "chuan": 16,
        "kn": 2
      },
      "4": {
        "chuan": 16,
        "kn": 2
      },
      "5": {
        "chuan": 16,
        "kn": 2
      },
      "6": {
        "chuan": 16,
        "kn": 2
      },
      "7": {
        "chuan": 16,
        "kn": 2
      },
      "8": {
        "chuan": 16,
        "kn": 2
      },
      "9": {
        "chuan": 8,
        "kn": 2
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A17, 10A02, 10A24.",
        "kn": "Tổ phó chuyên môn (1 tiết/tuần) (tuần 1-2), Tổ phó chuyên môn, Tư vấn tâm lí (2 tiết/tuần) (từ tuần 3)",
        "mau": {
          "chuan": 16,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 2,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-10": {
    "to": "toan",
    "stt": 10,
    "hoDem": "Nguyễn Thanh",
    "ten": "Xuân",
    "hoTen": "Nguyễn Thanh Xuân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A12, 11A14, 10A07, 10A19; HĐTN-HN: 10A19. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A14 (tuần 1-4)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "tang": 2,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "tang": 2,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "tang": 2,
        "kn": 4
      },
      "5": {
        "chuan": 15,
        "tang": 2,
        "hn": 2
      },
      "6": {
        "chuan": 15,
        "tang": 2,
        "hn": 2
      },
      "7": {
        "chuan": 15,
        "tang": 2,
        "hn": 2
      },
      "8": {
        "chuan": 15,
        "tang": 2,
        "hn": 2
      },
      "9": {
        "chuan": 8
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A12, 11A14, 10A07, 10A19; HĐTN-HN: 10A19. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A14 (tuần 1-4)",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 2,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-11": {
    "to": "toan",
    "stt": 11,
    "hoDem": "Nguyễn Thị Ngọc",
    "ten": "Phương",
    "hoTen": "Nguyễn Thị Ngọc Phương",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A15, 10A03, 10A18.",
    "kiemNhiem": "Chủ nhiệm 12A04",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "kn": 4
      },
      "5": {
        "chuan": 15,
        "kn": 4
      },
      "6": {
        "chuan": 15,
        "kn": 4
      },
      "7": {
        "chuan": 15,
        "kn": 4
      },
      "8": {
        "chuan": 15,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A15, 10A03, 10A18.",
        "kn": "Chủ nhiệm 12A04",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-12": {
    "to": "toan",
    "stt": 12,
    "hoDem": "Mai Thị",
    "ten": "Xuyến",
    "hoTen": "Mai Thị Xuyến",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A13, 10A06, 10A12; HĐTN-HN: 12A13.",
    "kiemNhiem": "Chủ nhiệm 12A13",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A13, 10A06, 10A12; HĐTN-HN: 12A13.",
        "kn": "Chủ nhiệm 12A13",
        "mau": {
          "chuan": 10,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-13": {
    "to": "toan",
    "stt": 13,
    "hoDem": "Lê Hoài",
    "ten": "Bảo",
    "hoTen": "Lê Hoài Bảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A06, 12A16, 10A04, 10A14.",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "kn": 3
      },
      "2": {
        "chuan": 15,
        "kn": 3
      },
      "3": {
        "chuan": 15,
        "kn": 3
      },
      "4": {
        "chuan": 15,
        "kn": 3
      },
      "5": {
        "chuan": 15,
        "kn": 3
      },
      "6": {
        "chuan": 15,
        "kn": 3
      },
      "7": {
        "chuan": 15,
        "kn": 3
      },
      "8": {
        "chuan": 15,
        "kn": 3
      },
      "9": {
        "chuan": 8,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A06, 12A16, 10A04, 10A14.",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-14": {
    "to": "toan",
    "stt": 14,
    "hoDem": "Đào Quốc",
    "ten": "Tuấn",
    "hoTen": "Đào Quốc Tuấn",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 10A09, 10A17, 10A22.",
    "kiemNhiem": "Chủ nhiệm 10A09",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "kn": 4
      },
      "5": {
        "chuan": 15,
        "kn": 4
      },
      "6": {
        "chuan": 15,
        "kn": 4
      },
      "7": {
        "chuan": 15,
        "kn": 4
      },
      "8": {
        "chuan": 15,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 10A09, 10A17, 10A22.",
        "kn": "Chủ nhiệm 10A09",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-15": {
    "to": "toan",
    "stt": 15,
    "hoDem": "La Thanh",
    "ten": "Phú",
    "hoTen": "La Thanh Phú",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A09, 11A10, 10A16; HĐTN-HN: 10A09. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A10",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 11,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A09, 11A10, 10A16; HĐTN-HN: 10A09. (K11 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A10",
        "mau": {
          "chuan": 11,
          "tang": 2,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-16": {
    "to": "toan",
    "stt": 16,
    "hoDem": "Trần Thị Ngọc",
    "ten": "Thảo",
    "hoTen": "Trần Thị Ngọc Thảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A06, 12A10, 10A04, 10A08, 10A20.",
    "kiemNhiem": "Chủ nhiệm 12A06 (tuần 1-2), 10A04 (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "kn": 4
      },
      "5": {
        "chuan": 15,
        "kn": 4
      },
      "6": {
        "chuan": 15,
        "kn": 4
      },
      "7": {
        "chuan": 15,
        "kn": 4
      },
      "8": {
        "chuan": 15,
        "kn": 4
      },
      "9": {
        "chuan": 8,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A06, 12A10, 10A04, 10A08, 10A20.",
        "kn": "Chủ nhiệm 12A06 (tuần 1-2), 10A04 (từ tuần 3)",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "toan-17": {
    "to": "toan",
    "stt": 17,
    "hoDem": "Đinh Thanh",
    "ten": "Vũ",
    "hoTen": "Đinh Thanh Vũ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01. (K11 tăng tiết tuần 1-8)",
    "kiemNhiem": "Phó Hiệu trưởng (định mức 4 tiết/tuần)",
    "tieuChuan": 140,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 4,
        "tang": 1
      },
      "2": {
        "chuan": 4,
        "tang": 1
      },
      "3": {
        "chuan": 4,
        "tang": 1
      },
      "4": {
        "chuan": 4,
        "tang": 1
      },
      "5": {
        "chuan": 4,
        "tang": 1
      },
      "6": {
        "chuan": 4,
        "tang": 1
      },
      "7": {
        "chuan": 4,
        "tang": 1
      },
      "8": {
        "chuan": 4,
        "tang": 1
      },
      "9": {
        "chuan": 2
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01. (K11 tăng tiết tuần 1-8)",
        "kn": "Phó Hiệu trưởng (định mức 4 tiết/tuần)",
        "mau": {
          "chuan": 4,
          "tang": 1,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:06.842Z"
  },
  "vat-li-1": {
    "to": "vat-li",
    "stt": 1,
    "hoDem": "Trần Trung",
    "ten": "Toàn",
    "hoTen": "Trần Trung Toàn",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "Giáo viên dạy lớp: HĐTN-HN 10A01 (2 tiết/tuần).",
    "kiemNhiem": "Hiệu trưởng (định mức 2 tiết/tuần)",
    "tieuChuan": 70,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "hn": 2
      },
      "2": {
        "hn": 2
      },
      "3": {
        "hn": 2
      },
      "4": {
        "hn": 2
      },
      "5": {
        "hn": 2
      },
      "6": {
        "hn": 2
      },
      "7": {
        "hn": 2
      },
      "8": {
        "hn": 2
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "Giáo viên dạy lớp: HĐTN-HN 10A01 (2 tiết/tuần).",
        "kn": "Hiệu trưởng (định mức 2 tiết/tuần)",
        "mau": {
          "chuan": 0,
          "tang": 0,
          "hn": 2,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-2": {
    "to": "vat-li",
    "stt": 2,
    "hoDem": "Nguyễn Thị Thanh",
    "ten": "Trang",
    "hoTen": "Nguyễn Thị Thanh Trang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A12, 10A05, 10A06, 10A23; HĐTN-HN: 11A12.",
    "kiemNhiem": "Chủ nhiệm 11A12, TBTrND (2 tiết/tuần) (từ tuần 10)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A12, 10A05, 10A06, 10A23; HĐTN-HN: 11A12.",
        "kn": "Chủ nhiệm 11A12, TBTrND (2 tiết/tuần) (từ tuần 10)",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-3": {
    "to": "vat-li",
    "stt": 3,
    "hoDem": "Nguyễn Thị Thúy",
    "ten": "Hằng",
    "hoTen": "Nguyễn Thị Thúy Hằng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A05, 11A06, 11A15; HĐTN-HN: 11A01, 11A06.",
    "kiemNhiem": "Chủ nhiệm 11A06",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A05, 11A06, 11A15; HĐTN-HN: 11A01, 11A06.",
        "kn": "Chủ nhiệm 11A06",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-4": {
    "to": "vat-li",
    "stt": 4,
    "hoDem": "Trương Thị Nguyệt",
    "ten": "Linh",
    "hoTen": "Trương Thị Nguyệt Linh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A03, 10A08, 10A22; HĐTN-HN: 10A03, 10A22.",
    "kiemNhiem": "Chủ nhiệm 10A03",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A03, 10A08, 10A22; HĐTN-HN: 10A03, 10A22.",
        "kn": "Chủ nhiệm 10A03",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-5": {
    "to": "vat-li",
    "stt": 5,
    "hoDem": "Phạm Thị Thúy",
    "ten": "Hằng",
    "hoTen": "Phạm Thị Thúy Hằng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A06, 12A17; HĐTN-HN: 12A04, 12A17.",
    "kiemNhiem": "Chủ nhiệm 12A17",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A06, 12A17; HĐTN-HN: 12A04, 12A17.",
        "kn": "Chủ nhiệm 12A17",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-6": {
    "to": "vat-li",
    "stt": 6,
    "hoDem": "Huỳnh Hồng",
    "ten": "Loan",
    "hoTen": "Huỳnh Hồng Loan",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A07, 12A16; HĐTN-HN: 12A16.",
    "kiemNhiem": "Chủ nhiệm 12A16, TB (3 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "2": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "3": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "4": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "5": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "6": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "7": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "8": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "9": {
        "chuan": 3,
        "kn": 7
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A07, 12A16; HĐTN-HN: 12A16.",
        "kn": "Chủ nhiệm 12A16, TB (3 tiết/tuần)",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 7,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-7": {
    "to": "vat-li",
    "stt": 7,
    "hoDem": "Nguyễn Thị Thu",
    "ten": "Lộc",
    "hoTen": "Nguyễn Thị Thu Lộc",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A14, 12A15; HĐTN-HN: 12A07, 12A08 (tuần 1-2), 10A12, 10A23 (từ tuần 3).",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 5,
        "kn": 3
      },
      "2": {
        "chuan": 9,
        "hn": 5,
        "kn": 3
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 3
      },
      "9": {
        "chuan": 3,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A14, 12A15; HĐTN-HN: 12A07, 12A08 (tuần 1-2), 10A12, 10A23 (từ tuần 3).",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-8": {
    "to": "vat-li",
    "stt": 8,
    "hoDem": "Nguyễn Hương",
    "ten": "Nguyên",
    "hoTen": "Nguyễn Hương Nguyên",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A07, 10A09, 10A10; HĐTN-HN: 10A02, 10A10.",
    "kiemNhiem": "Chủ nhiệm 10A10",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A07, 10A09, 10A10; HĐTN-HN: 10A02, 10A10.",
        "kn": "Chủ nhiệm 10A10",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-9": {
    "to": "vat-li",
    "stt": 9,
    "hoDem": "Thoại Ngọc",
    "ten": "Hiếu",
    "hoTen": "Thoại Ngọc Hiếu",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A04, 10A11, 10A21, 10A24; HĐTN-HN: 10A11.",
    "kiemNhiem": "Chủ nhiệm 10A11",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A04, 10A11, 10A21, 10A24; HĐTN-HN: 10A11.",
        "kn": "Chủ nhiệm 10A11",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-10": {
    "to": "vat-li",
    "stt": 10,
    "hoDem": "Nguyễn Quốc",
    "ten": "Anh",
    "hoTen": "Nguyễn Quốc Anh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A03, 11A04, 11A13; HĐTN-HN: 11A03, 11A13.",
    "kiemNhiem": "Chủ nhiệm 11A03",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A03, 11A04, 11A13; HĐTN-HN: 11A03, 11A13.",
        "kn": "Chủ nhiệm 11A03",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "vat-li-11": {
    "to": "vat-li",
    "stt": 11,
    "hoDem": "Huỳnh Ngọc Bích",
    "ten": "Hoàng",
    "hoTen": "Huỳnh Ngọc Bích Hoàng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A14, 10A07, 10A20; HĐTN-HN: 10A08, 10A20.",
    "kiemNhiem": "Chủ nhiệm 10A20",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A14, 10A07, 10A20; HĐTN-HN: 10A08, 10A20.",
        "kn": "Chủ nhiệm 10A20",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:37.746Z"
  },
  "cncn-1": {
    "to": "cncn",
    "stt": 1,
    "hoDem": "Nguyễn Vũ",
    "ten": "Anh",
    "hoTen": "Nguyễn Vũ Anh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A14, 12A15, 12A16, 12A17, 10A21, 10A22, 10A23, 10A24.",
    "kiemNhiem": "Tổ phó chuyên môn (1 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "kn": 1
      },
      "2": {
        "chuan": 16,
        "kn": 1
      },
      "3": {
        "chuan": 16,
        "kn": 1
      },
      "4": {
        "chuan": 16,
        "kn": 1
      },
      "5": {
        "chuan": 16,
        "kn": 1
      },
      "6": {
        "chuan": 16,
        "kn": 1
      },
      "7": {
        "chuan": 16,
        "kn": 1
      },
      "8": {
        "chuan": 16,
        "kn": 1
      },
      "9": {
        "chuan": 8,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A14, 12A15, 12A16, 12A17, 10A21, 10A22, 10A23, 10A24.",
        "kn": "Tổ phó chuyên môn (1 tiết/tuần)",
        "mau": {
          "chuan": 16,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:56.100Z"
  },
  "cncn-2": {
    "to": "cncn",
    "stt": 2,
    "hoDem": "Ngô Ngọc",
    "ten": "Lê",
    "hoTen": "Ngô Ngọc Lê",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A12, 11A13, 11A14, 11A15, 10A20; HĐTN-HN: 10A21.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "hn": 3
      },
      "2": {
        "chuan": 14,
        "hn": 3
      },
      "3": {
        "chuan": 14,
        "hn": 3
      },
      "4": {
        "chuan": 14,
        "hn": 3
      },
      "5": {
        "chuan": 14,
        "hn": 3
      },
      "6": {
        "chuan": 14,
        "hn": 3
      },
      "7": {
        "chuan": 14,
        "hn": 3
      },
      "8": {
        "chuan": 14,
        "hn": 3
      },
      "9": {
        "chuan": 5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A12, 11A13, 11A14, 11A15, 10A20; HĐTN-HN: 10A21.",
        "kn": "",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-07T23:59:56.100Z"
  },
  "hoa-hoc-1": {
    "to": "hoa-hoc",
    "stt": 1,
    "hoDem": "Võ Thị Vĩnh",
    "ten": "Nhung",
    "hoTen": "Võ Thị Vĩnh Nhung",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A04; HĐTN-HN: 12A03, 12A15.",
    "kiemNhiem": "Chủ nhiệm 12A03, TB (3 tiết/tuần) (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "4": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "5": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "6": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "7": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "8": {
        "chuan": 6,
        "hn": 6,
        "kn": 7
      },
      "9": {
        "chuan": 2,
        "kn": 7
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A04; HĐTN-HN: 12A03, 12A15.",
        "kn": "Chủ nhiệm 12A03, TB (3 tiết/tuần) (từ tuần 3)",
        "mau": {
          "chuan": 6,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 7,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-2": {
    "to": "hoa-hoc",
    "stt": 2,
    "hoDem": "Lưu Thị Kim",
    "ten": "Thúy",
    "hoTen": "Lưu Thị Kim Thúy",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A03, 10A07, 10A04 (từ tuần 3); HĐTN-HN: 10A07, 10A12, 10A23 (tuần 1-2), 10A04 (từ tuần 3).",
    "kiemNhiem": "Chủ nhiệm 10A07",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "2": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A03, 10A07, 10A04 (từ tuần 3); HĐTN-HN: 10A07, 10A12, 10A23 (tuần 1-2), 10A04 (từ tuần 3).",
        "kn": "Chủ nhiệm 10A07",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-3": {
    "to": "hoa-hoc",
    "stt": 3,
    "hoDem": "Trần Nữ Anh",
    "ten": "Đào",
    "hoTen": "Trần Nữ Anh Đào",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A01, 10A09, 10A10; HĐTN-HN: 10A01, 10A24.",
    "kiemNhiem": "Chủ nhiệm 10A01",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 4,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A01, 10A09, 10A10; HĐTN-HN: 10A01, 10A24.",
        "kn": "Chủ nhiệm 10A01",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 4,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-4": {
    "to": "hoa-hoc",
    "stt": 4,
    "hoDem": "Tống Thị",
    "ten": "Lan",
    "hoTen": "Tống Thị Lan",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A05; HĐTN-HN: 12A05.",
    "kiemNhiem": "Chủ nhiệm 12A05, Tổ trưởng chuyên môn, Thủ quỹ (6 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "2": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "3": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "4": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "5": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "6": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "7": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "8": {
        "chuan": 6,
        "hn": 3,
        "kn": 10
      },
      "9": {
        "chuan": 2,
        "kn": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A05; HĐTN-HN: 12A05.",
        "kn": "Chủ nhiệm 12A05, Tổ trưởng chuyên môn, Thủ quỹ (6 tiết/tuần)",
        "mau": {
          "chuan": 6,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 10,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-5": {
    "to": "hoa-hoc",
    "stt": 5,
    "hoDem": "Võ Thị",
    "ten": "Mỹ",
    "hoTen": "Võ Thị Mỹ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A03, 11A05, 11A06; HĐTN-HN: 11A05.",
    "kiemNhiem": "Chủ nhiệm 11A05, Tổ phó chuyên môn (1 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "2": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "3": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "4": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "5": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "6": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "7": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "8": {
        "chuan": 9,
        "hn": 3,
        "kn": 5
      },
      "9": {
        "chuan": 3,
        "kn": 5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A03, 11A05, 11A06; HĐTN-HN: 11A05.",
        "kn": "Chủ nhiệm 11A05, Tổ phó chuyên môn (1 tiết/tuần)",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 5,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-6": {
    "to": "hoa-hoc",
    "stt": 6,
    "hoDem": "Võ Thị Kim",
    "ten": "Chi",
    "hoTen": "Võ Thị Kim Chi",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A02, 10A11, 10A04 (tuần 1-2), 12A06 (từ tuần 3); HĐTN-HN: 10A04 (tuần 1-2), 12A06 (từ tuần 3).",
    "kiemNhiem": "Chủ nhiệm 10A04 (tuần 1-2), 12A06 (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A02, 10A11, 10A04 (tuần 1-2), 12A06 (từ tuần 3); HĐTN-HN: 10A04 (tuần 1-2), 12A06 (từ tuần 3).",
        "kn": "Chủ nhiệm 10A04 (tuần 1-2), 12A06 (từ tuần 3)",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-7": {
    "to": "hoa-hoc",
    "stt": 7,
    "hoDem": "Trần Văn",
    "ten": "Bảo",
    "hoTen": "Trần Văn Bảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A07, 12A06 (tuần 1-2); HĐTN-HN: 12A01, 12A06 (tuần 1-2), 12A07, 12A08 (từ tuần 3).",
    "kiemNhiem": "Chủ nhiệm 12A01",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "4": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "5": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "6": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "7": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "8": {
        "chuan": 6,
        "hn": 8,
        "kn": 4
      },
      "9": {
        "chuan": 2,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A07, 12A06 (tuần 1-2); HĐTN-HN: 12A01, 12A06 (tuần 1-2), 12A07, 12A08 (từ tuần 3).",
        "kn": "Chủ nhiệm 12A01",
        "mau": {
          "chuan": 6,
          "tang": 0,
          "hn": 8,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-8": {
    "to": "hoa-hoc",
    "stt": 8,
    "hoDem": "Phan Thị Thu",
    "ten": "Hiền",
    "hoTen": "Phan Thị Thu Hiền",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A05, 10A06, 10A08; HĐTN-HN: 10A05, 10A06.",
    "kiemNhiem": "Chủ nhiệm 10A06",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A05, 10A06, 10A08; HĐTN-HN: 10A05, 10A06.",
        "kn": "Chủ nhiệm 10A06",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-9": {
    "to": "hoa-hoc",
    "stt": 9,
    "hoDem": "Nguyễn Thị Cẩm",
    "ten": "Hạnh",
    "hoTen": "Nguyễn Thị Cẩm Hạnh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01, 11A07; HĐTN-HN: 11A04, 11A07, 11A14 (tuần 1-4).",
    "kiemNhiem": "Chủ nhiệm 11A07",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "2": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "3": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "4": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "5": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 6,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 2,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01, 11A07; HĐTN-HN: 11A04, 11A07, 11A14 (tuần 1-4).",
        "kn": "Chủ nhiệm 11A07",
        "mau": {
          "chuan": 6,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "hoa-hoc-10": {
    "to": "hoa-hoc",
    "stt": 10,
    "hoDem": "Huỳnh Quốc",
    "ten": "Việt",
    "hoTen": "Huỳnh Quốc Việt",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A02, 11A04; HĐTN-HN: 11A02, 11A09, 11A10.",
    "kiemNhiem": "Chủ nhiệm 11A02",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "2": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "3": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "4": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "5": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "6": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "7": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "8": {
        "chuan": 6,
        "hn": 9,
        "kn": 4
      },
      "9": {
        "chuan": 2,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A02, 11A04; HĐTN-HN: 11A02, 11A09, 11A10.",
        "kn": "Chủ nhiệm 11A02",
        "mau": {
          "chuan": 6,
          "tang": 0,
          "hn": 9,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:05.634Z"
  },
  "sinh-hoc-1": {
    "to": "sinh-hoc",
    "stt": 1,
    "hoDem": "Hồ Thúy",
    "ten": "Hiệp",
    "hoTen": "Hồ Thúy Hiệp",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A11, 12A13; HĐTN-HN: 12A11.",
    "kiemNhiem": "Chủ nhiệm 12A11, Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "2": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "3": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "4": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "5": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "6": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "7": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "8": {
        "chuan": 9,
        "hn": 3,
        "kn": 7
      },
      "9": {
        "chuan": 3,
        "kn": 7
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A11, 12A13; HĐTN-HN: 12A11.",
        "kn": "Chủ nhiệm 12A11, Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 9,
          "hn": 3,
          "kn": 7
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:02.433Z"
  },
  "sinh-hoc-2": {
    "to": "sinh-hoc",
    "stt": 2,
    "hoDem": "Nguyễn Thị",
    "ten": "Thủy",
    "hoTen": "Nguyễn Thị Thủy",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A02, 10A16, 10A17, 10A18; HĐTN-HN: 10A17.",
    "kiemNhiem": "Chủ nhiệm 10A17",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A02, 10A16, 10A17, 10A18; HĐTN-HN: 10A17.",
        "kn": "Chủ nhiệm 10A17",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "sinh-hoc-3": {
    "to": "sinh-hoc",
    "stt": 3,
    "hoDem": "Nguyễn Thành",
    "ten": "Nhân",
    "hoTen": "Nguyễn Thành Nhân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A09, 12A10; HĐTN-HN: 12A10, 12A14.",
    "kiemNhiem": "Chủ nhiệm 12A10",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "2": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "3": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "4": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "hn": 6,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A09, 12A10; HĐTN-HN: 12A10, 12A14.",
        "kn": "Chủ nhiệm 12A10",
        "mau": {
          "chuan": 9,
          "tang": 0,
          "hn": 6,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "sinh-hoc-4": {
    "to": "sinh-hoc",
    "stt": 4,
    "hoDem": "Nguyễn Thị Kim",
    "ten": "Sang",
    "hoTen": "Nguyễn Thị Kim Sang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "10A12, 10A13, 10A14, 10A19; HĐTN-HN: 10A13.",
    "kiemNhiem": "Chủ nhiệm 10A13",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "10A12, 10A13, 10A14, 10A19; HĐTN-HN: 10A13.",
        "kn": "Chủ nhiệm 10A13",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "sinh-hoc-5": {
    "to": "sinh-hoc",
    "stt": 5,
    "hoDem": "Thông Thị Thanh",
    "ten": "Hà",
    "hoTen": "Thông Thị Thanh Hà",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01, 11A02, 11A08, 11A11.",
    "kiemNhiem": "Chủ nhiệm 11A01, TB, Tư vấn tâm lí (4 tiết/tuần) (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "kn": 4
      },
      "2": {
        "chuan": 10,
        "kn": 4
      },
      "3": {
        "chuan": 10,
        "kn": 8
      },
      "4": {
        "chuan": 10,
        "kn": 8
      },
      "5": {
        "chuan": 10,
        "kn": 8
      },
      "6": {
        "chuan": 10,
        "kn": 8
      },
      "7": {
        "chuan": 10,
        "kn": 8
      },
      "8": {
        "chuan": 10,
        "kn": 8
      },
      "9": {
        "chuan": 4,
        "kn": 8
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01, 11A02, 11A08, 11A11.",
        "kn": "Chủ nhiệm 11A01, TB, Tư vấn tâm lí (4 tiết/tuần) (từ tuần 3)",
        "mau": {
          "chuan": 10,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 8,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "sinh-hoc-6": {
    "to": "sinh-hoc",
    "stt": 6,
    "hoDem": "Nguyễn Thị Mỹ",
    "ten": "Thảo",
    "hoTen": "Nguyễn Thị Mỹ Thảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A08, 12A12, 10A01, 10A15; HĐTN-HN: 10A15.",
    "kiemNhiem": "Chủ nhiệm 12A08",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 1,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A08, 12A12, 10A01, 10A15; HĐTN-HN: 10A15.",
        "kn": "Chủ nhiệm 12A08",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 1,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "sinh-hoc-7": {
    "to": "sinh-hoc",
    "stt": 7,
    "hoDem": "Mai Thị Kim",
    "ten": "Tiến",
    "hoTen": "Mai Thị Kim Tiến",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A09, 11A10.",
    "kiemNhiem": "Chủ nhiệm 11A09, Phó Bí thư Đoàn trường (8,5 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 4,
        "kn": 12.5
      },
      "2": {
        "chuan": 4,
        "kn": 12.5
      },
      "3": {
        "chuan": 4,
        "kn": 12.5
      },
      "4": {
        "chuan": 4,
        "kn": 12.5
      },
      "5": {
        "chuan": 4,
        "kn": 12.5
      },
      "6": {
        "chuan": 4,
        "kn": 12.5
      },
      "7": {
        "chuan": 4,
        "kn": 12.5
      },
      "8": {
        "chuan": 4,
        "kn": 12.5
      },
      "9": {
        "chuan": 2,
        "kn": 12.5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A09, 11A10.",
        "kn": "Chủ nhiệm 11A09, Phó Bí thư Đoàn trường (8,5 tiết/tuần)",
        "mau": {
          "chuan": 4,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 12.5,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:36.236Z"
  },
  "cnnn-1": {
    "to": "cnnn",
    "stt": 1,
    "hoDem": "Lê Thị Hương",
    "ten": "Thu",
    "hoTen": "Lê Thị Hương Thu",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A10, 12A12, 12A13, 11A02, 11A08, 11A11.",
    "kiemNhiem": "Tổ phó chuyên môn (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 17
      },
      "2": {
        "chuan": 17
      },
      "3": {
        "chuan": 17,
        "kn": 1
      },
      "4": {
        "chuan": 17,
        "kn": 1
      },
      "5": {
        "chuan": 17,
        "kn": 1
      },
      "6": {
        "chuan": 17,
        "kn": 1
      },
      "7": {
        "chuan": 17,
        "kn": 1
      },
      "8": {
        "chuan": 17,
        "kn": 1
      },
      "9": {
        "chuan": 6,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A10, 12A12, 12A13, 11A02, 11A08, 11A11.",
        "kn": "Tổ phó chuyên môn (từ tuần 3)",
        "mau": {
          "chuan": 17,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:45.785Z"
  },
  "cnnn-2": {
    "to": "cnnn",
    "stt": 2,
    "hoDem": "Đoàn Thị Thu",
    "ten": "Dung",
    "hoTen": "Đoàn Thị Thu Dung",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A02, 10A01, 10A14, 10A19; 10A15, 10A17, 10A18 (tuần 1-2); 10A16 (từ tuần 3); HĐTN-HN: 10A16.",
    "kiemNhiem": "Chủ nhiệm 10A16 (từ tuần 3), Tổ phó chuyên môn (tuần 1-2)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "hn": 3,
        "kn": 1
      },
      "2": {
        "chuan": 16,
        "hn": 3,
        "kn": 1
      },
      "3": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A02, 10A01, 10A14, 10A19; 10A15, 10A17, 10A18 (tuần 1-2); 10A16 (từ tuần 3); HĐTN-HN: 10A16.",
        "kn": "Chủ nhiệm 10A16 (từ tuần 3), Tổ phó chuyên môn (tuần 1-2)",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:45.785Z"
  },
  "cnnn-3": {
    "to": "cnnn",
    "stt": 3,
    "hoDem": "Trần Phú",
    "ten": "Duyên",
    "hoTen": "Trần Phú Duyên",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A08, 10A02, 10A12, 10A13; 10A16 (tuần 1-2); 10A15, 10A17, 10A18 (từ tuần 3).",
    "kiemNhiem": "Chủ nhiệm 10A16 (tuần 1-2), TBLĐ (3 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 11,
        "kn": 7
      },
      "2": {
        "chuan": 11,
        "kn": 7
      },
      "3": {
        "chuan": 15,
        "kn": 3
      },
      "4": {
        "chuan": 15,
        "kn": 3
      },
      "5": {
        "chuan": 15,
        "kn": 3
      },
      "6": {
        "chuan": 15,
        "kn": 3
      },
      "7": {
        "chuan": 15,
        "kn": 3
      },
      "8": {
        "chuan": 15,
        "kn": 3
      },
      "9": {
        "chuan": 7,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A08, 10A02, 10A12, 10A13; 10A16 (tuần 1-2); 10A15, 10A17, 10A18 (từ tuần 3).",
        "kn": "Chủ nhiệm 10A16 (tuần 1-2), TBLĐ (3 tiết/tuần)",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:45.785Z"
  },
  "cnnn-4": {
    "to": "cnnn",
    "stt": 4,
    "hoDem": "Trương Thị Vinh",
    "ten": "Sang",
    "hoTen": "Trương Thị Vinh Sang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A09, 12A11, 11A01, 11A09, 11A10.",
    "kiemNhiem": "Tổ trưởng chuyên môn hướng nghiệp",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 3
      },
      "2": {
        "chuan": 14,
        "kn": 3
      },
      "3": {
        "chuan": 14,
        "kn": 3
      },
      "4": {
        "chuan": 14,
        "kn": 3
      },
      "5": {
        "chuan": 14,
        "kn": 3
      },
      "6": {
        "chuan": 14,
        "kn": 3
      },
      "7": {
        "chuan": 14,
        "kn": 3
      },
      "8": {
        "chuan": 14,
        "kn": 3
      },
      "9": {
        "chuan": 5,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A09, 12A11, 11A01, 11A09, 11A10.",
        "kn": "Tổ trưởng chuyên môn hướng nghiệp",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:00:45.785Z"
  },
  "lich-su-1": {
    "to": "lich-su",
    "stt": 1,
    "hoDem": "Nguyễn Thị Như",
    "ten": "Hằng",
    "hoTen": "Nguyễn Thị Như Hằng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A10, 12A13, 12A14, 12A17, 11A01, 11A04, 11A10, 11A14; GDĐP: các lớp khối 11 nêu trên.",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "2": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "3": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "4": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "5": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "6": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "7": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "8": {
        "chuan": 18,
        "gddp": 4,
        "kn": 3
      },
      "9": {
        "chuan": 9,
        "gddp": 4,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A10, 12A13, 12A14, 12A17, 11A01, 11A04, 11A10, 11A14; GDĐP: các lớp khối 11 nêu trên.",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 4,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "lich-su-2": {
    "to": "lich-su",
    "stt": 2,
    "hoDem": "Nguyễn Thu",
    "ten": "Vân",
    "hoTen": "Nguyễn Thu Vân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A02, 12A03, 12A09, 10A03, 10A08, 10A09, 10A13, 10A18, 10A22; GDĐP: các lớp khối 10 nêu trên.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 20,
        "gddp": 6
      },
      "2": {
        "chuan": 20,
        "gddp": 6
      },
      "3": {
        "chuan": 20,
        "gddp": 6
      },
      "4": {
        "chuan": 20,
        "gddp": 6
      },
      "5": {
        "chuan": 20,
        "gddp": 6
      },
      "6": {
        "chuan": 20,
        "gddp": 6
      },
      "7": {
        "chuan": 20,
        "gddp": 6
      },
      "8": {
        "chuan": 20,
        "gddp": 6
      },
      "9": {
        "chuan": 10,
        "gddp": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A02, 12A03, 12A09, 10A03, 10A08, 10A09, 10A13, 10A18, 10A22; GDĐP: các lớp khối 10 nêu trên.",
        "kn": "",
        "mau": {
          "chuan": 20,
          "tang": 0,
          "hn": 0,
          "gddp": 6,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "lich-su-3": {
    "to": "lich-su",
    "stt": 3,
    "hoDem": "Nguyễn Thị Minh",
    "ten": "Xuân",
    "hoTen": "Nguyễn Thị Minh Xuân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A07, 12A08, 12A11, 12A15, 10A05, 10A06, 10A11, 10A16, 10A23; GDĐP: các lớp khối 10 nêu trên.",
    "kiemNhiem": "TBVT (2 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "2": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "3": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "4": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "5": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "6": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "7": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "8": {
        "chuan": 18,
        "gddp": 5,
        "kn": 2
      },
      "9": {
        "chuan": 9,
        "gddp": 5,
        "kn": 2
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A07, 12A08, 12A11, 12A15, 10A05, 10A06, 10A11, 10A16, 10A23; GDĐP: các lớp khối 10 nêu trên.",
        "kn": "TBVT (2 tiết/tuần)",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 5,
          "kn": 2,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "lich-su-4": {
    "to": "lich-su",
    "stt": 4,
    "hoDem": "Phan Đình",
    "ten": "Dương",
    "hoTen": "Phan Đình Dương",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A06, 12A12, 12A16, 10A01, 10A02, 10A07, 10A14, 10A21; GDĐP: các lớp khối 10 nêu trên.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "gddp": 5
      },
      "2": {
        "chuan": 18,
        "gddp": 5
      },
      "3": {
        "chuan": 18,
        "gddp": 5
      },
      "4": {
        "chuan": 18,
        "gddp": 5
      },
      "5": {
        "chuan": 18,
        "gddp": 5
      },
      "6": {
        "chuan": 18,
        "gddp": 5
      },
      "7": {
        "chuan": 18,
        "gddp": 5
      },
      "8": {
        "chuan": 18,
        "gddp": 5
      },
      "9": {
        "chuan": 9,
        "gddp": 5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A06, 12A12, 12A16, 10A01, 10A02, 10A07, 10A14, 10A21; GDĐP: các lớp khối 10 nêu trên.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 5,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "lich-su-5": {
    "to": "lich-su",
    "stt": 5,
    "hoDem": "Trần Thủy",
    "ten": "Đò",
    "hoTen": "Trần Thủy Đò",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A06, 11A07, 11A09, 11A13, 11A15, 10A10, 10A12, 10A17, 10A24; GDĐP: các lớp khối 10, 11 nêu trên.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "gddp": 9
      },
      "2": {
        "chuan": 18,
        "gddp": 9
      },
      "3": {
        "chuan": 18,
        "gddp": 9
      },
      "4": {
        "chuan": 18,
        "gddp": 9
      },
      "5": {
        "chuan": 18,
        "gddp": 9
      },
      "6": {
        "chuan": 18,
        "gddp": 9
      },
      "7": {
        "chuan": 18,
        "gddp": 9
      },
      "8": {
        "chuan": 18,
        "gddp": 9
      },
      "9": {
        "chuan": 9,
        "gddp": 9
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A06, 11A07, 11A09, 11A13, 11A15, 10A10, 10A12, 10A17, 10A24; GDĐP: các lớp khối 10, 11 nêu trên.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 9,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "lich-su-6": {
    "to": "lich-su",
    "stt": 6,
    "hoDem": "Trần Thị Thắm",
    "ten": "Tươi",
    "hoTen": "Trần Thị Thắm Tươi",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A02, 11A03, 11A05, 11A08, 11A11, 11A12, 10A04, 10A15, 10A19, 10A20; GDĐP: các lớp khối 10, 11 nêu trên.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 20,
        "gddp": 10
      },
      "2": {
        "chuan": 20,
        "gddp": 10
      },
      "3": {
        "chuan": 20,
        "gddp": 10
      },
      "4": {
        "chuan": 20,
        "gddp": 10
      },
      "5": {
        "chuan": 20,
        "gddp": 10
      },
      "6": {
        "chuan": 20,
        "gddp": 10
      },
      "7": {
        "chuan": 20,
        "gddp": 10
      },
      "8": {
        "chuan": 20,
        "gddp": 10
      },
      "9": {
        "chuan": 10,
        "gddp": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A02, 11A03, 11A05, 11A08, 11A11, 11A12, 10A04, 10A15, 10A19, 10A20; GDĐP: các lớp khối 10, 11 nêu trên.",
        "kn": "",
        "mau": {
          "chuan": 20,
          "tang": 0,
          "hn": 0,
          "gddp": 10,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:09.251Z"
  },
  "dia-li-1": {
    "to": "dia-li",
    "stt": 1,
    "hoDem": "Nguyễn Quốc",
    "ten": "Trung",
    "hoTen": "Nguyễn Quốc Trung",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A08, 12A09, 10A09; GDĐP: các lớp khối 12 nêu trên.",
    "kiemNhiem": "Tổ trưởng chuyên môn (tuần 1-9)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "2": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "3": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "4": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "5": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "6": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "7": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "8": {
        "chuan": 10,
        "gddp": 3,
        "kn": 3
      },
      "9": {
        "chuan": 4,
        "gddp": 3,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A08, 12A09, 10A09; GDĐP: các lớp khối 12 nêu trên.",
        "kn": "Tổ trưởng chuyên môn (tuần 1-9)",
        "mau": {
          "chuan": 10,
          "tang": 0,
          "hn": 0,
          "gddp": 3,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-2": {
    "to": "dia-li",
    "stt": 2,
    "hoDem": "Nguyễn Thị Chi",
    "ten": "Lê",
    "hoTen": "Nguyễn Thị Chi Lê",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A07, 12A10, 10A11, 10A12; GDĐP: 12A01, 12A07, 12A10, 12A14, 12A17.",
    "kiemNhiem": "Tổ phó chuyên môn (tuần 1-9)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "2": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "3": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "4": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "5": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "6": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "7": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "8": {
        "chuan": 10,
        "gddp": 5,
        "kn": 1
      },
      "9": {
        "chuan": 4,
        "gddp": 5,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A07, 12A10, 10A11, 10A12; GDĐP: 12A01, 12A07, 12A10, 12A14, 12A17.",
        "kn": "Tổ phó chuyên môn (tuần 1-9)",
        "mau": {
          "chuan": 10,
          "tang": 0,
          "hn": 0,
          "gddp": 5,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-3": {
    "to": "dia-li",
    "stt": 3,
    "hoDem": "Huỳnh Hòa",
    "ten": "Lan",
    "hoTen": "Huỳnh Hòa Lan",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A06, 12A12, 10A06, 10A10; GDĐP: 12A04, 12A06, 12A12, 12A15, 12A16.",
    "kiemNhiem": "Tổ trưởng chuyên môn (từ tuần 10)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 11,
        "gddp": 5
      },
      "2": {
        "chuan": 11,
        "gddp": 5
      },
      "3": {
        "chuan": 11,
        "gddp": 5
      },
      "4": {
        "chuan": 11,
        "gddp": 5
      },
      "5": {
        "chuan": 11,
        "gddp": 5
      },
      "6": {
        "chuan": 11,
        "gddp": 5
      },
      "7": {
        "chuan": 11,
        "gddp": 5
      },
      "8": {
        "chuan": 11,
        "gddp": 5
      },
      "9": {
        "chuan": 5,
        "gddp": 5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A06, 12A12, 10A06, 10A10; GDĐP: 12A04, 12A06, 12A12, 12A15, 12A16.",
        "kn": "Tổ trưởng chuyên môn (từ tuần 10)",
        "mau": {
          "chuan": 11,
          "tang": 0,
          "hn": 0,
          "gddp": 5,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-4": {
    "to": "dia-li",
    "stt": 4,
    "hoDem": "Nguyễn Thị Anh",
    "ten": "Kiên",
    "hoTen": "Nguyễn Thị Anh Kiên",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A03, 11A04, 11A09, 10A03, 10A04, 10A16, 10A17.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 17
      },
      "2": {
        "chuan": 17
      },
      "3": {
        "chuan": 17
      },
      "4": {
        "chuan": 17
      },
      "5": {
        "chuan": 17
      },
      "6": {
        "chuan": 17
      },
      "7": {
        "chuan": 17
      },
      "8": {
        "chuan": 17
      },
      "9": {
        "chuan": 7
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A03, 11A04, 11A09, 10A03, 10A04, 10A16, 10A17.",
        "kn": "",
        "mau": {
          "chuan": 17,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-5": {
    "to": "dia-li",
    "stt": 5,
    "hoDem": "Nguyễn Thị Út",
    "ten": "Phương",
    "hoTen": "Nguyễn Thị Út Phương",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A11, 12A13, 11A05, 11A11; GDĐP: 12A02, 12A03, 12A11, 12A13.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "gddp": 4
      },
      "2": {
        "chuan": 13,
        "gddp": 4
      },
      "3": {
        "chuan": 13,
        "gddp": 4
      },
      "4": {
        "chuan": 13,
        "gddp": 4
      },
      "5": {
        "chuan": 13,
        "gddp": 4
      },
      "6": {
        "chuan": 13,
        "gddp": 4
      },
      "7": {
        "chuan": 13,
        "gddp": 4
      },
      "8": {
        "chuan": 13,
        "gddp": 4
      },
      "9": {
        "chuan": 5,
        "gddp": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A11, 12A13, 11A05, 11A11; GDĐP: 12A02, 12A03, 12A11, 12A13.",
        "kn": "",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 4,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-6": {
    "to": "dia-li",
    "stt": 6,
    "hoDem": "Lê Thị",
    "ten": "Hà",
    "hoTen": "Lê Thị Hà",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A06, 11A10, 10A07, 10A08, 10A13, 10A18.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15
      },
      "2": {
        "chuan": 15
      },
      "3": {
        "chuan": 15
      },
      "4": {
        "chuan": 15
      },
      "5": {
        "chuan": 15
      },
      "6": {
        "chuan": 15
      },
      "7": {
        "chuan": 15
      },
      "8": {
        "chuan": 15
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A06, 11A10, 10A07, 10A08, 10A13, 10A18.",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "dia-li-7": {
    "to": "dia-li",
    "stt": 7,
    "hoDem": "Nguyễn Trần Hồng",
    "ten": "Nhường",
    "hoTen": "Nguyễn Trần Hồng Nhường",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A07, 11A08, 10A05, 10A14, 10A15, 10A19.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16
      },
      "2": {
        "chuan": 16
      },
      "3": {
        "chuan": 16
      },
      "4": {
        "chuan": 16
      },
      "5": {
        "chuan": 16
      },
      "6": {
        "chuan": 16
      },
      "7": {
        "chuan": 16
      },
      "8": {
        "chuan": 16
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A07, 11A08, 10A05, 10A14, 10A15, 10A19.",
        "kn": "",
        "mau": {
          "chuan": 16,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:36.030Z"
  },
  "gdktpl-1": {
    "to": "gdktpl",
    "stt": 1,
    "hoDem": "Nguyễn Thị Hồng",
    "ten": "Thơ",
    "hoTen": "Nguyễn Thị Hồng Thơ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A08, 12A09, 12A14, 12A17, 11A09, 11A11, 11A12.",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 3
      },
      "2": {
        "chuan": 14,
        "kn": 3
      },
      "3": {
        "chuan": 14,
        "kn": 3
      },
      "4": {
        "chuan": 14,
        "kn": 3
      },
      "5": {
        "chuan": 14,
        "kn": 3
      },
      "6": {
        "chuan": 14,
        "kn": 3
      },
      "7": {
        "chuan": 14,
        "kn": 3
      },
      "8": {
        "chuan": 14,
        "kn": 3
      },
      "9": {
        "chuan": 7,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A08, 12A09, 12A14, 12A17, 11A09, 11A11, 11A12.",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:44.174Z"
  },
  "gdktpl-2": {
    "to": "gdktpl",
    "stt": 2,
    "hoDem": "Lê Thị Kim",
    "ten": "Phượng",
    "hoTen": "Lê Thị Kim Phượng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A10, 12A11, 12A13, 10A14, 10A18, 10A23.",
    "kiemNhiem": "Chủ nhiệm 10A23",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 4
      },
      "2": {
        "chuan": 14,
        "kn": 4
      },
      "3": {
        "chuan": 14,
        "kn": 4
      },
      "4": {
        "chuan": 14,
        "kn": 4
      },
      "5": {
        "chuan": 14,
        "kn": 4
      },
      "6": {
        "chuan": 14,
        "kn": 4
      },
      "7": {
        "chuan": 14,
        "kn": 4
      },
      "8": {
        "chuan": 14,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A10, 12A11, 12A13, 10A14, 10A18, 10A23.",
        "kn": "Chủ nhiệm 10A23",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:44.174Z"
  },
  "gdktpl-3": {
    "to": "gdktpl",
    "stt": 3,
    "hoDem": "Phan Thị",
    "ten": "Hằng",
    "hoTen": "Phan Thị Hằng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A10, 11A14, 10A15, 10A17, 10A19, 10A20.",
    "kiemNhiem": "TBTVTL (3 tiết/tuần) (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15
      },
      "2": {
        "chuan": 15
      },
      "3": {
        "chuan": 15,
        "kn": 3
      },
      "4": {
        "chuan": 15,
        "kn": 3
      },
      "5": {
        "chuan": 15,
        "kn": 3
      },
      "6": {
        "chuan": 15,
        "kn": 3
      },
      "7": {
        "chuan": 15,
        "kn": 3
      },
      "8": {
        "chuan": 15,
        "kn": 3
      },
      "9": {
        "chuan": 6,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A10, 11A14, 10A15, 10A17, 10A19, 10A20.",
        "kn": "TBTVTL (3 tiết/tuần) (từ tuần 3)",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:44.174Z"
  },
  "gdktpl-4": {
    "to": "gdktpl",
    "stt": 4,
    "hoDem": "Nguyễn Thị",
    "ten": "Gấm",
    "hoTen": "Nguyễn Thị Gấm",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A08, 11A13, 11A15, 10A13, 10A21, 10A24.",
    "kiemNhiem": "Chủ nhiệm 10A24",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "kn": 4
      },
      "2": {
        "chuan": 13,
        "kn": 4
      },
      "3": {
        "chuan": 13,
        "kn": 4
      },
      "4": {
        "chuan": 13,
        "kn": 4
      },
      "5": {
        "chuan": 13,
        "kn": 4
      },
      "6": {
        "chuan": 13,
        "kn": 4
      },
      "7": {
        "chuan": 13,
        "kn": 4
      },
      "8": {
        "chuan": 13,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A08, 11A13, 11A15, 10A13, 10A21, 10A24.",
        "kn": "Chủ nhiệm 10A24",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:44.174Z"
  },
  "gdktpl-5": {
    "to": "gdktpl",
    "stt": 5,
    "hoDem": "Nguyễn Thị Thu",
    "ten": "Trang",
    "hoTen": "Nguyễn Thị Thu Trang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A12, 12A15, 12A16, 10A12, 10A16, 10A22.",
    "kiemNhiem": "Chủ nhiệm 10A12",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "kn": 4
      },
      "2": {
        "chuan": 14,
        "kn": 4
      },
      "3": {
        "chuan": 14,
        "kn": 4
      },
      "4": {
        "chuan": 14,
        "kn": 4
      },
      "5": {
        "chuan": 14,
        "kn": 4
      },
      "6": {
        "chuan": 14,
        "kn": 4
      },
      "7": {
        "chuan": 14,
        "kn": 4
      },
      "8": {
        "chuan": 14,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A12, 12A15, 12A16, 10A12, 10A16, 10A22.",
        "kn": "Chủ nhiệm 10A12",
        "mau": {
          "chuan": 14,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:44.174Z"
  },
  "tieng-anh-1": {
    "to": "tieng-anh",
    "stt": 1,
    "hoDem": "Phùng Thị Như",
    "ten": "Mơ",
    "hoTen": "Phùng Thị Như Mơ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A09, 12A13, 10A03, 10A04, 10A13. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "2": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "3": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "4": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "5": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "6": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "7": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "8": {
        "chuan": 15,
        "tang": 3,
        "kn": 3
      },
      "9": {
        "chuan": 5,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A09, 12A13, 10A03, 10A04, 10A13. (K10 tăng tiết tuần 1-8)",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 15,
          "tang": 3,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-2": {
    "to": "tieng-anh",
    "stt": 2,
    "hoDem": "Nguyễn Lê",
    "ten": "Danh",
    "hoTen": "Nguyễn Lê Danh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A06, 12A08, 12A15, 11A01, 11A11 (từ tuần 5), 11A14 (tuần 1-4).",
    "kiemNhiem": "Tổ phó chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "kn": 1
      },
      "2": {
        "chuan": 15,
        "kn": 1
      },
      "3": {
        "chuan": 15,
        "kn": 1
      },
      "4": {
        "chuan": 15,
        "kn": 1
      },
      "5": {
        "chuan": 15,
        "kn": 1
      },
      "6": {
        "chuan": 15,
        "kn": 1
      },
      "7": {
        "chuan": 15,
        "kn": 1
      },
      "8": {
        "chuan": 15,
        "kn": 1
      },
      "9": {
        "chuan": 5,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A06, 12A08, 12A15, 11A01, 11A11 (từ tuần 5), 11A14 (tuần 1-4).",
        "kn": "Tổ phó chuyên môn",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-3": {
    "to": "tieng-anh",
    "stt": 3,
    "hoDem": "Đoàn Thị Vân",
    "ten": "Anh",
    "hoTen": "Đoàn Thị Vân Anh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A08, 10A01, 10A09 (từ tuần 3), 10A16 (từ tuần 3), 10A17 (tuần 1-2), 10A18 (tuần 1-2); HĐTN-HN: 11A08. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A08",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "tang": 3,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A08, 10A01, 10A09 (từ tuần 3), 10A16 (từ tuần 3), 10A17 (tuần 1-2), 10A18 (tuần 1-2); HĐTN-HN: 11A08. (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A08",
        "mau": {
          "chuan": 12,
          "tang": 3,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-4": {
    "to": "tieng-anh",
    "stt": 4,
    "hoDem": "Bùi Thị Minh",
    "ten": "Thi",
    "hoTen": "Bùi Thị Minh Thi",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A10, 12A11, 10A06, 10A07 (tuần 1-4), 10A22. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 10A22",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "tang": 2,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "tang": 2,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "tang": 2,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "tang": 2,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A10, 12A11, 10A06, 10A07 (tuần 1-4), 10A22. (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 10A22",
        "mau": {
          "chuan": 12,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-5": {
    "to": "tieng-anh",
    "stt": 5,
    "hoDem": "Trương Thị Thanh",
    "ten": "Bình",
    "hoTen": "Trương Thị Thanh Bình",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A02, 11A11 (tuần 1-4), 10A02, 10A11, 10A20. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 10A02",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "2": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "3": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "4": {
        "chuan": 15,
        "tang": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "tang": 3,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "tang": 3,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "tang": 3,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "tang": 3,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A02, 11A11 (tuần 1-4), 10A02, 10A11, 10A20. (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 10A02",
        "mau": {
          "chuan": 12,
          "tang": 3,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-6": {
    "to": "tieng-anh",
    "stt": 6,
    "hoDem": "Nguyễn Quốc",
    "ten": "Bảo",
    "hoTen": "Nguyễn Quốc Bảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A07, 11A13, 10A09 (tuần 1-2), 10A15, 10A16 (tuần 1-2), 10A17 (từ tuần 3), 10A18 (từ tuần 3), 10A23. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 4
      },
      "2": {
        "chuan": 18,
        "tang": 4
      },
      "3": {
        "chuan": 18,
        "tang": 4
      },
      "4": {
        "chuan": 18,
        "tang": 4
      },
      "5": {
        "chuan": 18,
        "tang": 4
      },
      "6": {
        "chuan": 18,
        "tang": 4
      },
      "7": {
        "chuan": 18,
        "tang": 4
      },
      "8": {
        "chuan": 18,
        "tang": 4
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A07, 11A13, 10A09 (tuần 1-2), 10A15, 10A16 (tuần 1-2), 10A17 (từ tuần 3), 10A18 (từ tuần 3), 10A23. (K10 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 4,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-7": {
    "to": "tieng-anh",
    "stt": 7,
    "hoDem": "Lương Thị Thanh",
    "ten": "Tuyền",
    "hoTen": "Lương Thị Thanh Tuyền",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A14, 10A14, 10A21 (tuần 1-4); HĐTN-HN: 10A14. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 10A14",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 9,
        "tang": 1,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "tang": 1,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "tang": 1,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "tang": 1,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A14, 10A14, 10A21 (tuần 1-4); HĐTN-HN: 10A14. (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 10A14",
        "mau": {
          "chuan": 9,
          "tang": 1,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-8": {
    "to": "tieng-anh",
    "stt": 8,
    "hoDem": "Thái Thị Ngọc",
    "ten": "Lin",
    "hoTen": "Thái Thị Ngọc Lin",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A07, 12A17, 11A03, 11A12, 11A15.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18
      },
      "2": {
        "chuan": 18
      },
      "3": {
        "chuan": 18
      },
      "4": {
        "chuan": 18
      },
      "5": {
        "chuan": 18
      },
      "6": {
        "chuan": 18
      },
      "7": {
        "chuan": 18
      },
      "8": {
        "chuan": 18
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A07, 12A17, 11A03, 11A12, 11A15.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-9": {
    "to": "tieng-anh",
    "stt": 9,
    "hoDem": "Nguyễn Thị Ngọc",
    "ten": "Thơ",
    "hoTen": "Nguyễn Thị Ngọc Thơ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A06, 11A09, 10A08, 10A10, 10A12, 10A24. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 4
      },
      "2": {
        "chuan": 18,
        "tang": 4
      },
      "3": {
        "chuan": 18,
        "tang": 4
      },
      "4": {
        "chuan": 18,
        "tang": 4
      },
      "5": {
        "chuan": 18,
        "tang": 4
      },
      "6": {
        "chuan": 18,
        "tang": 4
      },
      "7": {
        "chuan": 18,
        "tang": 4
      },
      "8": {
        "chuan": 18,
        "tang": 4
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A06, 11A09, 10A08, 10A10, 10A12, 10A24. (K10 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 4,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-10": {
    "to": "tieng-anh",
    "stt": 10,
    "hoDem": "Đỗ Thị Kim",
    "ten": "Kiều",
    "hoTen": "Đỗ Thị Kim Kiều",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A05, 12A12, 11A04, 11A05, 11A10.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18
      },
      "2": {
        "chuan": 18
      },
      "3": {
        "chuan": 18
      },
      "4": {
        "chuan": 18
      },
      "5": {
        "chuan": 18
      },
      "6": {
        "chuan": 18
      },
      "7": {
        "chuan": 18
      },
      "8": {
        "chuan": 18
      },
      "9": {
        "chuan": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A05, 12A12, 11A04, 11A05, 11A10.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-11": {
    "to": "tieng-anh",
    "stt": 11,
    "hoDem": "Trần Thị Bích",
    "ten": "Thảo",
    "hoTen": "Trần Thị Bích Thảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A16, 10A05, 10A19; HĐTN-HN: 10A19. (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 10A19",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "tang": 2,
        "hn": 1,
        "kn": 4
      },
      "6": {
        "chuan": 12,
        "tang": 2,
        "hn": 1,
        "kn": 4
      },
      "7": {
        "chuan": 12,
        "tang": 2,
        "hn": 1,
        "kn": 4
      },
      "8": {
        "chuan": 12,
        "tang": 2,
        "hn": 1,
        "kn": 4
      },
      "9": {
        "chuan": 4,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A16, 10A05, 10A19; HĐTN-HN: 10A19. (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 10A19",
        "mau": {
          "chuan": 12,
          "tang": 2,
          "hn": 1,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:01:55.753Z"
  },
  "tieng-anh-12": {
    "to": "tieng-anh",
    "stt": 12,
    "hoDem": "Nguyễn Thị Ánh",
    "ten": "Tuyết",
    "hoTen": "Nguyễn Thị Ánh Tuyết",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A14 (từ tuần 5), 10A07 (từ tuần 5), 10A21 (từ tuần 5); HĐTN-HN: 11A14 (từ tuần 5). (K10 tăng tiết tuần 1-8)",
    "kiemNhiem": "Chủ nhiệm 11A14 (từ tuần 5)",
    "tieuChuan": 527,
    "ktPpct": 0,
    "weeks": {
      "5": {
        "chuan": 9,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 9,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 9,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 9,
        "tang": 2,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 3,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A14 (từ tuần 5), 10A07 (từ tuần 5), 10A21 (từ tuần 5); HĐTN-HN: 11A14 (từ tuần 5). (K10 tăng tiết tuần 1-8)",
        "kn": "Chủ nhiệm 11A14 (từ tuần 5)",
        "mau": {
          "chuan": 9,
          "tang": 2,
          "hn": 3,
          "kn": 4
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:02:57.022Z"
  },
  "tin-hoc-1": {
    "to": "tin-hoc",
    "stt": 1,
    "hoDem": "Nguyễn Thanh",
    "ten": "Sang",
    "hoTen": "Nguyễn Thanh Sang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A05, 10A03, 10A23, 10A24.",
    "kiemNhiem": "Tổ trưởng chuyên môn (3 tiết/tuần), Phòng máy 1: 2 tiết/tuần (tuần 1-2), 1 tiết/tuần (tuần 3-4), 1,5 tiết/tuần (từ tuần 5)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "kn": 5
      },
      "2": {
        "chuan": 12,
        "kn": 5
      },
      "3": {
        "chuan": 12,
        "kn": 4
      },
      "4": {
        "chuan": 12,
        "kn": 4
      },
      "5": {
        "chuan": 12,
        "kn": 4.5
      },
      "6": {
        "chuan": 12,
        "kn": 4.5
      },
      "7": {
        "chuan": 12,
        "kn": 4.5
      },
      "8": {
        "chuan": 12,
        "kn": 4.5
      },
      "9": {
        "chuan": 5,
        "kn": 4.5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A05, 10A03, 10A23, 10A24.",
        "kn": "Tổ trưởng chuyên môn (3 tiết/tuần), Phòng máy 1: 2 tiết/tuần (tuần 1-2), 1 tiết/tuần (tuần 3-4), 1,5 tiết/tuần (từ tuần 5)",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4.5,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-2": {
    "to": "tin-hoc",
    "stt": 2,
    "hoDem": "Lê Thị",
    "ten": "Thu",
    "hoTen": "Lê Thị Thu",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A16, 12A17, 11A01, 11A05, 11A06, 11A14.",
    "kiemNhiem": "Tổ phó chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "kn": 1
      },
      "2": {
        "chuan": 16,
        "kn": 1
      },
      "3": {
        "chuan": 16,
        "kn": 1
      },
      "4": {
        "chuan": 16,
        "kn": 1
      },
      "5": {
        "chuan": 16,
        "kn": 1
      },
      "6": {
        "chuan": 16,
        "kn": 1
      },
      "7": {
        "chuan": 16,
        "kn": 1
      },
      "8": {
        "chuan": 16,
        "kn": 1
      },
      "9": {
        "chuan": 6,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A16, 12A17, 11A01, 11A05, 11A06, 11A14.",
        "kn": "Tổ phó chuyên môn",
        "mau": {
          "chuan": 16,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-3": {
    "to": "tin-hoc",
    "stt": 3,
    "hoDem": "Đỗ Cao",
    "ten": "Trí",
    "hoTen": "Đỗ Cao Trí",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A12, 11A13, 10A01, 10A07, 10A11, 10A22.",
    "kiemNhiem": "Chủ nhiệm 11A13, Phòng máy 3 (2 tiết/tuần) (tuần 1-4)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "kn": 6
      },
      "2": {
        "chuan": 13,
        "kn": 6
      },
      "3": {
        "chuan": 13,
        "kn": 6
      },
      "4": {
        "chuan": 13,
        "kn": 6
      },
      "5": {
        "chuan": 13,
        "kn": 4
      },
      "6": {
        "chuan": 13,
        "kn": 4
      },
      "7": {
        "chuan": 13,
        "kn": 4
      },
      "8": {
        "chuan": 13,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A12, 11A13, 10A01, 10A07, 10A11, 10A22.",
        "kn": "Chủ nhiệm 11A13, Phòng máy 3 (2 tiết/tuần) (tuần 1-4)",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-4": {
    "to": "tin-hoc",
    "stt": 4,
    "hoDem": "Bùi Thị Thanh",
    "ten": "Tuyền",
    "hoTen": "Bùi Thị Thanh Tuyền",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A04, 11A15, 10A04, 10A20, 10A21.",
    "kiemNhiem": "Chủ nhiệm 10A21",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "kn": 4
      },
      "2": {
        "chuan": 13,
        "kn": 4
      },
      "3": {
        "chuan": 13,
        "kn": 4
      },
      "4": {
        "chuan": 13,
        "kn": 4
      },
      "5": {
        "chuan": 13,
        "kn": 4
      },
      "6": {
        "chuan": 13,
        "kn": 4
      },
      "7": {
        "chuan": 13,
        "kn": 4
      },
      "8": {
        "chuan": 13,
        "kn": 4
      },
      "9": {
        "chuan": 5,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A04, 11A15, 10A04, 10A20, 10A21.",
        "kn": "Chủ nhiệm 10A21",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-5": {
    "to": "tin-hoc",
    "stt": 5,
    "hoDem": "Trần Thị Phương",
    "ten": "Linh",
    "hoTen": "Trần Thị Phương Linh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A15, 11A02, 11A03, 11A07.",
    "kiemNhiem": "Chủ nhiệm 12A15",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "kn": 4
      },
      "2": {
        "chuan": 13,
        "kn": 4
      },
      "3": {
        "chuan": 13,
        "kn": 4
      },
      "4": {
        "chuan": 13,
        "kn": 4
      },
      "5": {
        "chuan": 13,
        "kn": 4
      },
      "6": {
        "chuan": 13,
        "kn": 4
      },
      "7": {
        "chuan": 13,
        "kn": 4
      },
      "8": {
        "chuan": 13,
        "kn": 4
      },
      "9": {
        "chuan": 5,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A15, 11A02, 11A03, 11A07.",
        "kn": "Chủ nhiệm 12A15",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-6": {
    "to": "tin-hoc",
    "stt": 6,
    "hoDem": "Nguyễn Thị",
    "ten": "Thắm",
    "hoTen": "Nguyễn Thị Thắm",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A06, 10A05, 10A10; HĐTN-HN: 12A02.",
    "kiemNhiem": "Chủ nhiệm 12A02, Thư ký hội đồng (2 tiết/tuần) (từ tuần 3)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 8,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 8,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "4": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "5": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "6": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "7": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "8": {
        "chuan": 8,
        "hn": 3,
        "kn": 6
      },
      "9": {
        "chuan": 4,
        "kn": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A06, 10A05, 10A10; HĐTN-HN: 12A02.",
        "kn": "Chủ nhiệm 12A02, Thư ký hội đồng (2 tiết/tuần) (từ tuần 3)",
        "mau": {
          "chuan": 8,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 6,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-7": {
    "to": "tin-hoc",
    "stt": 7,
    "hoDem": "Nguyễn Thị Ngọc",
    "ten": "Bích",
    "hoTen": "Nguyễn Thị Ngọc Bích",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A14, 10A02, 10A06, 10A08, 10A09.",
    "kiemNhiem": "Chủ nhiệm 12A14",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 13,
        "kn": 4
      },
      "2": {
        "chuan": 13,
        "kn": 4
      },
      "3": {
        "chuan": 13,
        "kn": 4
      },
      "4": {
        "chuan": 13,
        "kn": 4
      },
      "5": {
        "chuan": 13,
        "kn": 4
      },
      "6": {
        "chuan": 13,
        "kn": 4
      },
      "7": {
        "chuan": 13,
        "kn": 4
      },
      "8": {
        "chuan": 13,
        "kn": 4
      },
      "9": {
        "chuan": 6,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A14, 10A02, 10A06, 10A08, 10A09.",
        "kn": "Chủ nhiệm 12A14",
        "mau": {
          "chuan": 13,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-8": {
    "to": "tin-hoc",
    "stt": 8,
    "hoDem": "Nguyễn Ngọc",
    "ten": "Lộc",
    "hoTen": "Nguyễn Ngọc Lộc",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A07; HĐTN-HN: 12A07.",
    "kiemNhiem": "Chủ nhiệm 12A07, Phó Bí thư Đoàn trường (8,5 tiết/tuần), Phòng máy 2: 1,5 tiết/tuần (tuần 1-2), 1 tiết/tuần (tuần 3-4), 1,5 tiết/tuần (từ tuần 5)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "2": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "3": {
        "chuan": 2,
        "hn": 1,
        "kn": 13.5
      },
      "4": {
        "chuan": 2,
        "hn": 1,
        "kn": 13.5
      },
      "5": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "6": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "7": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "8": {
        "chuan": 2,
        "hn": 1,
        "kn": 14
      },
      "9": {
        "chuan": 1,
        "kn": 14
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A07; HĐTN-HN: 12A07.",
        "kn": "Chủ nhiệm 12A07, Phó Bí thư Đoàn trường (8,5 tiết/tuần), Phòng máy 2: 1,5 tiết/tuần (tuần 1-2), 1 tiết/tuần (tuần 3-4), 1,5 tiết/tuần (từ tuần 5)",
        "mau": {
          "chuan": 2,
          "tang": 0,
          "hn": 1,
          "gddp": 0,
          "kn": 14,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "tin-hoc-9": {
    "to": "tin-hoc",
    "stt": 9,
    "hoDem": "La Thanh",
    "ten": "Toàn",
    "hoTen": "La Thanh Toàn",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "; HĐTN-HN: 10A15.",
    "kiemNhiem": "Bí thư Đoàn trường (14,5 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "hn": 2,
        "kn": 14.5
      },
      "2": {
        "hn": 2,
        "kn": 14.5
      },
      "3": {
        "hn": 2,
        "kn": 14.5
      },
      "4": {
        "hn": 2,
        "kn": 14.5
      },
      "5": {
        "hn": 2,
        "kn": 14.5
      },
      "6": {
        "hn": 2,
        "kn": 14.5
      },
      "7": {
        "hn": 2,
        "kn": 14.5
      },
      "8": {
        "hn": 2,
        "kn": 14.5
      },
      "9": {
        "kn": 14.5
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "; HĐTN-HN: 10A15.",
        "kn": "Bí thư Đoàn trường (14,5 tiết/tuần)",
        "mau": {
          "chuan": 0,
          "tang": 0,
          "hn": 2,
          "gddp": 0,
          "kn": 14.5,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:38.298Z"
  },
  "gdtc-1": {
    "to": "gdtc",
    "stt": 1,
    "hoDem": "Lê Duy",
    "ten": "Nhân",
    "hoTen": "Lê Duy Nhân",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A07, 12A08, 12A14, 11A02, 11A04, 11A10. (K12 tăng 2 tiết/lớp/tuần)",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "2": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "3": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "4": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "5": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "6": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "7": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "8": {
        "chuan": 14,
        "tang": 8,
        "kn": 3
      },
      "9": {
        "chuan": 7,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A07, 12A08, 12A14, 11A02, 11A04, 11A10. (K12 tăng 2 tiết/lớp/tuần)",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 14,
          "tang": 8,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-2": {
    "to": "gdtc",
    "stt": 2,
    "hoDem": "Trần Thị Hồng",
    "ten": "Hạnh",
    "hoTen": "Trần Thị Hồng Hạnh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A09, 12A11, 12A12, 10A16, 10A17, 10A19, 10A20. (K12 tăng 2 tiết/lớp/tuần)",
    "kiemNhiem": "Tổ phó chuyên môn (từ tuần 2)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "tang": 8
      },
      "2": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "3": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "4": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "5": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "6": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "7": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "8": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "9": {
        "chuan": 8,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A09, 12A11, 12A12, 10A16, 10A17, 10A19, 10A20. (K12 tăng 2 tiết/lớp/tuần)",
        "kn": "Tổ phó chuyên môn (từ tuần 2)",
        "mau": {
          "chuan": 16,
          "tang": 8,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-3": {
    "to": "gdtc",
    "stt": 3,
    "hoDem": "Nguyễn Sơn",
    "ten": "Ca",
    "hoTen": "Nguyễn Sơn Ca",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A06, 12A13, 12A17, 10A01, 10A04, 10A10, 10A14, 10A23. (K12 tăng 2 tiết/lớp/tuần)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 8
      },
      "2": {
        "chuan": 18,
        "tang": 8
      },
      "3": {
        "chuan": 18,
        "tang": 8
      },
      "4": {
        "chuan": 18,
        "tang": 8
      },
      "5": {
        "chuan": 18,
        "tang": 8
      },
      "6": {
        "chuan": 18,
        "tang": 8
      },
      "7": {
        "chuan": 18,
        "tang": 8
      },
      "8": {
        "chuan": 18,
        "tang": 8
      },
      "9": {
        "chuan": 9
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A06, 12A13, 12A17, 10A01, 10A04, 10A10, 10A14, 10A23. (K12 tăng 2 tiết/lớp/tuần)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 8,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-4": {
    "to": "gdtc",
    "stt": 4,
    "hoDem": "Nguyễn Thị Thanh",
    "ten": "Trang",
    "hoTen": "Nguyễn Thị Thanh Trang",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A04, 12A10, 12A15, 12A16, 10A05, 10A06, 10A07, 10A11. (K12 tăng 2 tiết/lớp/tuần)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 10
      },
      "2": {
        "chuan": 18,
        "tang": 10
      },
      "3": {
        "chuan": 18,
        "tang": 10
      },
      "4": {
        "chuan": 18,
        "tang": 10
      },
      "5": {
        "chuan": 18,
        "tang": 10
      },
      "6": {
        "chuan": 18,
        "tang": 10
      },
      "7": {
        "chuan": 18,
        "tang": 10
      },
      "8": {
        "chuan": 18,
        "tang": 10
      },
      "9": {
        "chuan": 9
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A04, 12A10, 12A15, 12A16, 10A05, 10A06, 10A07, 10A11. (K12 tăng 2 tiết/lớp/tuần)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 10,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-5": {
    "to": "gdtc",
    "stt": 5,
    "hoDem": "Võ Ngọc",
    "ten": "Tuấn",
    "hoTen": "Võ Ngọc Tuấn",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A03, 11A11, 11A12, 11A13, 10A02, 10A03, 10A09, 10A12, 10A22.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18
      },
      "2": {
        "chuan": 18
      },
      "3": {
        "chuan": 18
      },
      "4": {
        "chuan": 18
      },
      "5": {
        "chuan": 18
      },
      "6": {
        "chuan": 18
      },
      "7": {
        "chuan": 18
      },
      "8": {
        "chuan": 18
      },
      "9": {
        "chuan": 9
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A03, 11A11, 11A12, 11A13, 10A02, 10A03, 10A09, 10A12, 10A22.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-6": {
    "to": "gdtc",
    "stt": 6,
    "hoDem": "Nguyễn Thị Minh",
    "ten": "Châu",
    "hoTen": "Nguyễn Thị Minh Châu",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01, 11A09, 11A15, 10A18, 10A21; HĐTN-HN: 10A18.",
    "kiemNhiem": "Chủ nhiệm 10A18",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "2": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "3": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "4": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "5": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "6": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "7": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "8": {
        "chuan": 10,
        "hn": 3,
        "kn": 4
      },
      "9": {
        "chuan": 5,
        "kn": 4
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01, 11A09, 11A15, 10A18, 10A21; HĐTN-HN: 10A18.",
        "kn": "Chủ nhiệm 10A18",
        "mau": {
          "chuan": 10,
          "tang": 0,
          "hn": 3,
          "gddp": 0,
          "kn": 4,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdtc-7": {
    "to": "gdtc",
    "stt": 7,
    "hoDem": "Nguyễn Ngọc",
    "ten": "Hiến",
    "hoTen": "Nguyễn Ngọc Hiến",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A05, 11A06, 11A07, 11A08, 11A14, 10A08, 10A13, 10A15, 10A24.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18
      },
      "2": {
        "chuan": 18
      },
      "3": {
        "chuan": 18
      },
      "4": {
        "chuan": 18
      },
      "5": {
        "chuan": 18
      },
      "6": {
        "chuan": 18
      },
      "7": {
        "chuan": 18
      },
      "8": {
        "chuan": 18
      },
      "9": {
        "chuan": 9
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A05, 11A06, 11A07, 11A08, 11A14, 10A08, 10A13, 10A15, 10A24.",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:03:50.813Z"
  },
  "gdqp-an-1": {
    "to": "gdqp-an",
    "stt": 1,
    "hoDem": "Nguyễn Ngọc",
    "ten": "Vũ",
    "hoTen": "Nguyễn Ngọc Vũ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A06, 12A07, 12A08, 12A09, 10A05, 10A06, 10A07, 10A09, 10A10, 10A11, 10A12, 10A18, 10A24. (K12 tăng 1 tiết/lớp/tuần)",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "2": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "3": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "4": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "5": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "6": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "7": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "8": {
        "chuan": 14,
        "tang": 5,
        "kn": 3
      },
      "9": {
        "chuan": 14,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A06, 12A07, 12A08, 12A09, 10A05, 10A06, 10A07, 10A09, 10A10, 10A11, 10A12, 10A18, 10A24. (K12 tăng 1 tiết/lớp/tuần)",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 14,
          "tang": 5,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:04:20.546Z"
  },
  "gdqp-an-2": {
    "to": "gdqp-an",
    "stt": 2,
    "hoDem": "Huỳnh Văn",
    "ten": "Thanh",
    "hoTen": "Huỳnh Văn Thanh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A02, 12A03, 12A10, 12A11, 12A12, 12A13, 12A17, 10A13, 10A14, 10A15, 10A16, 10A17, 10A19, 10A20, 10A21. (K12 tăng 1 tiết/lớp/tuần)",
    "kiemNhiem": "Tổ phó chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "2": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "3": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "4": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "5": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "6": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "7": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "8": {
        "chuan": 16,
        "tang": 8,
        "kn": 1
      },
      "9": {
        "chuan": 16,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A02, 12A03, 12A10, 12A11, 12A12, 12A13, 12A17, 10A13, 10A14, 10A15, 10A16, 10A17, 10A19, 10A20, 10A21. (K12 tăng 1 tiết/lớp/tuần)",
        "kn": "Tổ phó chuyên môn",
        "mau": {
          "chuan": 16,
          "tang": 8,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:04:20.546Z"
  },
  "gdqp-an-3": {
    "to": "gdqp-an",
    "stt": 3,
    "hoDem": "Nguyễn Thế",
    "ten": "Vương",
    "hoTen": "Nguyễn Thế Vương",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A14, 12A15, 12A16, 11A04, 11A05, 11A06, 11A07, 11A08, 11A09, 11A10, 11A11, 11A12, 11A15. (K12 tăng 1 tiết/lớp/tuần)",
    "kiemNhiem": "TB (3 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "2": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "3": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "4": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "5": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "6": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "7": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "8": {
        "chuan": 14,
        "tang": 4,
        "kn": 3
      },
      "9": {
        "chuan": 14,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A14, 12A15, 12A16, 11A04, 11A05, 11A06, 11A07, 11A08, 11A09, 11A10, 11A11, 11A12, 11A15. (K12 tăng 1 tiết/lớp/tuần)",
        "kn": "TB (3 tiết/tuần)",
        "mau": {
          "chuan": 14,
          "tang": 4,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:04:20.546Z"
  },
  "gdqp-an-4": {
    "to": "gdqp-an",
    "stt": 4,
    "hoDem": "Nguyễn Công",
    "ten": "Nông",
    "hoTen": "Nguyễn Công Nông",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01, 11A02, 11A03, 11A13, 11A14, 10A01, 10A02, 10A03, 10A04, 10A08, 10A22, 10A23.",
    "kiemNhiem": "Chủ nhiệm 10A08, TBTDTT (2 tiết/tuần)",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "kn": 4
      },
      "2": {
        "chuan": 12,
        "kn": 4
      },
      "3": {
        "chuan": 12,
        "kn": 6
      },
      "4": {
        "chuan": 12,
        "kn": 6
      },
      "5": {
        "chuan": 12,
        "kn": 6
      },
      "6": {
        "chuan": 12,
        "kn": 6
      },
      "7": {
        "chuan": 12,
        "kn": 6
      },
      "8": {
        "chuan": 12,
        "kn": 6
      },
      "9": {
        "chuan": 12,
        "kn": 6
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01, 11A02, 11A03, 11A13, 11A14, 10A01, 10A02, 10A03, 10A04, 10A08, 10A22, 10A23.",
        "kn": "Chủ nhiệm 10A08, TBTDTT (2 tiết/tuần)",
        "mau": {
          "chuan": 12,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 6,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 9)"
      }
    ],
    "updatedAt": "2026-11-08T00:04:20.546Z"
  },
  "ngu-van-1": {
    "to": "ngu-van",
    "stt": 1,
    "hoDem": "Đặng Thị Minh",
    "ten": "Thạnh",
    "hoTen": "Đặng Thị Minh Thạnh",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A15, 10A02, 10A07, 10A15, 10A19. (Kê theo phân công giảng dạy)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15
      },
      "2": {
        "chuan": 15
      },
      "3": {
        "chuan": 15
      },
      "4": {
        "chuan": 15
      },
      "5": {
        "chuan": 15
      },
      "6": {
        "chuan": 15
      },
      "7": {
        "chuan": 15
      },
      "8": {
        "chuan": 15
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A15, 10A02, 10A07, 10A15, 10A19. (Kê theo phân công giảng dạy)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-2": {
    "to": "ngu-van",
    "stt": 2,
    "hoDem": "Trần Thị Ngọc",
    "ten": "Chi",
    "hoTen": "Trần Thị Ngọc Chi",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A02, 12A14, 11A02, 11A04. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "Tổ trưởng chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "2": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "3": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "4": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "5": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "6": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "7": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "8": {
        "chuan": 12,
        "tang": 2,
        "kn": 3
      },
      "9": {
        "chuan": 8,
        "kn": 3
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A02, 12A14, 11A02, 11A04. (K12 tăng tiết tuần 1-8)",
        "kn": "Tổ trưởng chuyên môn",
        "mau": {
          "chuan": 12,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 3,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-3": {
    "to": "ngu-van",
    "stt": 3,
    "hoDem": "Huỳnh Thị Hạ",
    "ten": "Vũ",
    "hoTen": "Huỳnh Thị Hạ Vũ",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A06, 12A17, 11A05, 11A07, 11A10. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2
      },
      "2": {
        "chuan": 15,
        "tang": 2
      },
      "3": {
        "chuan": 15,
        "tang": 2
      },
      "4": {
        "chuan": 15,
        "tang": 2
      },
      "5": {
        "chuan": 15,
        "tang": 2
      },
      "6": {
        "chuan": 15,
        "tang": 2
      },
      "7": {
        "chuan": 15,
        "tang": 2
      },
      "8": {
        "chuan": 15,
        "tang": 2
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A06, 12A17, 11A05, 11A07, 11A10. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-4": {
    "to": "ngu-van",
    "stt": 4,
    "hoDem": "Nguyễn Thị Thanh",
    "ten": "Thảo",
    "hoTen": "Nguyễn Thị Thanh Thảo",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A04, 12A09, 11A03, 11A06, 11A09, 11A13. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 2
      },
      "2": {
        "chuan": 18,
        "tang": 2
      },
      "3": {
        "chuan": 18,
        "tang": 2
      },
      "4": {
        "chuan": 18,
        "tang": 2
      },
      "5": {
        "chuan": 18,
        "tang": 2
      },
      "6": {
        "chuan": 18,
        "tang": 2
      },
      "7": {
        "chuan": 18,
        "tang": 2
      },
      "8": {
        "chuan": 18,
        "tang": 2
      },
      "9": {
        "chuan": 12
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A04, 12A09, 11A03, 11A06, 11A09, 11A13. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-5": {
    "to": "ngu-van",
    "stt": 5,
    "hoDem": "Nguyễn Thị Lệ",
    "ten": "Thủy",
    "hoTen": "Nguyễn Thị Lệ Thủy",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "11A01, 10A04, 10A09, 10A16, 10A22.",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15
      },
      "2": {
        "chuan": 15
      },
      "3": {
        "chuan": 15
      },
      "4": {
        "chuan": 15
      },
      "5": {
        "chuan": 15
      },
      "6": {
        "chuan": 15
      },
      "7": {
        "chuan": 15
      },
      "8": {
        "chuan": 15
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "11A01, 10A04, 10A09, 10A16, 10A22.",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 0,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-6": {
    "to": "ngu-van",
    "stt": 6,
    "hoDem": "Trần Thị Bích",
    "ten": "Thủy",
    "hoTen": "Trần Thị Bích Thủy",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A03, 12A12, 10A01, 10A10, 10A24. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "Tổ phó chuyên môn",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "2": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "3": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "4": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "5": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "6": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "7": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "8": {
        "chuan": 15,
        "tang": 2,
        "kn": 1
      },
      "9": {
        "chuan": 10,
        "kn": 1
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A03, 12A12, 10A01, 10A10, 10A24. (K12 tăng tiết tuần 1-8)",
        "kn": "Tổ phó chuyên môn",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 1,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-7": {
    "to": "ngu-van",
    "stt": 7,
    "hoDem": "Vũ Thị Kim",
    "ten": "Chi",
    "hoTen": "Vũ Thị Kim Chi",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A01, 12A11, 10A06, 10A11, 10A18, 10A20. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 18,
        "tang": 2
      },
      "2": {
        "chuan": 18,
        "tang": 2
      },
      "3": {
        "chuan": 18,
        "tang": 2
      },
      "4": {
        "chuan": 18,
        "tang": 2
      },
      "5": {
        "chuan": 18,
        "tang": 2
      },
      "6": {
        "chuan": 18,
        "tang": 2
      },
      "7": {
        "chuan": 18,
        "tang": 2
      },
      "8": {
        "chuan": 18,
        "tang": 2
      },
      "9": {
        "chuan": 12
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A01, 12A11, 10A06, 10A11, 10A18, 10A20. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 18,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-8": {
    "to": "ngu-van",
    "stt": 8,
    "hoDem": "Võ Thị Tam",
    "ten": "Chung",
    "hoTen": "Võ Thị Tam Chung",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A07, 12A16, 10A03, 10A08, 10A23. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2
      },
      "2": {
        "chuan": 15,
        "tang": 2
      },
      "3": {
        "chuan": 15,
        "tang": 2
      },
      "4": {
        "chuan": 15,
        "tang": 2
      },
      "5": {
        "chuan": 15,
        "tang": 2
      },
      "6": {
        "chuan": 15,
        "tang": 2
      },
      "7": {
        "chuan": 15,
        "tang": 2
      },
      "8": {
        "chuan": 15,
        "tang": 2
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A07, 12A16, 10A03, 10A08, 10A23. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-9": {
    "to": "ngu-van",
    "stt": 9,
    "hoDem": "Huỳnh Thị Hồng",
    "ten": "Thắm",
    "hoTen": "Huỳnh Thị Hồng Thắm",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A05, 12A15, 10A12, 10A17, 10A21. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2
      },
      "2": {
        "chuan": 15,
        "tang": 2
      },
      "3": {
        "chuan": 15,
        "tang": 2
      },
      "4": {
        "chuan": 15,
        "tang": 2
      },
      "5": {
        "chuan": 15,
        "tang": 2
      },
      "6": {
        "chuan": 15,
        "tang": 2
      },
      "7": {
        "chuan": 15,
        "tang": 2
      },
      "8": {
        "chuan": 15,
        "tang": 2
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A05, 12A15, 10A12, 10A17, 10A21. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-10": {
    "to": "ngu-van",
    "stt": 10,
    "hoDem": "Nguyễn Thị",
    "ten": "Lựu",
    "hoTen": "Nguyễn Thị Lựu",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A08, 12A13, 10A05, 10A13, 10A14. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 2
      },
      "2": {
        "chuan": 15,
        "tang": 2
      },
      "3": {
        "chuan": 15,
        "tang": 2
      },
      "4": {
        "chuan": 15,
        "tang": 2
      },
      "5": {
        "chuan": 15,
        "tang": 2
      },
      "6": {
        "chuan": 15,
        "tang": 2
      },
      "7": {
        "chuan": 15,
        "tang": 2
      },
      "8": {
        "chuan": 15,
        "tang": 2
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A08, 12A13, 10A05, 10A13, 10A14. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 2,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  },
  "ngu-van-11": {
    "to": "ngu-van",
    "stt": 11,
    "hoDem": "Lê Thị",
    "ten": "Phượng",
    "hoTen": "Lê Thị Phượng",
    "chucDanh": "Giáo viên THPT Hạng III - Mã số: V.07.05.15",
    "lop": "12A10, 11A08, 11A11, 11A12, 11A14. (K12 tăng tiết tuần 1-8)",
    "kiemNhiem": "",
    "tieuChuan": 595,
    "ktPpct": 0,
    "weeks": {
      "1": {
        "chuan": 15,
        "tang": 1
      },
      "2": {
        "chuan": 15,
        "tang": 1
      },
      "3": {
        "chuan": 15,
        "tang": 1
      },
      "4": {
        "chuan": 15,
        "tang": 1
      },
      "5": {
        "chuan": 15,
        "tang": 1
      },
      "6": {
        "chuan": 15,
        "tang": 1
      },
      "7": {
        "chuan": 15,
        "tang": 1
      },
      "8": {
        "chuan": 15,
        "tang": 1
      },
      "9": {
        "chuan": 10
      }
    },
    "pc": [
      {
        "tu": 1,
        "den": null,
        "lop": "12A10, 11A08, 11A11, 11A12, 11A14. (K12 tăng tiết tuần 1-8)",
        "kn": "",
        "mau": {
          "chuan": 15,
          "tang": 1,
          "hn": 0,
          "gddp": 0,
          "kn": 0,
          "tc": 0
        },
        "ghiChu": "Phân công đầu năm (số tiết mẫu lấy theo tuần 8)"
      }
    ],
    "updatedAt": "2026-11-08T00:48:29.298Z"
  }
};
