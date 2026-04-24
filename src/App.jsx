import { useState } from 'react'
import './App.css'

function App() {
  // State untuk navigasi (menggantikan showSection di JS lama)
  const [activeSection, setActiveSection] = useState('home');

  // Fungsi untuk mengubah halaman
  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Kios <span>Mom's</span></div>
        <ul className="nav-links">
          <li><a href="#" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => showSection('home')}>Beranda</a></li>
          <li><a href="#" className={`nav-item ${activeSection === 'buat-pesanan' ? 'active' : ''}`} onClick={() => showSection('buat-pesanan')}>Buat Pesanan</a></li>
          <li><a href="#" className={`nav-item ${activeSection === 'order-status' ? 'active' : ''}`} onClick={() => showSection('order-status')}>Pesanan</a></li>
          <li><a href="#" className={`nav-item ${activeSection === 'admin-dashboard' ? 'active' : ''}`} onClick={() => showSection('admin-dashboard')}>Proses Pesanan</a></li>
          <li><a href="#" className={`nav-item ${activeSection === 'riwayat-pesanan' ? 'active' : ''}`} onClick={() => showSection('riwayat-pesanan')}>Riwayat Pesanan</a></li>
          <li><a href="#" className={`nav-item ${activeSection === 'kelola-menu' ? 'active' : ''}`} onClick={() => showSection('kelola-menu')}>Kelola Menu</a></li>
        </ul>
      </nav>

      {/* BERANDA */}
      {activeSection === 'home' && (
        <section id="home" className="content-section">
          <div className="hero">
            <div className="hero-content">
              <span className="tagline">Megamas Manado</span>
              <h1>Selamat Datang, Admin</h1>
              <p>Kelola operasional Kios Mom's Jangkar Sandar secara digital dan efisien.</p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => showSection('buat-pesanan')}>Mulai Pesan</button>
                <button className="btn-secondary" onClick={() => showSection('admin-dashboard')}>Cek Status</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BUAT PESANAN */}
      {activeSection === 'buat-pesanan' && (
        <section id="buat-pesanan" className="content-section">
          <div className="container">
            <h2 className="section-title">Katalog <span>Menu</span></h2>
            <div className="menu-grid" id="katalog-display">
               {/* Data menu akan muncul di sini nanti lewat State */}
               <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Memuat Katalog...</p>
            </div>
            <div className="floating-action">
              <button className="btn-confirm-all">Kirim ke Daftar Pesanan</button>
            </div>
          </div>
        </section>
      )}

      {/* KELOLA MENU */}
      {activeSection === 'kelola-menu' && (
        <section id="kelola-menu" className="content-section">
          <div className="container">
            <h2 className="section-title">Manajemen <span>Produk & Stok</span></h2>
            <div className="admin-card upload-box">
              <h3>Upload Menu Baru</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nama Menu</label>
                  <input type="text" id="new-name" placeholder="Contoh: Pisang Coklat" />
                </div>
                <div className="form-group">
                  <label>Harga (Rp)</label>
                  <input type="number" id="new-price" placeholder="15000" />
                </div>
                <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea id="new-desc" placeholder="Deskripsi menu..."></textarea>
                </div>
                <div className="form-group">
                  <label>Foto Menu (URL)</label>
                  <input type="text" id="new-img" placeholder="Masukan link gambar" />
                </div>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Upload Menu</button>
            </div>
            <hr style={{ margin: '40px 0', border: '1px solid #ddd' }} />
            <h3 style={{ marginBottom: '20px' }}>Daftar Katalog & Status Stok</h3>
            <div className="menu-grid" id="kelola-list-katalog">
                {/* List katalog */}
            </div>
          </div>
        </section>
      )}

      {/* PESANAN MASUK */}
      {activeSection === 'order-status' && (
        <section id="order-status" className="content-section">
          <div className="container">
            <h2 className="section-title">Pesanan <span>Masuk</span></h2>
            <div className="order-layout">
              <div className="order-items-list" id="pesanan-masuk-list">
                {/* List pesanan */}
              </div>
              <div className="order-sidebar">
                <div className="sidebar-card">
                  <h3>Konfirmasi Transaksi</h3>
                  <div className="form-group">
                    <label>Nomor Meja</label>
                    <input type="number" id="meja-input" defaultValue="5" />
                  </div>
                  <div className="form-group">
                    <label>Email (Opsional)</label>
                    <input type="email" id="email-input" placeholder="pembeli@mail.com" />
                  </div>
                  <div className="form-group">
                    <label>Metode Pembayaran</label>
                    <select id="pay-method">
                      <option value="Tunai">Tunai</option>
                      <option value="QRIS">QRIS / Nontunai</option>
                    </select>
                  </div>
                  <div className="summary" id="summary-pesanan">
                    {/* Total harga dll */}
                  </div>
                  <button className="btn-process">Proses Sekarang</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROSES DAN RIWAYAT (Bisa kamu tambahkan logic yang sama) */}
      {activeSection === 'admin-dashboard' && (
          <section className="container"><h2 className="section-title">Sedang <span>Diproses</span></h2></section>
      )}
      {activeSection === 'riwayat-pesanan' && (
          <section className="container"><h2 className="section-title">Riwayat <span>Selesai</span></h2></section>
      )}

    </div>
  )
}

export default App