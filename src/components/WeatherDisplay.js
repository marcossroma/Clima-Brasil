import React from 'react';
import './WeatherDisplay.css'; // Importando o arquivo CSS

// Função auxiliar para converter velocidade do vento para a escala Beaufort
const BeaufortScale = (windSpeed) => {
  if (windSpeed < 1) return "Calmo";
  if (windSpeed < 6) return "Brisa leve";
  if (windSpeed < 12) return "Brisa moderada";
  if (windSpeed < 20) return "Brisa forte";
  if (windSpeed < 29) return "Vento fresco";
  if (windSpeed < 39) return "Vento forte";
  if (windSpeed < 50) return "Tempestade";
  return "Furacão";
};

// Componente que exibe informações detalhadas do clima
const WeatherDisplay = ({ weatherData, onClear }) => {
  if (!weatherData) return null;

  const windAlert = BeaufortScale(weatherData.windSpeed);

  return (
    <div className="weather-container">
      <h2 className="weather-title">{weatherData.city}, {weatherData.state}</h2>
      <div className="weather-info">
        <p><strong>Temperatura:</strong> {weatherData.temp} °C</p>
        <p><strong>Máxima:</strong> {weatherData.max} °C</p>
        <p><strong>Mínima:</strong> {weatherData.min} °C</p>
        <p><strong>Umidade:</strong> {weatherData.humidity}%</p>
        <p><strong>Precipitação:</strong> {weatherData.precipitation} mm</p>
        <p><strong>Nuvens:</strong> {weatherData.clouds}%</p>
        <p><strong>Índice UV:</strong> {weatherData.uvIndex}</p>
        <p><strong>Nascer do Sol:</strong> {weatherData.sunrise}</p>
        <p><strong>Pôr do Sol:</strong> {weatherData.sunset}</p>
        <p><strong>Velocidade do Vento:</strong> {weatherData.windSpeed} km/h</p>
        <p><strong>Alerta de Vento:</strong> {windAlert}</p>
      </div>
      <button onClick={onClear}>Limpar Pesquisa</button>
    </div>
  );
};

export default WeatherDisplay;
