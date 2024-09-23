import React, { useState } from 'react';
import './WeatherForm.css'; 

// Dicionário completo de estados e cidades do Brasil
const estadosECidades = {
  'Acre': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
  'Alagoas': ['Maceio', 'Arapiraca', 'Palmeira dos Indios'],
  'Amapá': ['Macapa', 'Santana', 'Laranjal do Jari'],
  'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara'],
  'Bahia': ['Salvador', 'Feira de Santana', 'Vitoria da Conquista'],
  'Ceará': ['Fortaleza', 'Juazeiro do Norte', 'Sobral'],
  'Distrito Federal': ['Brasilia'],
  'Espírito Santo': ['Vitoria', 'Vila Velha', 'Serra'],
  'Goiás': ['Goiania', 'Aparecida de Goiania', 'Anapolis'],
  'Maranhao': ['Sao Luis', 'Imperatriz', 'Caxias'],
  'Mato Grosso': ['Cuiaba', 'Rondonopolis', 'Barra de Bugres'],
  'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Tres Lagoas'],
  'Minas Gerais': ['Belo Horizonte', 'Uberlandia', 'Contagem'],
  'Pará': ['Belem', 'Ananindeua', 'Castanhal'],
  'Paraíba': ['Joao Pessoa', 'Campina Grande', 'Santa Rita'],
  'Paraná': ['Maringa', 'Curitiba', 'Campo Mourao'],
  'Pernambuco': ['Recife', 'Olinda', 'Jaboatao dos Guararapes'],
  'Piauí': ['Teresina', 'Parnaiba', 'Picos'],
  'Rio de Janeiro': ['Rio de Janeiro', 'Niteroi', 'Sao Goncalo'],
  'Rio Grande do Norte': ['Natal', 'Mossoro', 'Parnamirim'],
  'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
  'Rondônia': ['Porto Velho', 'Ji-Parana', 'Ariquemes'],
  'Roraima': ['Boa Vista', 'Rorainopolis', 'Caracaraí'],
  'Santa Catarina': ['Florianopolis', 'Joinville', 'Blumenau'],
  'São Paulo': ['Sao Paulo', 'Campinas', 'Santos'],
  'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
  'Tocantins': ['Palmas', 'Araguaina', 'Gurupi']
};

const WeatherForm = ({ onSubmit }) => {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const cidadesDoEstado = estadosECidades[estado];

    // Valida se o estado e a cidade selecionados são válidos
    if (!cidadesDoEstado) {
      setErro('Estado inválido. Selecione um estado válido.');
      setLoading(false);
      return;
    }

    if (!cidadesDoEstado.includes(cidade)) {
      setErro(`A cidade ${cidade} não pertence ao estado selecionado (${estado}).`);
      setLoading(false);
      return;
    }

    setErro('');
    await onSubmit(estado, cidade); // Chama a função de submissão
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="estado">Selecione o Estado</label>
        <select id="estado" value={estado} onChange={(e) => {
          setEstado(e.target.value);
          setCidade('');
        }} required>
          <option value=""> - </option>
          {Object.keys(estadosECidades).map((nomeEstado) => (
            <option key={nomeEstado} value={nomeEstado}>{nomeEstado}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cidade">Selecione a Cidade</label>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {estado && estadosECidades[estado].map((nomeCidade) => (
            <li key={nomeCidade} onClick={() => {
              setCidade(nomeCidade);
              setErro('');
            }} style={{ cursor: 'pointer', color: cidade === nomeCidade ? 'blue' : 'black' }}>
              {nomeCidade}
            </li>
          ))}
        </ul>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button type="submit" disabled={!cidade || loading}>
        {loading ? 'Buscando...' : 'Buscar Previsão'}
      </button>
    </form>
  );
};

export default WeatherForm;
