// App.jsx
import React from "react";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CityPlacesPage from "./Pages/asd/CityPlacesPage";

const App = () => {
  // URL path'ini al, başındaki '/' kaldır
  const path = window.location.pathname.slice(1).toLowerCase();

  // Eğer path boşsa ana sayfa
  if (!path) {
    return <HomePage />;
  }

  if (path === "sehir-gezilecek-yerler") {
    return <CityPlacesPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/city/:cityName" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};


export default App;
