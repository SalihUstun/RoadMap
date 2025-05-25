// App.jsx
import React from "react";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage/SearchPage";

const App = () => {
  // URL path'ini al, başındaki '/' kaldır
  const path = window.location.pathname.slice(1).toLowerCase();

  // Eğer path boşsa ana sayfa
  if (!path) {
    return <HomePage />;
  }

  return <SearchPage cityName={path} />;
};

export default App;
