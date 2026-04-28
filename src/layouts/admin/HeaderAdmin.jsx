import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation();

  // Fungsi kecil untuk menentukan class berdasarkan status active/hover
  const getLinkClass = (path) => {
    const baseClass = "text-[0.8rem] transition-colors duration-300 cursor-pointer ";
    return location.pathname === path 
      ? baseClass + "text-[#FF8C00]" // Class saat active (Orange)
      : baseClass + "text-white hover:text-[#FF8C00]"; // Class default & hover
  };

  return (
    <nav className="flex justify-between items-center py-[15px] px-[5%] bg-[#002366] text-white sticky top-0 z-[1000] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
      
      {/* Logo Kios Mom's */}
      <div className="text-xl font-bold tracking-wide">
        Kios <span className="text-[#FF8C00]">Mom's</span>
      </div>

      {/* Menu Navigasi */}
      <ul className="flex list-none m-0 p-0 items-center">
        <li className="mx-[10px]">
          <Link to="/" className={getLinkClass('/')}>
            Beranda
          </Link>
        </li>
        <li className="mx-[10px]">
          <Link to="/buat-pesanan" className={getLinkClass('/buat-pesanan')}>
            Buat Pesanan
          </Link>
        </li>
        <li className="mx-[10px]">
          <Link to="/Pesanan" className={getLinkClass('/Pesanan')}>
            Pesanan
          </Link>
        </li>
        <li className="mx-[10px]">
          <Link to="/adminProses-pesanan" className={getLinkClass('/adminProses-Pesanan')}>
            Proses Pesanan
          </Link>
        </li>
        <li className="mx-[10px]">
          <Link to="/riwayat-pesanan" className={getLinkClass('/riwayat-pesanan')}>
            Riwayat Pesanan
          </Link>
        </li>
        <li className="mx-[10px]">
          <Link to="/kelola-menu" className={getLinkClass('/kelola-menu')}>
            Kelola Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;