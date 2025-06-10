import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import "./SearchPage.css";
import defaultImage from "../../assets/default.jpg";
import CityMap from "../../Components/CityMap/CityMap";

const GEOAPIFY_API_KEY = "3a43c7b5608544c7936fbcca29744dd3";
const OPENWEATHERMAP_API_KEY = "bb838b8c4bd92557d2380fb405cb5d2a";

const SearchPage = () => {
  const { cityName } = useParams();
  const [cityInfo, setCityInfo] = useState(null);
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  useEffect(() => {
    if (cityName) {
      fetchData(cityName);
    }
  }, [cityName]);

  const fetchWikipediaInfo = async (title) => {
    try {
      const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
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

  const fetchCoordinates = async (city) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      city
    )}&apiKey=${GEOAPIFY_API_KEY}`;
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

  const fetchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=tr`;
      const res = await axios.get(url);
      const data = res.data;
      setWeather({
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      console.error("Hava durumu alınamadı:", error);
      setWeather(null);
    }
  };

  const fetchPlaces = async (lat, lon) => {
    const categories = [
      "tourism.attraction",
      "entertainment.museum",
      "leisure.park",
    ];
    const url = `https://api.geoapify.com/v2/places?categories=${categories.join(
      ","
    )}&filter=circle:${lon},${lat},50000&limit=5&apiKey=${GEOAPIFY_API_KEY}`;
    const res = await axios.get(url);
    return res.data.features.map((place) => ({
      name: place.properties.name,
      lat: place.properties.lat,
      lon: place.properties.lon,
    }));
  };

  const fetchData = async (city) => {
    try {
      const [info, coords] = await Promise.all([
        fetchWikipediaInfo(city),
        fetchCoordinates(city),
      ]);
      setCityInfo(info);
      setCoordinates(coords);
      await fetchWeather(city);

      const geoPlaces = await fetchPlaces(coords.lat, coords.lon);
      const enrichedPlaces = await Promise.all(
        geoPlaces.map(async (place) => {
          const wiki = await fetchWikipediaInfo(place.name);
          return { ...place, ...wiki };
        })
      );

      setPlaces(enrichedPlaces);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  return (
    <>
      <Navbar />

      {cityInfo && (
        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-7 mb-4 mb-md-0">
              <h2 className="fw-bold">
                {capitalize(cityName)}
                <hr />
              </h2>
              <p className="lead">{cityInfo.description}</p>
              {weather && (
                <div className="weather-box d-flex align-items-center">
                  <img
                    src={weather.icon}
                    alt={weather.description}
                    style={{ width: 60, height: 60 }}
                  />
                  <div className="ms-3">
                    <p className="mb-0">
                      <strong>Sıcaklık:</strong> {weather.temp}°C
                    </p>
                    <p className="mb-0">
                      <strong>Nem:</strong> {weather.humidity}%
                    </p>
                    <p className="mb-0 text-capitalize">{weather.description}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-5 text-center">
              <img
                src={cityInfo.image || defaultImage}
                alt={capitalize(cityName)}
                className="fixed-img-size"
                onError={(e) => (e.currentTarget.src = defaultImage)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {places
          .filter(
            (place) =>
              place.description !== "Açıklama bulunamadı." || place.image !== null
          )
          .map((place, idx) => (
            <div className="row align-items-center my-5" key={idx}>
              <div className="col-md-5 text-center mb-3 mb-md-0">
                <img
                  src={place.image || defaultImage}
                  alt={place.name}
                  className="fixed-img-size"
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                />
              </div>
              <div className="col-md-7">
                <h3 className="fw-bold">{place.name}</h3>
                <hr />
                <p className="lead">{place.description}</p>
              </div>
            </div>
          ))}

        {coordinates && (
          <div className="container my-5">
            <div className="map-frame">
              <h3 className="text-center mb-3">{capitalize(cityName)} Haritası</h3>
              <CityMap
                lat={coordinates.lat}
                lon={coordinates.lon}
                city={capitalize(cityName)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
