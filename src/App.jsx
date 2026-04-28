import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; 

// Import Layouts
import AdminLayout from './layouts/admin/LayoutAdmin';

// Import Pages
import AdminBeranda from './pages/admin/BerandaAdmin'; 
import AdminPesanan from './pages/admin/PesananAdmin'; 
import AdminProsesPesanan from './pages/admin/AdminProsesPesanan'; 
import AdminRiwayatPesanan from './pages/admin/RiwayatPesananAdmin';
import AdminKelolaMenu from './pages/admin/KelolaMenuAdmin';
import AdminBuatPesanan from './pages/admin/BuatPesananAdmin';

function App() {
  const navigate = useNavigate();

  // --- STATE UTAMA ---
  const [menus, setMenus] = useState([
    { id: 1, nama: "Nasi Kuning Bitung", harga: 5000, desc: "Abis Makang langsung ba tikang.", stok: "ada", img: "https://i.pinimg.com/736x/97/3c/4d/973c4d1f93729876b5c554edd802cbdc.jpg" },
    { id: 2, nama: "Mie Cakalang Gatal", harga: 20000, desc: "from dendengan dalam.", stok: "ada", img: "https://i.pinimg.com/736x/b0/2c/91/b02c918f0ad2a4fbc8e0dc65c9073ed9.jpg" },
    { id: 3, nama: "Pisang Goreng Laikit", harga: 15000, desc: "Enak katanya.", stok: "ada", img: "https://i.pinimg.com/736x/a4/cf/25/a4cf25ba39e4b3d9e54c5f979df4502f.jpg" }
  ]);

  const [cart, setCart] = useState({});
  const [activeOrders, setActiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);

  // Fungsi Update Quantity
  const updateQty = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  // Fungsi Pindah ke Proses (Checkout)
  const pindahkanKeProses = (meja, email, payMethod, totalHarga, cartItems, currentMenus) => {
    const mejaNum = parseInt(meja);
    if(occupiedTables.includes(mejaNum)) return alert("Meja No. " + mejaNum + " sedang digunakan!");

    const itemsOrdered = cartItems.map(id => {
      const m = currentMenus.find(menu => menu.id === parseInt(id));
      return { nama: m.nama, qty: cart[id], subtotal: m.harga * cart[id] };
    });

    const newOrder = {
      id: "KM-" + Date.now().toString().slice(-6),
      meja: mejaNum,
      items: itemsOrdered,
      total: totalHarga,
      status: "diproses",
      metode: payMethod,
      waktu: new Date().toLocaleTimeString()
    };

    setActiveOrders([...activeOrders, newOrder]);
    setOccupiedTables([...occupiedTables, mejaNum]);
    setCart({}); 
    alert("Pesanan meja " + mejaNum + " berhasil dikirim ke dapur!");
    navigate('/adminProses-pesanan'); // Sesuai permintaan: pindah ke halaman proses
  };

  // Update Stok di Kelola Menu
  const updateStokMenu = (id, val) => {
    setMenus(menus.map(m => m.id === id ? { ...m, stok: val } : m));
  };

  // Tambah Menu Baru
  const tambahMenuBaru = (newMenu) => {
    setMenus([...menus, { ...newMenu, id: Date.now(), stok: 'ada' }]);
  };

  // Selesaikan Pesanan
  const ubahKeSelesai = (idx) => {
    const order = activeOrders[idx];
    setHistoryOrders([...historyOrders, { ...order, status: 'selesai' }]);
    setOccupiedTables(occupiedTables.filter(m => m !== order.meja));
    setActiveOrders(activeOrders.filter((_, i) => i !== idx));
    alert("Pesanan selesai!");
    navigate('/riwayat-pesanan'); // Masuk ke riwayat
  };

  return (
    <div className="w-full min-h-screen text-[#333] font-['Poppins',sans-serif] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<AdminLayout><AdminBeranda/></AdminLayout>} />
        
        <Route path="/buat-pesanan" element={
          <AdminLayout>
            <AdminBuatPesanan menus={menus} cart={cart} updateQty={updateQty} />
          </AdminLayout>
        } />

        <Route path="/pesanan" element={
          <AdminLayout>
            <AdminPesanan cart={cart} menus={menus} updateQty={updateQty} pindahkanKeProses={pindahkanKeProses} />
          </AdminLayout>
        } />

        <Route path="/kelola-menu" element={
          <AdminLayout>
            <AdminKelolaMenu menus={menus} updateStokMenu={updateStokMenu} tambahMenuBaru={tambahMenuBaru} />
          </AdminLayout>
        } />

        <Route path="/adminProses-pesanan" element={
          <AdminLayout>
            <AdminProsesPesanan activeOrders={activeOrders} ubahKeSelesai={ubahKeSelesai} />
          </AdminLayout>
        } />

        <Route path="/riwayat-pesanan" element={
          <AdminLayout>
            <AdminRiwayatPesanan historyOrders={historyOrders} />
          </AdminLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;