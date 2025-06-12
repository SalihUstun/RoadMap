import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cities"));
        const citiesArray = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        setCities(citiesArray);
      } catch (err) {
        console.error("Şehirler alınamadı:", err);
      }
    };

    fetchCities();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    if (value === "") {
      setFilteredCities([]);
      return;
    }
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(value)
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (cityName) => {
    setSearchText(cityName);
    setFilteredCities([]);
  };

  const handleSearchClick = () => {
    if (searchText.trim() !== "") {
      window.location.href = `/city/${searchText.trim()}`;
      setMenuOpen(false); 
    }
  };

  return (
    <nav className="nav">
      <div
        className="nav-logo"
        onClick={() => {
          navigate("/");
          setMenuOpen(false); 
        }}
        style={{ cursor: "pointer" }}
      >
        RoadMap
      </div>

      <div className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
  <li
    onClick={() => {
      navigate("/");
      setMenuOpen(false);
    }}
    style={{ cursor: "pointer" }}
  >
    Ana Sayfa
  </li>

  <li
  onClick={() => {
    navigate("/iletisim");
    setMenuOpen(false);
  }}
  style={{ cursor: "pointer" }}
>
  Hakkımızda
</li>


  <li style={{ position: "relative" }}>
    <div className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Şehir"
        value={searchText}
        onChange={handleSearchChange}
        style={{ width: "180px", height: "30px" }}
        autoComplete="off"
      />
      <button className="btn btn-primary" type="button" onClick={handleSearchClick}>
        Ara
      </button>
    </div>

    {filteredCities.length > 0 && (
      <ul className="search-results">
        {filteredCities.map(city => (
          <li
            key={city.id}
            onClick={() => handleCitySelect(city.name)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    )}
  </li>
</ul>

    </nav>
  );
};

export default Navbar;
