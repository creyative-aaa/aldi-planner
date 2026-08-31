import type { AcademicEvent, TrainingModule } from "@/lib/types";

export type { AcademicEvent, ModuleCategory, TrainingModule } from "@/lib/types";

export const academicEvents: AcademicEvent[] = [
  {
    id: "pmb-1",
    name: "PMB Gelombang 1",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    description:
      "Pendaftaran mahasiswa baru gelombang pertama dibuka untuk semua program studi.",
  },
  {
    id: "krs-ganjil",
    name: "KRS Semester Ganjil",
    startDate: "2026-10-05",
    endDate: "2026-10-16",
    description:
      "Masa pengisian Kartu Rencana Studi untuk semester ganjil 2026/2027.",
  },
  {
    id: "perkuliahan-ganjil",
    name: "Awal Perkuliahan Ganjil",
    startDate: "2026-10-19",
    endDate: "2027-02-05",
    description:
      "Periode perkuliahan reguler semester ganjil berlangsung selama 16 pekan.",
  },
  {
    id: "uts-ganjil",
    name: "UTS Semester Ganjil",
    startDate: "2026-12-07",
    endDate: "2026-12-12",
    description:
      "Ujian Tengah Semester dilaksanakan serentak untuk seluruh program studi.",
  },
  {
    id: "uas-ganjil",
    name: "UAS Semester Ganjil",
    startDate: "2027-02-08",
    endDate: "2027-02-19",
    description:
      "Ujian Akhir Semester sekaligus penutupan periode perkuliahan ganjil.",
  },
];

export const trainingModules: TrainingModule[] = [
  {
    id: "tm-pmb",
    moduleName: "PMB",
    category: "core",
    scheduledDate: "2026-08-24",
    relatedEventId: "pmb-1",
    rationale:
      "Pelatihan modul PMB wajib selesai sebelum Gelombang 1 dibuka agar tim admisi kampus siap memproses pendaftaran dan verifikasi berkas mahasiswa baru.",
  },
  {
    id: "tm-keuangan",
    moduleName: "Keuangan",
    category: "core",
    scheduledDate: "2026-08-27",
    relatedEventId: "pmb-1",
    rationale:
      "Sinkronisasi skema pembayaran dan tagihan mahasiswa baru perlu dikuasai sebelum periode PMB berjalan agar tidak ada kendala transaksi.",
  },
  {
    id: "tm-krs",
    moduleName: "KRS",
    category: "core",
    scheduledDate: "2026-09-28",
    relatedEventId: "krs-ganjil",
    rationale:
      "Dijadwalkan satu minggu sebelum masa KRS agar dosen wali dan admin prodi mampu membimbing mahasiswa mengisi rencana studi tanpa kendala teknis.",
  },
  {
    id: "tm-operasional",
    moduleName: "Operasional Perkuliahan",
    category: "core",
    scheduledDate: "2026-10-12",
    relatedEventId: "perkuliahan-ganjil",
    rationale:
      "Persiapan jadwal kuliah, presensi, dan pengelolaan kelas dilakukan tepat sebelum perkuliahan dimulai untuk memastikan operasional berjalan mulus.",
  },
  {
    id: "tm-spmi",
    moduleName: "SPMI",
    category: "support",
    scheduledDate: "2026-10-26",
    rationale:
      "Dijadwalkan di gap tenang setelah perkuliahan stabil, memberi waktu tim mutu memahami siklus penjaminan mutu internal tanpa mengganggu agenda inti.",
  },
  {
    id: "tm-obe",
    moduleName: "OBE",
    category: "support",
    scheduledDate: "2026-11-09",
    rationale:
      "Pemetaan CPL–CPMK berbasis Outcome-Based Education diisi pada celah antara awal perkuliahan dan UTS, saat beban operasional relatif rendah.",
  },
  {
    id: "tm-cbt",
    moduleName: "CBT",
    category: "support",
    scheduledDate: "2026-11-23",
    rationale:
      "Pelatihan Computer-Based Test disiapkan jauh sebelum UTS agar tim prodi punya ruang uji coba bank soal dan simulasi ujian daring.",
  },
  {
    id: "tm-karirlink",
    moduleName: "Karirlink",
    category: "support",
    scheduledDate: "2026-11-30",
    rationale:
      "Modul pusat karier diisi pada minggu tenang menjelang UTS, fokus pada integrasi data alumni dan lowongan mitra industri.",
  },
  {
    id: "tm-kepegawaian",
    moduleName: "Kepegawaian",
    category: "support",
    scheduledDate: "2027-01-11",
    rationale:
      "Pengelolaan data dosen dan staf dijadwalkan di awal semester baru tahun ajaran berjalan, memanfaatkan jeda pasca libur akhir tahun.",
  },
  {
    id: "tm-kemahasiswaan",
    moduleName: "Kemahasiswaan",
    category: "support",
    scheduledDate: "2027-01-18",
    rationale:
      "Modul kegiatan dan prestasi mahasiswa diisi pada gap antara masa tenang pasca-UTS dan persiapan UAS.",
  },
  {
    id: "tm-akreditasi",
    moduleName: "Akreditasi",
    category: "support",
    scheduledDate: "2027-01-25",
    rationale:
      "Persiapan dokumen akreditasi dijadwalkan pada periode tenang menjelang UAS agar tim borang dapat fokus tanpa terpotong agenda akademik inti.",
  },
  {
    id: "tm-litabmas",
    moduleName: "Litabmas",
    category: "support",
    scheduledDate: "2027-03-01",
    rationale:
      "Pelatihan penelitian dan pengabdian masyarakat diisi pada gap pasca-UAS, saat dosen memiliki waktu luang untuk administrasi hibah.",
  },
  {
    id: "tm-simkerma",
    moduleName: "Simkerma",
    category: "support",
    scheduledDate: "2027-03-08",
    rationale:
      "Modul kerja sama institusi dijadwalkan di minggu tenang setelah UAS, menutup siklus pelatihan semester ganjil.",
  },
];
