function Header({ activeSection, showSection }) {
  return (
    <nav className="navbar">
      <div className="logo">Kios <span>Mom's</span></div>
      <ul className="nav-links">
        <li>
          <a href="#" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => showSection('home')}>
            Beranda
          </a>
        </li>
        <li>
          <a href="#" className={`nav-item ${activeSection === 'buat-pesanan' ? 'active' : ''}`} onClick={() => showSection('buat-pesanan')}>
            Buat Pesanan
          </a>
        </li>
        <li>
          <a href="#" className={`nav-item ${activeSection === 'order-status' ? 'active' : ''}`} onClick={() => showSection('order-status')}>
            Pesanan
          </a>
        </li>
        <li>
          <a href="#" className={`nav-item ${activeSection === 'admin-dashboard' ? 'active' : ''}`} onClick={() => showSection('admin-dashboard')}>
            Proses Pesanan
          </a>
        </li>
        <li>
          <a href="#" className={`nav-item ${activeSection === 'riwayat-pesanan' ? 'active' : ''}`} onClick={() => showSection('riwayat-pesanan')}>
            Riwayat Pesanan
          </a>
        </li>
        <li>
          <a href="#" className={`nav-item ${activeSection === 'kelola-menu' ? 'active' : ''}`} onClick={() => showSection('kelola-menu')}>
            Kelola Menu
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;