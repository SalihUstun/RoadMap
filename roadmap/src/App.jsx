// App.jsx
import React from "react";
import HomePage from "./Pages/HomePage";
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

  return <SearchPage cityName={path} />;
};


export default App;
