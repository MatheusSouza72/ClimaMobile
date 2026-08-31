import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
});

export const getWeather = async () => {
  try {
    // Pega a chave .env
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    
    const response = await api.get(`/weather?key=${apiKey}&city_name=Recife,PE`);
    return response.data.results;
  } catch (error) {
    console.log("Erro na requisição da API:", error);
    return null;
  }
};