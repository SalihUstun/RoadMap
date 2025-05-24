import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="nav">
      <div className="nav-logo">RoadMap</div>

      {/* Hamburger ikon */}
      <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menü */}
      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <li>Ana Sayfa</li>
        <li>Seyahat Ara</li>
        <li>Hakkımızda</li>
        <li className='nav-contact'>İletişim</li>
      </ul>
    </nav>
  );
};

export default Navbar;
