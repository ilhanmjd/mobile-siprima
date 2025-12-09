export const activeAssets = [
  { id: 'r14a', name: 'Laptop', status: 'Maintenance', tone: 'info' },
  { id: 'd45k', name: 'Komputer', status: 'Risiko', tone: 'danger' },
  { id: 'c12d', name: 'Data Cloud', status: 'Risiko', tone: 'danger' },
  { id: 'k99o', name: 'Server', status: 'Maintenance', tone: 'info' },
];

export const maintenanceSchedule = [
  { id: 'r14a', asset: 'Laptop', issue: 'LCD Pecah', level: 'Sedang', date: '20 Okt 2025', status: 'Penanganan' },
  { id: 'd45k', asset: 'Komputer', issue: 'Tidak Berfungsi', level: 'Sedang', date: '17 Okt 2025', status: 'Proses' },
  { id: 'c12d', asset: 'Data Cloud', issue: 'Kebocoran Data', level: 'Tinggi', date: '10 Okt 2025', status: 'Proses' },
  { id: 'v52w', asset: 'Microsoft Office', issue: 'Malware', level: 'Tinggi', date: '7 Okt 2025', status: 'Penanganan' },
];

export const verificationItems = [
  { id: 'r14a', name: 'Laptop Asus', date: '10-10-2025', pic: '1579', status: 'Ditangani' },
  { id: 'd45k', name: 'Printer Epson', date: '15-06-2025', pic: '1506', status: 'Proses' },
  { id: 'r12k', name: 'Router', date: '11-07-2025', pic: '0411', status: 'Ditangani' },
  { id: '1LH4N', name: 'Data Cloud', date: '26-01-2025', pic: '0705', status: 'Proses' },
];

export const notifications = [
  {
    id: 'notif-1',
    icon: 'home',
    title: 'Dinas | 1579',
    description:
      'Printer Epson L3250 perangkat multifungsi untuk dukungan administrasi Dinas Kesehatan.',
  },
  {
    id: 'notif-2',
    icon: 'rocket1',
    title: 'Dinas',
    description:
      'Laptop digunakan untuk pelaporan SPJ dan dokumentasi keuangan. Terhubung antivirus internal.',
  },
  {
    id: 'notif-3',
    icon: 'rocket1',
    title: 'Dinas',
    description: 'Router utama dengan failover otomatis ke sistem monitoring jaringan kota.',
  },
];

export const faqItems = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara menambahkan aset?',
    answer:
      'Masuk Inventarisasi → Input Aset, isi wizard hingga selesai. Setelah konfirmasi, form terkirim ke verifikator.',
  },
  {
    id: 'faq-2',
    question: 'Siapa yang boleh menginput Risiko?',
    answer:
      'Pejabat penanggung jawab aset atau risk officer yang ditugaskan dalam struktur organisasi.',
  },
  {
    id: 'faq-3',
    question: 'Bagaimana cara melakukan Risk Treatment?',
    answer:
      'Gunakan menu Risk Treatment, pilih strategi, tetapkan PIC dan target tanggal sebelum melakukan konfirmasi.',
  },
  {
    id: 'faq-4',
    question: 'Apakah pemeliharaan otomatis tersambung ke Service Desk?',
    answer:
      'Ya, setiap tiket pemeliharaan terhubung dengan modul Service Desk untuk monitoring status.',
  },
];

export const verificationStatuses = [
  { label: 'Aset Laptop', status: 'Under Review', tone: 'info' },
  { label: 'Komputer', status: 'Accepted', tone: 'success' },
  { label: 'Data Cloud', status: 'Rejected', tone: 'danger' },
  { label: 'Server', status: 'Rejected', tone: 'danger' },
];

export const riskChips = [
  { label: 'Aset Aktif' },
  { label: 'Maintenance' },
  { label: 'End of Life' },
  { label: 'Aset Bermasalah' },
];

export const wizardSteps = {
  asset: ['Identitas Aset', 'Detail Perolehan', 'Penanggung Jawab & Lokasi'],
  risk: ['Identifikasi Risiko', 'Analisis Awal',],
  maintenance: ['Id- Nama Asset', 'Pemeliharaan'],
  deletion: ['Identitas Aset', 'Penghapusan Asset'],
};
