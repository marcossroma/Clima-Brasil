import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import TemperatureChart from './components/TemperatureChart';
import MapDisplay from './components/MapDisplay';
import CapitalsPage from './components/CapitalsPage';
import './App.css';
import axios from 'axios';
import useUnsplash from './hooks/useUnsplash';

const App = () => {
  const { imageUrl, fetchCityImage, clearImage } = useUnsplash();
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [lat, setLat] = useState(null); // Adicionei o estado para latitude
  const [lon, setLon] = useState(null); // Adicionei o estado para longitude
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);

  const handleWeatherSubmit = async (estado, cidade) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cidade},${estado},Brazil`);
      const forecastResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cidade},${estado},Brazil&days=7`);

      updateWeatherData(weatherResponse.data, forecastResponse.data, cidade, estado);
      fetchCityImage(cidade); // Chama a função para buscar a imagem

      setInfoVisible(true);
    } catch (error) {
      setError("Erro ao buscar dados do clima");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherData = (weatherData, forecastData, cidade, estado) => {
    const { lat, lon } = weatherData.location; // Extraindo lat e lon corretamente

    setWeatherData({
      city: cidade,
      state: estado,
      temp: weatherData.current.temp_c,
      max: forecastData.forecast.forecastday[0].day.maxtemp_c,
      min: forecastData.forecast.forecastday[0].day.mintemp_c,
      humidity: weatherData.current.humidity,
      precipitation: weatherData.current.precip_mm,
      clouds: weatherData.current.cloud,
      uvIndex: weatherData.current.uv,
      sunrise: forecastData.forecast.forecastday[0].astro.sunrise,
      sunset: forecastData.forecast.forecastday[0].astro.sunset,
      windSpeed: weatherData.current.wind_kph,
    });

    const formattedForecast = forecastData.forecast.forecastday.map(day => ({
      date: day.date,
      temp_max: day.day.maxtemp_c,
      temp_min: day.day.mintemp_c,
    }));
    setForecast(formattedForecast);

    setLat(lat); // Define a latitude
    setLon(lon); // Define a longitude
  };

  const clearWeatherData = () => {
    setWeatherData(null);
    setForecast([]);
    clearImage(); // Limpa a imagem ao limpar a pesquisa
    setLat(null); // Limpa a latitude
    setLon(null); // Limpa a longitude
    setInfoVisible(false);
  };

  return (
    <Router>
      <div
        className="app-background"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Coloca a imagem atrás do conteúdo
        }}
      />
      <div className="app-container">
        <h1>Previsão do Tempo no Brasil</h1>
        <WeatherForm onSubmit={handleWeatherSubmit} />

        {loading && <div>Carregando...</div>}
        {error && <div className="error-message">{error}</div>}

        {weatherData && (
          <>
            <WeatherDisplay weatherData={weatherData} onClear={clearWeatherData} />
            {lat && lon && (
              <MapDisplay lat={lat} lon={lon} city={weatherData.city} />
            )}
            <TemperatureChart forecast={forecast} />
          </>
        )}

        <Link to="/capitais" className="link-button">
          <button>Ver Lista de Capitais</button>
        </Link>

        <Routes>
          <Route path="/" />
          <Route path="/capitais" element={<CapitalsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
