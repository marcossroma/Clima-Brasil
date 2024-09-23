import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CapitalsList.css';

const capitals = [
  { name: 'Lisboa', country: 'Portugal' },
  { name: 'Madrid', country: 'Espanha' },
  { name: 'Buenos Aires', country: 'Argentina' },
  { name: 'Paris', country: 'França' },
  { name: 'Londres', country: 'Reino Unido' },
  { name: 'Berlim', country: 'Alemanha' },
  { name: 'Roma', country: 'Itália' },
  { name: 'Washington D.C.', country: 'EUA' },
  { name: 'Tóquio', country: 'Japão' },
  { name: 'Canberra', country: 'Austrália' },
];

const CapitalsList = () => {
  const [capitalsData, setCapitalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCapitals = async () => {
    try {
      const capitalDataPromises = capitals.map(async (capital) => {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${capital.name}`
        );
        const { current } = response.data;
        return {
          name: capital.name,
          country: capital.country,
          tempC: current.temp_c,
          tempF: (current.temp_c * 9 / 5) + 32,
        };
      });

      const results = await Promise.all(capitalDataPromises);
      setCapitalsData(results);
    } catch (error) {
      setError("Erro ao buscar capitais");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapitals();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className="capitals-list">
        {capitalsData.map((capital, index) => (
          <li key={index}>
            {capital.name} ({capital.country}): {capital.tempC} °C / {capital.tempF.toFixed(1)} °F
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CapitalsList;
