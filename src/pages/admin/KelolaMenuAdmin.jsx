import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; 

const KelolaMenuAdmin = ({ menu, fetchMenu, updateStokMenu }) => {
  const [form, setForm] = useState({ nama: '', harga: '', desc: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!form.nama || !form.harga || !file) return alert("Lengkapi data menu!");
    setLoading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      await supabase.storage.from('menu-images').upload(fileName, file);
      const { data: urlData } = supabase.storage.from('menu-images').getPublicUrl(fileName);

      const { error } = await supabase
        .from('menu')
        .insert([{ 
          nama: form.nama, 
          harga: parseInt(form.harga), 
          stok: 'ada', 
          img: urlData.publicUrl 
        }]);

      if (error) throw error;
      alert("Menu Berhasil Ditambahkan ke Katalog!");
      setForm({ nama: '', harga: '', desc: '' });
      setFile(null);
      if (fetchMenu) fetchMenu(); 
    } catch (error) {
      alert("Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#f0f2f5] min-h-screen">
      <h2 className="text-3xl font-black text-[#002366] mb-8">Manajemen <span className="text-[#FF8C00]">Produk & Stok</span></h2>
      
      {/* FORM UPLOAD */}
      <div className="bg-white p-8 rounded-[35px] shadow-sm mb-12 max-w-4xl mx-auto">
        <h3 className="font-bold text-lg mb-6 border-b pb-2">Tambah Menu Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="Nama Menu" />
          <input type="number" value={form.harga} onChange={e => setForm({...form, harga: e.target.value})} className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="Harga Rp" />
          <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} className="md:col-span-2 w-full p-3 bg-gray-50 border rounded-xl h-24" placeholder="Deskripsi..."></textarea>
          <div className="md:col-span-2">
            <input type="file" onChange={handleFileChange} className="w-full p-3 border-2 border-dashed rounded-xl text-xs" />
          </div>
        </div>
        <button onClick={handleUpload} disabled={loading} className="w-full mt-6 bg-[#002366] text-white py-4 rounded-2xl font-black uppercase hover:bg-blue-900 transition-all">
          {loading ? "Memproses..." : "Simpan Menu"}
        </button>
      </div>

      {/* DAFTAR MENU & UPDATE STATUS */}
      <h3 className="font-bold text-xl mb-6">Daftar Katalog & Status Stok</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {menu && menu.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded-3xl shadow-sm border flex flex-col justify-between">
            <div>
              <img src={m.img} alt={m.nama} className="w-full h-32 object-cover rounded-2xl mb-3" />
              <h4 className="font-bold text-sm truncate">{m.nama}</h4>
              <p className="text-[#FF8C00] font-black text-xs mb-3">Rp {m.harga.toLocaleString()}</p>
            </div>
            
            {/* DROPDOWN STOK */}
            <select 
              className="w-full p-2 bg-gray-50 border rounded-lg text-xs font-bold outline-none cursor-pointer hover:border-[#FF8C00] transition-colors"
              value={m.stok === 'kosong' || m.stok === 'Habis' ? 'kosong' : 'ada'}
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