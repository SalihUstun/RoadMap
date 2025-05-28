import React, { useState } from "react";
import axios from "axios";

const GEOAPIFY_API_KEY = "3a43c7b5608544c7936fbcca29744dd3"; 
const OPENWEATHER_API_KEY = 'bb838b8c4bd92557d2380fb405cb5d2a';  

const CityPlacesPage = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [weather, setWeather] = useState(null); 
  const [loading, setLoading] = useState(false);

  const fetchCoordinates = async (cityName) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      cityName
    )}&apiKey=${GEOAPIFY_API_KEY}`;
    const sehir = encodeURIComponent(cityName);
    const res = await axios.get(url);
    const result = res.data.features[0];
    if (result) {
      return {
        lat: result.properties.lat,
        lon: result.properties.lon,
      };
    }
    throw new Error("Koordinatlar bulunamadı.");
  };

  const fetchGeoapifyPlaces = async (lat, lon) => {
    const categories = ["tourism.attraction", "entertainment.museum", "leisure.park"];
    const url = `https://api.geoapify.com/v2/places?categories=${categories.join(
      ","
    )}&filter=circle:${lon},${lat},50000&limit=10&apiKey=${GEOAPIFY_API_KEY}`;

    const res = await axios.get(url);
    return res.data.features.map((place) => ({
      name: place.properties.name,
      lat: place.properties.lat,
      lon: place.properties.lon,
    }));
  };

  const fetchWikipediaInfo = async (title) => {
    const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      title
    )}`;
    try {
      const res = await axios.get(url);
      return {
        description: res.data.extract,
        image: res.data.thumbnail?.source || null,
      };
    } catch {
      return {
        description: "Açıklama bulunamadı.",
        image: null,
      };
    }
  };

  const fetchCityInfo = async (cityName) => {
    return await fetchWikipediaInfo(cityName);
  };

  // Yeni: Hava durumu API çağrısı
  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=bb838b8c4bd92557d2380fb405cb5d2a&units=metric&lang=tr`;
    
    const res = await axios.get(url);
    return {
      temp: res.data.main.temp,
      description: res.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
    };
  };
  
  const handleSearch = async () => {
    try {
      setLoading(true);
      setPlaces([]);
      setWeather(null);
      const coordinates = await fetchCoordinates(city);
      const geoPlaces = await fetchGeoapifyPlaces(coordinates.lat, coordinates.lon);
      const cityDescription = await fetchCityInfo(city);
      const weatherData = await fetchWeather(coordinates.lat, coordinates.lon);

      const enrichedPlaces = await Promise.all(
        geoPlaces.map(async (place) => {
          const wikiInfo = await fetchWikipediaInfo(place.name);
          return {
            ...place,
            ...wikiInfo,
          };
        })
      );

      setCityInfo(cityDescription);
      setPlaces(enrichedPlaces);
      setWeather(weatherData);  
    } catch (error) {
      alert("Veriler alınamadı. Lütfen geçerli bir şehir adı giriniz.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Şehir Gezilecek Yerler</h1>

      <div className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Şehir adı giriniz"
          className="border border-gray-400 px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ara
        </button>
      </div>

      {loading && <p className="text-center">Yükleniyor...</p>}

      {cityInfo && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{city}</h2>
          <p>{cityInfo.description}</p>

          {/* Yeni: Hava durumu gösterimi */}
          {weather && (
            <div className="mt-4 flex items-center gap-4">
              <img src={weather.icon} alt={weather.description} />
              <div>
                <p className="font-semibold">{weather.temp} °C</p>
                <p className="capitalize">{weather.description}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold mb-2 text-center">{place.name}</h3>
            {place.image && (
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            )}
            <p className="text-sm text-gray-700">{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityPlacesPage;
