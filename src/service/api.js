import axios from 'axios';

// Busca a chave do .env; se não encontrar ou for undefined, usa a chave de reserva
const API_KEY = process.env.EXPO_PUBLIC_API_KEY || '';

export const getWeather = async (cityName = 'Recife,PE') => {
  try {
    const formattedCity = cityName.trim();

    // Log para depuração no terminal
    console.log("Minha API_KEY usada:", API_KEY);
    console.log("Buscando clima para:", formattedCity);

    const response = await axios.get(
      `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${encodeURIComponent(formattedCity)}`
    );

    if (response.data && response.data.results) {
      return response.data.results;
    }
    
    return null;
  } catch (error) {
    console.error('Erro na requisição da API:', error.response ? error.response.status : error.message);
    return null;
  }
};
