import { useState } from 'react';
import axios from 'axios';

const useWeatherApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (estado, cidade) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cidade},${estado},Brazil`);
      const forecastResponse = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cidade},${estado},Brazil&days=7`);

      return {
        weatherData: {
          city: cidade,
          state: estado,
          temp: weatherResponse.data.current.temp_c,
          max: forecastResponse.data.forecast.forecastday[0].day.maxtemp_c,
          min: forecastResponse.data.forecast.forecastday[0].day.mintemp_c,
          humidity: weatherResponse.data.current.humidity,
          precipitation: weatherResponse.data.current.precip_mm,
          clouds: weatherResponse.data.current.cloud,
          uvIndex: weatherResponse.data.current.uv,
          sunrise: forecastResponse.data.forecast.forecastday[0].astro.sunrise,
          sunset: forecastResponse.data.forecast.forecastday[0].astro.sunset,
          windSpeed: weatherResponse.data.current.wind_kph,
        },
        forecastData: forecastResponse.data.forecast.forecastday.map(day => ({
          date: day.date,
          temp_max: day.day.maxtemp_c,
          temp_min: day.day.mintemp_c,
        })),
      };
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchWeatherData, loading, error };
};

export default useWeatherApi;
