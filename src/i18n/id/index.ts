import type { Translation } from '../i18n-types'

const id = {
  auth: {
    welcome: 'Selamat Datang Kembali',
    logout: 'Keluar',
    logoutUsername: 'Keluar ({username})',
    registerHere: 'Tidak punya akun? <>Daftar disini<>',
    notFound404: '404: Tidak Ditemukan',
    gone: 'Halaman Kosong',
    backTo: 'Kembali ke {isLoggedIn|{true: beranda, false: login}}'
  },
  home: {
    title: 'Templat Vue Anti Galau',
    sortBtn: 'Sortir Tombol',
    clock: 'Jam',
    toggleClock: 'Beralih Jam',
    clickToggleClock: 'Klik beralih jam untuk mengulang kalkulasi jam',
    changeLang: 'Ganti Bahasa',
    getStarted: 'Mulai'
  },
  todo: {
    backTo: 'Kembali ke {target}'
  },
  user: {
    preferences: 'Preferensi',
    likedTodos: 'Todos disukai',
    savedTodos: 'Todos disimpan',
    yourComments: 'Komentar anda'
  },
  forms: {
    username: 'Username',
    usernamePlaceholder: 'Username anda...',
    password: 'Password',
    passwordPlaceholder: 'Password anda...',
    error: '{icon} Error formulir',
    loginLoading: 'Sedang masuk...',
    login: 'Masuk',
    register: 'Daftar',
    add: 'Tambah',
    update: 'Ubah',
    remove: 'Hapus',
    limit: 'Batas',
    todoPlaceholder: 'Apa yang akan anda lakukan selanjutnya...'
  },
  common: {
    loading: 'Menunggu...',
    list: 'Daftar {0}',
    xDetail: 'Detail {feature}',
    xCreateSuccess: '{feature} berhasil dibuat',
    xCreateError: '{feature} gagal dibuat',
    xUpdateSuccess: '{feature} berhasil diubah',
    xUpdateError: '{feature} gagal diubah',
    xDeleteSuccess: '{feature} berhasil dihapus',
    xDeleteError: '{feature} gagal dihapus',
    error: '{module|capitalize} eror',
    noPageContent: 'Tidak Ada Konten',
    appName: 'Templat Vue',
    theme: 'Tema',
    empty: 'Tidak Ada Data',
    unauthorized: 'Tidak ada akses. Silahkan masuk terlebih dahulu.',
    authorized: 'Sudah Ada Akses',
    unsavedChanges: 'Buang perubahan yang belum disimpan - anda yakin?',
    system: 'Sistem',
    light: 'Terang',
    dark: 'Gelap',
    create: 'Buat',
    settings: 'Pengaturan',
    account: 'Akun'
  },
  success: {
    action: '{module} berhasil {action}'
  },
  error: {
    minLength: '{field} harus memiliki minimal {length} karakter',
    passwordMinLength: 'password harus memiliki minimal 6 karakter',
    action: '{module} gagal di {action}'
  }
} satisfies Translation

export default id
