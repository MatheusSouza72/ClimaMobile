import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getWeather = async (cityName = 'Recife,PE') => {
  try {
    const response = await axios.get(
      `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${encodeURIComponent(cityName)}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Erro na API:', error);
    return null;
  }
};