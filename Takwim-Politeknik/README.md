# Takwim Politeknik

Aplikasi web kalendar / takwim akademik untuk Politeknik Malaysia.

## Ciri-ciri

- 📅 Paparan kalendar bulanan interaktif
- 🏖️ Cuti umum dan cuti akademik Politeknik Malaysia
- ➕ Tambah acara sendiri (simpan dalam `localStorage`)
- 🗑️ Padam acara
- 🔖 Warna berbeza mengikut jenis acara (Cuti, Akademik, Peperiksaan, Aktiviti)

## Cara Guna

1. Buka fail `index.html` dalam pelayar web.
2. Navigasi bulan menggunakan butang **← Sebelum** dan **Seterusnya →**.
3. Tambah acara baharu menggunakan borang di bawah kalendar.
4. Klik **✕** pada acara untuk memadamnya.

## Struktur Fail

```
Takwim-Politeknik/
├── index.html   # Halaman utama
├── style.css    # Gaya & reka letak
├── app.js       # Logik kalendar & pengurusan acara
└── README.md    # Dokumentasi
```

## Jenis Acara

| Jenis         | Warna       |
|---------------|-------------|
| Cuti Umum     | Merah muda  |
| Akademik      | Hijau       |
| Peperiksaan   | Kuning      |
| Aktiviti      | Ungu        |
