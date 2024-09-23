import { useState } from 'react';
import axios from 'axios';

const useUnsplash = () => {
  const [imageUrl, setImageUrl] = useState('');

  const fetchCityImage = async (estado, cidade) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: `${estado}`, // Inclui estado e cidade na query
          client_id: 'dz1x2zXDQM53jdFkF8YWP9crAuOVIwc8Xrg_caM20aM',
          orientation: 'landscape',
          per_page: 4,
        },
      });

      // Filtra imagens para evitar aquelas com pessoas ou itens visíveis
      const filteredImages = response.data.results.filter(image => {
        return !image.description?.toLowerCase().includes('person') &&
               !image.alt_description?.toLowerCase().includes('person') &&
               !image.description?.toLowerCase().includes('people') &&
               !image.alt_description?.toLowerCase().includes('people');
      });

      // Seleciona uma imagem aleatória do conjunto filtrado
      if (filteredImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredImages.length);
        setImageUrl(filteredImages[randomIndex].urls.full);
      } else {
        setImageUrl(response.data.results[0]?.urls.full); // Fallback para qualquer imagem
      }
    } catch (error) {
      console.error("Erro ao buscar imagem:", error);
    }
  };

  const clearImage = () => {
    setImageUrl('');
  };

  return { imageUrl, fetchCityImage, clearImage };
};

export default useUnsplash;
