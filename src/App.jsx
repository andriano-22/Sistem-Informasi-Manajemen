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
  // Sekarang useNavigate() aman karena di main.jsx sudah dibungkus BrowserRouter
  const navigate = useNavigate();

  // --- STATE UTAMA (DATABASE) ---
  const [menus, setMenus] = useState([
    { id: 1, nama: "Nasi Kuning Bitung", harga: 5000, desc: "Abis Makang langsung ba tikang.", stok: "ada", img: "https://i.pinimg.com/736x/97/3c/4d/973c4d1f93729876b5c554edd802cbdc.jpg" },
    { id: 2, nama: "Mie Cakalang Gatal", harga: 20000, desc: "from dendengan dalam.", stok: "ada", img: "https://i.pinimg.com/736x/b0/2c/91/b02c918f0ad2a4fbc8e0dc65c9073ed9.jpg" },
    { id: 3, nama: "Pisang Goreng Laikit", harga: 15000, desc: "Enak katanya.", stok: "ada", img: "https://i.pinimg.com/736x/a4/cf/25/a4cf25ba39e4b3d9e54c5f979df4502f.jpg" },
    { id: 4, nama: "Es Teh Manis Asam", harga: 5000, desc: "Panas ini.", stok: "ada", img: "https://i.pinimg.com/736x/1b/9a/23/1b9a2382bc0fb55a1f8cea2c28e1be12.jpg" },
    { id: 5, nama: "Nutrisari Dingin Amad", harga: 5000, desc: "Ekstrak Loloda Ambon.", stok: "ada", img: "https://i.pinimg.com/736x/f8/56/5b/f8565b7442a9df396adc387c8555d8b4.jpg" },
    { id: 6, nama: "Kopi Panas Skali", harga: 7000, desc: "Kopiko sto.", stok: "ada", img: "https://i.pinimg.com/736x/fd/63/20/fd632032bce32f2b913e2fd46fb4e1a9.jpg" }
  ]);

  const [cart, setCart] = useState({});
  const [activeOrders, setActiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([1, 2]);

  // --- PERBAIKAN 1: Menambahkan nama fungsi "const updateQty = ..." ---
  const updateQty = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const kirimKeDaftarPesanan = () => {
    const hasItem = Object.values(cart).some(q => q > 0);
    if(!hasItem) return alert("Pilih minimal 1 menu!");
    navigate('/pesanan'); // Pastikan pakai garis miring (/)
  };

  const pindahkanKeProses = (meja, email, payMethod, totalHarga, cartItems, currentMenus) => {
    const mejaNum = parseInt(meja);
    if(occupiedTables.includes(mejaNum)) return alert("Meja No. " + mejaNum + " sedang digunakan pelanggan lain!");

    const itemsOrdered = cartItems.map(id => {
      const m = currentMenus.find(menu => menu.id === parseInt(id));
      const qty = cart[id];
      return { nama: m.nama, qty: qty, subtotal: m.harga * qty };
    });

    const newOrder = {
      id: "KM-" + Date.now().toString().slice(-6),
      meja: mejaNum,
      email: email || "Manual @ Kasir",
      items: itemsOrdered,
      total: totalHarga,
      status: "diproses"
    };

    setActiveOrders([...activeOrders, newOrder]);
    setOccupiedTables([...occupiedTables, mejaNum]);
    setCart({}); 
    alert("Pesanan meja " + mejaNum + " berhasil diproses!");
    navigate('/adminProses-pesanan'); // Harus sesuai path di bawah
  };

  const updateStokMenu = (id, val) => {
    setMenus(menus.map(m => m.id === id ? { ...m, stok: val } : m));
  };

  const tambahMenuBaru = (newMenu) => {
    setMenus([...menus, { ...newMenu, id: menus.length + 1, stok: 'ada' }]);
  };

  const ubahKeSelesai = (idx, val) => {
    if(val === 'selesai') {
      const order = activeOrders[idx];
      setHistoryOrders([...historyOrders, { ...order, status: 'selesai' }]);
      setOccupiedTables(occupiedTables.filter(m => m !== order.meja));
      setActiveOrders(activeOrders.filter((_, i) => i !== idx));
      alert("Pesanan selesai dan masuk riwayat.");
      navigate('/riwayat-pesanan');
    }
  };

  return (
    <div className="w-full min-h-screen  text-[#333] font-['Poppins',sans-serif] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<AdminLayout><AdminBeranda/></AdminLayout>} />

        {/* --- PERBAIKAN 2: Props dimasukkan ke AdminBuatPesanan --- */}
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