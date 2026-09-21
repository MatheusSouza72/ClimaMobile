import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NextForecast({ data }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Proxima Previsão 📅</Text>{/* Traduzido para Português */}
      
      {data && data.map((item, index) => (
        <View key={index} style={styles.forecastRow}>
          <Text style={styles.dayText}>{item.weekday}</Text>
          <View style={styles.tempContainer}>
            <Text style={styles.tempMax}>{item.max}º</Text>
            <Text style={styles.tempMin}>{item.min}º</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayText: {
    color: '#fff',
    fontSize: 15,
  },
  tempContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  tempMax: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tempMin: {
    color: '#d0d0d0',
    fontSize: 15,
  },
});