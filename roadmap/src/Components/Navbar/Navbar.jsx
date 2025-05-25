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
        <li>İletişim</li>
        <li>
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Şehir"
              aria-label="Search"
              style={{ width: "150px", height: "30px" }}
            />
            <button className="btn btn-primary" type="submit">
              Ara
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
