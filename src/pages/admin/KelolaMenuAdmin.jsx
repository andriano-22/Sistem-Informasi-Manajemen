import React, { useState } from 'react';

const KelolaMenuAdmin = ({ menus, updateStokMenu, tambahMenuBaru }) => {
  const [form, setForm] = useState({ nama: '', harga: '', desc: '', img: '' });

  const handleUpload = () => {
    if (!form.nama || !form.harga) return alert("Nama dan Harga wajib diisi!");
    tambahMenuBaru(form);
    setForm({ nama: '', harga: '', desc: '', img: '' });
    alert(`Menu ${form.nama} berhasil ditambahkan!`);
  };

  return (
    <div className="container">
      <h2 className="section-title">Manajemen <span>Produk & Stok</span></h2>
      
      {/* Form Upload Baru */}
      <div className="admin-card upload-box">
        <h3>Upload Menu Baru</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Menu</label>
            <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} placeholder="Contoh: Pisang Coklat" />
          </div>
          <div className="form-group">
            <label>Harga (Rp)</label>
            <input type="number" value={form.harga} onChange={e => setForm({...form, harga: e.target.value})} placeholder="15000" />
          </div>
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Deskripsi menu..."></textarea>
          </div>
          <div className="form-group">
            <label>Foto Menu (URL)</label>
            <input type="text" value={form.img} onChange={e => setForm({...form, img: e.target.value})} placeholder="Masukan link gambar" />
          </div>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={handleUpload}>Upload Menu</button>
      </div>

      <hr style={{ margin: '40px 0', border: '1px solid #ddd' }} />

      {/* Daftar Kelola Stok */}
      <h3 style={{ marginBottom: '20px' }}>Daftar Katalog & Status Stok</h3>
      <div className="menu-grid">
        {menus.map((m) => (
          <div key={m.id} className={`menu-card ${m.stok === 'kosong' ? 'kosong' : ''}`}>
            <img src={m.img} alt={m.nama} />
            <div className="menu-info">
              <h4>{m.nama}</h4>
              <p>Harga: Rp {m.harga.toLocaleString()}</p>
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Status Stok:</label>
                <select 
                  className="status-select" 
                  style={{ width: '100%', marginTop: '5px' }} 
                  value={m.stok}
                  onChange={(e) => updateStokMenu(m.id, e.target.value)}
                >
                  <option value="ada">Tersedia (Ada)</option>
                  <option value="kosong">Kosong (Habis)</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelolaMenuAdmin;