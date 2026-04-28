import React from 'react';

const AdminProsesPesanan = ({ activeOrders, ubahKeSelesai }) => {
  return (
    <div className="p-4 md:p-10 bg-[#f0f2f5] min-h-screen">
      <h2 className="text-3xl font-black text-[#002366] mb-8">Monitoring <span className="text-[#FF8C00]">Meja Aktif</span></h2>
      
      {activeOrders.length === 0 ? (
        <div className="bg-white p-20 rounded-[40px] text-center border-2 border-dashed">
          <p className="text-gray-400 italic">Belum ada pesanan yang sedang diproses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOrders.map((order, index) => (
            <div key={order.id} className="bg-white rounded-[30px] shadow-md border overflow-hidden">
              <div className="bg-[#002366] p-4 text-white flex justify-between items-center">
                <h4 className="font-black text-xl">MEJA {order.meja}</h4>
                <span className="text-[10px] bg-[#FF8C00] px-2 py-1 rounded font-bold uppercase tracking-wider">DIPROSES</span>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-2">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between text-sm border-b pb-1">
                      <span><b className="text-[#FF8C00]">{item.qty}x</b> {item.nama}</span>
                      <span className="text-gray-400 font-bold">Rp {item.subtotal.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-gray-400 uppercase">Total Bayar</span>
                  <span className="text-2xl font-black text-[#002366]">Rp {order.total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => ubahKeSelesai(index)}
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Selesaikan Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProsesPesanan;