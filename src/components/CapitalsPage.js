import React from 'react';
import { Link } from 'react-router-dom';
import CapitalsList from './CapitalsList';

const CapitalsPage = () => {
  return (
    <div>
      <h2>Lista de Capitais</h2>
      <CapitalsList />

      {/* Botão para voltar à tela inicial */}
      <Link to="/">
        <button className="circle-button">✖</button>
      </Link>
    </div>
  );
};

export default CapitalsPage;
