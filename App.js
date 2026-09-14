import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { getWeather } from './src/service/api';
import { getWeatherIcon } from './src/utils/getWeatherIcons';
import HourlyForecast from './src/components/HourlyForecast';
import NextForecast from './src/components/NextForecast';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [currentCity, setCurrentCity] = useState('Recife,PE');

  // Função que busca os dados da cidade atual
  const fetchWeather = async (cityToFetch) => {
    const data = await getWeather(cityToFetch);
    console.log("Dados salvos no state:", data);
    if (data) {
      setWeatherData(data);
    }
    setRefreshing(false);
  };

  // Dispara toda vez que 'currentCity' muda
  useEffect(() => {
    fetchWeather(currentCity);
  }, [currentCity]);

  // Ação de buscar ao clicar na lupa ou dar Enter
  const handleSearch = () => {
    if (searchCity.trim() !== '') {
      setCurrentCity(searchCity);
      setSearchCity('');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather(currentCity);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        
        {/* Barra de Pesquisa Interativa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cidade (ex: São Paulo)..."
            placeholderTextColor="#88a0c0"
            value={searchCity}
            onChangeText={setSearchCity}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Topo com a cidade */}
        <View style={styles.header}>
          <Text style={styles.locationText}>
            📍 {weatherData ? weatherData.city : 'Carregando cidade...'}
          </Text>
        </View>

        {/* Temperatura principal */}
        <View style={styles.currentWeatherContainer}>
          {weatherData && getWeatherIcon(weatherData.condition_slug, 80, '#FFD700')}
          
          <Text style={styles.temperatureText}>
            {weatherData ? `${weatherData.temp}º` : '--º'}
          </Text>
          <Text style={styles.subText}>
            {weatherData ? weatherData.description : 'Carregando...'}
          </Text>
          <Text style={styles.subText}>
            {weatherData?.forecast ? `Max.: ${weatherData.forecast[0].max}º Min.: ${weatherData.forecast[0].min}º` : 'Max.: --º Min.: --º'}
          </Text>
        </View>

        {/* Informações detalhadas */}
        <View style={styles.metricsContainer}>
          <Text style={styles.metricText}>💧 {weatherData ? `${weatherData.humidity}%` : '--%'}</Text>
          <Text style={styles.metricText}>⬇ {weatherData ? `${weatherData.rain || 0} mm` : '-- mm'}</Text>
          <Text style={styles.metricText}>🌬️ {weatherData ? weatherData.wind_speedy : '--'}</Text>
        </View>

        {/* Previsão do dia */}
        <HourlyForecast forecast={weatherData?.forecast || []} />

        {/* Previsão para os próximos dias */}
        <NextForecast data={weatherData?.forecast ? weatherData.forecast.slice(1) : []} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b2046',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  header: {
    marginBottom: 10,
  },
  locationText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  temperatureText: {
    color: '#fff',
    fontSize: 72,
    fontWeight: 'bold',
  },
  subText: {
    color: '#d0d0d0',
    fontSize: 14,
    marginTop: 5,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  metricText: {
    color: '#fff',
    fontSize: 14,
  },
});