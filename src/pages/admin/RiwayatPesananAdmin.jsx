import React, { useState } from 'react';

const RiwayatPesanan = ({ historyOrders }) => {
  // State untuk melacak accordion mana yang terbuka
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetail = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    // Menggantikan .container
    <div className="py-[40px] px-[5%] max-w-5xl mx-auto">
      
      {/* Menggantikan .section-title */}
      <h2 className="text-center mb-[30px] text-2xl md:text-3xl font-bold text-[#333]">
        Riwayat <span className="text-[#FF8C00]">Selesai</span>
      </h2>
      
      {/* Menggantikan .riwayat-container */}
      <div className="w-full">
        {historyOrders.length === 0 ? (
          <p className="text-center text-gray-500 italic">Belum ada riwayat pesanan.</p>
        ) : (
          historyOrders.map((o, idx) => (
            // Menggantikan .riwayat-item
            <div 
              key={o.id} 
              className="bg-white mb-[10px] rounded-[10px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            >
              
              {/* Menggantikan .riwayat-header */}
              <div 
                className="p-[15px] flex justify-between items-center cursor-pointer bg-[#fafafa] hover:bg-gray-100 transition-colors"
                onClick={() => toggleDetail(idx)}
              >
                <span className="text-gray-800">
                  <b className="font-bold">Meja {o.meja}</b> <span className="mx-1 text-gray-400">|</span> {o.id}
                </span>
                
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  Rp {o.total.toLocaleString()} 
                  {/* Ikon panah dengan animasi putar (opsional tapi bagus untuk UI) */}
                  <span className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </span>
              </div>
              
              {/* Menggantikan .riwayat-body & style display inline */}
              <div 
                className={`p-[15px] border-t border-[#eee] bg-white transition-all duration-300 ${
                  openIndex === idx ? 'block' : 'hidden'
                }`}
              >
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {o.items.map((i, iIdx) => (
                    <li key={iIdx} className="text-sm">
                      <span className="font-semibold text-gray-800">{i.nama}</span> x {i.qty} 
                      <span className="ml-2 text-gray-500">- Rp {i.subtotal.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Menggantikan style teks status selesai */}
                <p className="mt-[15px] font-bold text-green-600 tracking-wide text-sm">
                  STATUS: SELESAI
                </p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RiwayatPesanan;