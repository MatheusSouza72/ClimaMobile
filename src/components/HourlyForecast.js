import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function HourlyForecast({ forecast }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>Hoje</Text>{/* Traduzido para Português */}
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecast && forecast.map((item, index) => (
          <View key={index} style={styles.hourItem}>
            <Text style={styles.text}>{item.max}º / {item.min}º</Text>
            <Text style={styles.subText}>{item.weekday || item.date}</Text>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 10,
  },
  hourItem: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    color: '#d0d0d0',
    fontSize: 12,
    marginTop: 5,
  },
});