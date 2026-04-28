import React, { useState } from 'react';

const KelolaMenuAdmin = ({ menus, updateStokMenu, tambahMenuBaru }) => {
  const [form, setForm] = useState({ nama: '', harga: '', desc: '', img: '' });

  // Fungsi Import Foto agar admin bisa input gambar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, img: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!form.nama || !form.harga || !form.img) return alert("Nama, Harga, dan Foto wajib ada!");
    tambahMenuBaru({ ...form, harga: parseInt(form.harga) });
    setForm({ nama: '', harga: '', desc: '', img: '' });
    alert(`Menu ${form.nama} berhasil ditambahkan!`);
  };

  return (
    <div className="p-4 md:p-10 bg-[#f0f2f5] min-h-screen">
      <h2 className="text-3xl font-black text-[#002366] mb-8">Manajemen <span className="text-[#FF8C00]">Produk & Stok</span></h2>
      
      {/* Form Upload */}
      <div className="bg-white p-8 rounded-[35px] shadow-sm mb-12 max-w-4xl mx-auto">
        <h3 className="font-bold text-lg mb-6 border-b pb-2">Upload Menu Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Nama Menu</label>
              <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#FF8C00]" placeholder="Contoh: Nasi Kuning" />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Harga (Rp)</label>
              <input type="number" value={form.harga} onChange={e => setForm({...form, harga: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#FF8C00]" placeholder="5000" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Deskripsi</label>
              <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#FF8C00] h-[115px]" placeholder="Deskripsi menu..."></textarea>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Foto Menu</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs w-full p-3 border-2 border-dashed rounded-xl" />
          </div>
        </div>
        <button onClick={handleUpload} className="w-full mt-8 bg-[#002366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-900 transition-all">Upload Menu</button>
      </div>

      {/* Daftar Stok */}
      <h3 className="font-bold text-xl mb-6">Daftar Katalog & Status Stok</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {menus.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-3xl shadow-sm border">
            <img src={m.img} alt={m.nama} className="w-full h-32 object-cover rounded-2xl mb-3" />
            <h4 className="font-bold text-sm leading-tight mb-1">{m.nama}</h4>
            <p className="text-[#FF8C00] font-black text-xs mb-3">Rp {m.harga.toLocaleString()}</p>
            <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Status Stok</label>
            <select 
              className="w-full p-2 bg-gray-50 border rounded-lg text-xs font-bold outline-none"
              value={m.stok}
              onChange={(e) => updateStokMenu(m.id, e.target.value)}
            >
              <option value="ada">Tersedia</option>
              <option value="kosong">Tidak Tersedia</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelolaMenuAdmin;