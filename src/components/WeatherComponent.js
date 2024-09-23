import React from 'react';
import TemperatureChart from './TemperatureChart';

// Componente para exibir previsões e gráficos de temperatura
const WeatherComponent = ({ forecast }) => {
  const temperatures = forecast.map(day => ({
    date: day.date,
    max: day.temp_max,
    min: day.temp_min,
  }));

  return (
    <div>
      <h2>Previsão de Temperatura</h2>
      <TemperatureChart forecast={temperatures} />
    </div>
  );
};

export default WeatherComponent;
