// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CityPlacesPage from "./Pages/asd/CityPlacesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/city/:cityName" element={<SearchPage />} />
      <Route path="/sehir-gezilecek-yerler" element={<CityPlacesPage />} />
    </Routes>
  );
};

export default App;
