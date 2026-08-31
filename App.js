import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { getWeather } from './src/service/api';
import HourlyForecast from './src/components/HourlyForecast';
import NextForecast from './src/components/NextForecast';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();
      console.log("Dados salvos no state:", data); // Ajuda a ver no terminal se os dados chegaram
      if (data) {
        setWeatherData(data);
      }
    };

    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Topo com a cidade */}
        <View style={styles.header}>
          <Text style={styles.locationText}>
            📍 {weatherData ? weatherData.city : 'Carregando cidade...'}
          </Text>
        </View>

        {/* Temperatura principal */}
        <View style={styles.currentWeatherContainer}>
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
          <Text style={styles.metricText}>⬇ {weatherData ? `${weatherData.rain} mm` : '-- mm'}</Text>
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
  },
  header: {
    marginBottom: 20,
  },
  locationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginVertical: 30,
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