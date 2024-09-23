import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro dos componentes de gráficos do Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Componente de gráfico de linha para exibir previsão de temperatura
const TemperatureChart = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <p>Não há dados suficientes para exibir o gráfico.</p>;
  }

  const labels = forecast.map(day => day.date); // Datas da previsão
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperatura Máxima (°C)',
        data: forecast.map(day => day.temp_max),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Temperatura Mínima (°C)',
        data: forecast.map(day => day.temp_min),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h2>Previsão de Temperatura</h2>
      <Line data={data} /> {/* Renderização do gráfico */}
    </div>
  );
};

export default TemperatureChart;
