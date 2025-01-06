# Clima e Imagens de Cidades 🌤️🌆

Este projeto permite ao usuário consultar o clima de uma cidade e visualizar uma imagem correspondente ao estado/cidade, utilizando as APIs **OpenWeather** para dados climáticos e **Unsplash** para exibição de imagens.

## Funcionalidades

- **Consulta em tempo real** de informações climáticas.
- **Exibição de imagens** representativas da cidade ou estado usando a API do Unsplash.
- **Interface responsiva** desenvolvida em React.
- **Gráficos** para visualização das informações climáticas (utilizando **chart.js**).

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão >= 14.x)
- **npm** ou **yarn**

## Instalação   

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/marcossroma/Clima-Brasil.git
   cd Clima-Brasil

2. **Instale as dependências**:

    Usando npm: npm install
    Usando yarn: yarn install

2. **Configuração das APIs**:

    Crie um arquivo .env na raiz do projeto e adicione suas chaves de API:

        REACT_APP_OPENWEATHER_API_KEY=SUA_CHAVE_DA_API_OPENWEATHER
        REACT_APP_UNSPLASH_ACCESS_KEY=SUA_CHAVE_DA_API_UNSPLASH
    
    Substitua SUA_CHAVE_DA_API_OPENWEATHER e SUA_CHAVE_DA_API_UNSPLASH pelas suas chaves das respectivas APIs

## Como Usar

Iniciar o servidor de desenvolvimento:

Após a instalação das dependências e configuração das APIs, você pode iniciar o servidor de desenvolvimento:

Usando npm:

Copiar código
npm start
Ou usando yarn:

Copiar código
yarn start
Buscar clima e imagem de uma cidade:

Digite o nome de uma cidade no campo de busca.
O sistema irá mostrar as condições climáticas da cidade e exibir uma imagem representativa.

## Principais Dependências

    Axios: Para fazer requisições HTTP.
    leaflet: Para exibir mapas e coordenadas geográficas.
    chart.js e react-chartjs-2: Para visualização de dados climáticos em gráficos.
    react-leaflet: Integração entre Leaflet e React.
    OpenWeather API: Para informações climáticas.
    Unsplash API: Para buscar imagens das cidades/estados.
