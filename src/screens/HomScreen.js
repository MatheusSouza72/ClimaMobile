import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Importando das pastas exatamente como aparecem na sua imagem:
import { getWeather } from '../service/api';
import { getWeatherIcon } from '../utils/getWeatherIcons';
import HourlyForecast from '../components/HourlyForecast';
import NextForecast from '../components/NextForecast';

export default function HomeScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [currentCity, setCurrentCity] = useState('Recife,PE');

  async function fetchWeatherData(city) {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchWeatherData(currentCity);
  }, [currentCity]);

  const handleSearch = () => {
    if (searchCity.trim() !== '') {
      setLoading(true);
      setCurrentCity(searchCity);
      setSearchCity('');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData(currentCity);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar cidade..."
          placeholderTextColor="#888"
          value={searchCity}
          onChangeText={setSearchCity}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
        }
      >
        {/* Bloco Principal do Clima */}
        <View style={styles.header}>
          <Text style={styles.city}>{weather?.city}</Text>
          {getWeatherIcon(weather?.condition_slug, 80, '#FFD700')}
          <Text style={styles.temp}>{weather?.temp}°</Text>
          <Text style={styles.description}>{weather?.description}</Text>
        </View>

        {/* Detalhes de Vento e Umidade */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Ionicons name="location-outline" size={18} color="#AAA" />
            <Text style={styles.detailText}>Vento: {weather?.wind_speedy}</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="water-outline" size={18} color="#AAA" />
            <Text style={styles.detailText}>Umidade: {weather?.humidity}%</Text>
          </View>
        </View>

        {/* Componente para Previsão por Horas */}
        <HourlyForecast />

        {/* Componente para Próximos Dias */}
        <NextForecast forecast={weather?.forecast} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B26', paddingHorizontal: 20, paddingTop: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1B26' },
  searchContainer: { flexDirection: 'row', marginBottom: 15, marginTop: 10 },
  input: {
    flex: 1,
    backgroundColor: '#2A2634',
    color: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  header: { alignItems: 'center', marginVertical: 15 },
  city: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  temp: { color: '#FFF', fontSize: 64, fontWeight: '300' },
  description: { color: '#AAA', fontSize: 16 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  detailCard: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  detailText: { color: '#DDD', fontSize: 14 },
});