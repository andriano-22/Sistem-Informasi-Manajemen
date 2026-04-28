import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminBuatPesanan = () => {
  const navigate = useNavigate();

  // --- DATA DUMMY LANGSUNG DI SINI (OBJECT) ---
  const [menus] = useState([
    { id: 1, nama: "Nasi Kuning Bitung", harga: 5000, desc: "Abis Makang langsung ba tikang.", stok: "ada", img: "https://i.pinimg.com/736x/97/3c/4d/973c4d1f93729876b5c554edd802cbdc.jpg" },
    { id: 2, nama: "Mie Cakalang Gatal", harga: 20000, desc: "from dendengan dalam.", stok: "ada", img: "https://i.pinimg.com/736x/b0/2c/91/b02c918f0ad2a4fbc8e0dc65c9073ed9.jpg" },
    { id: 3, nama: "Pisang Goreng Laikit", harga: 15000, desc: "Enak katanya.", stok: "ada", img: "https://i.pinimg.com/736x/a4/cf/25/a4cf25ba39e4b3d9e54c5f979df4502f.jpg" },
    { id: 4, nama: "Es Teh Manis Asam", harga: 5000, desc: "Panas ini.", stok: "ada", img: "https://i.pinimg.com/736x/1b/9a/23/1b9a2382bc0fb55a1f8cea2c28e1be12.jpg" },
    { id: 5, nama: "Nutrisari Dingin Amad", harga: 5000, desc: "Ekstrak Loloda Ambon.", stok: "ada", img: "https://i.pinimg.com/736x/f8/56/5b/f8565b7442a9df396adc387c8555d8b4.jpg" },
    { id: 6, nama: "Kopi Panas Skali", harga: 7000, desc: "Kopiko sto.", stok: "ada", img: "https://i.pinimg.com/736x/fd/63/20/fd632032bce32f2b913e2fd46fb4e1a9.jpg" }
  ]);

  const [cart, setCart] = useState({});

  // Fungsi Update Quantity Lokal
  const updateQty = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });

    
  };

  const totalItem = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 md:p-10 bg-[#f0f2f5] min-h-screen relative pb-32">
      <h2 className="text-center text-3xl font-black mb-10 text-[#002366]">
        Katalog <span className="text-[#FF8C00]">Kios Mom's</span>
      </h2>

      {/* Grid Menu Kotak-Kotak Kecil */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {menus.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
            {/* Foto Kotak */}
            <div className="aspect-square w-full overflow-hidden">
              <img src={m.img} alt={m.nama} className="w-full h-full object-cover" />
            </div>

            <div className="p-3 flex flex-col flex-grow justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-[11px] md:text-xs leading-tight line-clamp-2 mb-1">{m.nama}</h4>
                <p className="text-[#FF8C00] font-black text-xs">Rp {m.harga.toLocaleString()}</p>
              </div>

              {/* Kontrol Qty */}
              <div className="flex items-center justify-between mt-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                <button 
                  onClick={() => updateQty(m.id, -1)}
                  className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded text-[#002366] font-bold hover:bg-gray-100"
                >-</button>
                <span className="text-xs font-bold text-[#002366]">{cart[m.id] || 0}</span>
                <button 
                  onClick={() => updateQty(m.id, 1)}
                  className="w-6 h-6 flex items-center justify-center bg-[#002366] text-white rounded shadow-sm hover:bg-blue-800"
                >+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOMBOL STICKY DI KANAN BAWAH */}
      {totalItem > 0 && (
        <div className="fixed bottom-10 right-6 md:right-10 z-50">
          <button 
            onClick={() => navigate('/pesanan')}
            className="bg-[#FF8C00] text-white flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_10px_25px_rgba(255,140,0,0.4)] hover:scale-105 active:scale-95 transition-all group"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Selesai Pilih</span>
              <span className="text-lg font-black">{totalItem} Pesanan</span>
            </div>
            <div className="bg-white/20 p-2 rounded-xl group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBuatPesanan;    