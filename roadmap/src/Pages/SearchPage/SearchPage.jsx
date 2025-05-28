import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import "./SearchPage.css";

const GEOAPIFY_API_KEY = "3a43c7b5608544c7936fbcca29744dd3";


const SearchPage = () => {
  const { cityName } = useParams();
  const [cityInfo, setCityInfo] = useState(null);
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (cityName) {
      fetchData(cityName);
    }
  }, [cityName]);

  const fetchWikipediaInfo = async (title) => {
    try {
      const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        title
      )}`;
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

  const fetchCoordinates = async (cityName) => {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      cityName
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



  const fetchPlaces = async (lat, lon) => {
    const categories = ["tourism.attraction", "entertainment.museum", "leisure.park"];
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
      const [info, coordinates] = await Promise.all([
        fetchWikipediaInfo(city),
        fetchCoordinates(city),
      ]);
      setCityInfo(info);


      const geoPlaces = await fetchPlaces(coordinates.lat, coordinates.lon);
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
        <div className="row featurette mb-5 mt-5 px-5">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
              <hr />
            </h2>
            <p className="lead">{cityInfo.description}</p>

            
          </div>

          <div className="col-md-5">
            {cityInfo.image ? (
              <img
                src={cityInfo.image}
                alt={cityName}
                className="img-fluid rounded"
              />
            ) : (
              <div className="bg-secondary text-white text-center py-5">
                Görsel bulunamadı.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dinamik Places */}
      {places.map((place, idx) => (
        <div className="row featurette my-5 px-5" key={idx}>
          <div className="col-md-5">
            {place.image ? (
              <img
                src={place.image}
                alt={place.name}
                className="img-fluid rounded"
              />
            ) : (
              <div className="bg-secondary text-white text-center py-5">
                Görsel bulunamadı.
              </div>
            )}
          </div>
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              {place.name}
              <hr />
            </h2>
            <p className="lead">{place.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchPage;
