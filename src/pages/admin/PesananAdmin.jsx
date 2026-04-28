import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PesananAdmin= ({ cart = {}, menus = [], updateQty, pindahkanKeProses }) => {
  const navigate = useNavigate();
  const [meja, setMeja] = useState('');
  const [payMethod, setPayMethod] = useState('Tunai');

  // Mengambil item yang ada di keranjang
  const cartItems = Object.keys(cart).filter(id => cart[id] > 0);
  let totalHarga = 0;
  let totalPcs = 0;

  return (
    <div className="p-4 md:p-10 bg-[#f0f2f5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Tombol Back */}
        <button 
          onClick={() => navigate('/buat-pesanan')} 
          className="group mb-6 flex items-center gap-2 text-gray-500 hover:text-[#002366] transition-colors font-semibold"
        >
          <span className="bg-white p-2 rounded-full shadow-sm group-hover:bg-[#002366] group-hover:text-white transition-all text-lg">←</span>
          Kembali Pilih Menu
        </button>

        {/* Layout Grid: Kiri (Daftar Pesanan), Kanan (Card Checkout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SISI KIRI: DAFTAR BELANJA (8 Kolom) ================= */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-black text-2xl text-gray-800 mb-2">Ringkasan <span className="text-[#FF8C00]">Menu</span></h3>
            
            {cartItems.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">Belum ada menu yang dipilih untuk diproses.</p>
              </div>
            ) : (
              cartItems.map(id => {
                const qty = cart[id];
                const m = menus.find(menu => menu.id === parseInt(id));
                if (!m) return null;
                const sub = m.harga * qty;
                totalHarga += sub; totalPcs += qty;

                return (
                  <div key={id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <img src={m.img} alt={m.nama} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-bold text-gray-800 text-lg leading-tight">{m.nama}</h5>
                        <p className="text-xs text-[#FF8C00] font-bold">Rp {m.harga.toLocaleString()} / porsi</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Kontrol Qty di dalam list */}
                      <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                        <button onClick={() => updateQty(m.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-[#002366] hover:bg-red-50 hover:text-red-600 transition-colors">-</button>
                        <span className="font-black text-sm w-4 text-center">{qty}</span>
                        <button onClick={() => updateQty(m.id, 1)} className="w-8 h-8 flex items-center justify-center bg-[#002366] text-white rounded-lg shadow-sm font-bold hover:bg-blue-800 transition-colors">+</button>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Subtotal</p>
                        <strong className="text-lg text-[#002366]">Rp {sub.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ================= SISI KANAN: CARD PROSES (4 Kolom) ================= */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white p-8 rounded-[35px] shadow-2xl border border-gray-50">
              <h3 className="font-black text-xl text-gray-800 mb-6 border-b pb-4">Konfirmasi <span className="text-[#FF8C00]">Meja</span></h3>
              
              <div className="space-y-6">
                {/* Input No Meja Besar */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Nomor Meja</label>
                  <input 
                    type="number" 
                    value={meja} 
                    onChange={e => setMeja(e.target.value)} 
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-2xl text-center text-[#002366] focus:border-[#FF8C00] outline-none transition-all" 
                    placeholder="0" 
                  />
                </div>

                {/* Pilih Pembayaran */}
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Metode Pembayaran</label>
                  <select 
                    value={payMethod} 
                    onChange={e => setPayMethod(e.target.value)} 
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-[#002366] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Tunai">Tunai / Cash</option>
                    <option value="QRIS">QRIS / Transfer</option>
                  </select>
                </div>

                {/* Total Billing Box */}
                <div className="bg-[#002366] p-6 rounded-3xl text-white shadow-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold opacity-60 uppercase tracking-wider">Total Item ({totalPcs})</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">Total Bayar</span>
                    <span className="text-3xl font-black text-[#FF8C00]">Rp {totalHarga.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tombol Eksekusi */}
                <button 
                  onClick={() => pindahkanKeProses(meja, "", payMethod, totalHarga, cartItems, menus)}
                  disabled={!meja || cartItems.length === 0}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg transition-all duration-300 ${
                    !meja || cartItems.length === 0 
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                      : 'bg-[#FF8C00] text-white hover:bg-orange-600 hover:-translate-y-1 active:scale-95 shadow-orange-200'
                  }`}
                >
                  Proses Pesanan Sekarang
                </button>
                
                {!meja && cartItems.length > 0 && (
                  <p className="text-red-500 text-[10px] text-center font-bold animate-pulse uppercase tracking-tight">⚠️ Harap Isi Nomor Meja</p>
                )}
              </div>
            </div>
            
            {/* Dekorasi Tambahan */}
            <p className="text-center text-[10px] text-gray-400 mt-6 uppercase font-bold tracking-[0.2em]">Kios Mom's Jangkar Sandar</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PesananAdmin;