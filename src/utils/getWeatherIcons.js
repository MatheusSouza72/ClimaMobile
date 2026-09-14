import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const iconMap = {
  storm: 'thunderstorm-outline',
  snow: 'snow-outline',
  hail: 'snow-outline',
  rain: 'rainy-outline',
  fog: 'cloudy-night-outline',
  clear_day: 'sunny-outline',
  clear_night: 'moon-outline',
  cloud: 'cloud-outline',
  cloudly_day: 'partly-sunny-outline',
  cloudly_night: 'cloudy-night-outline',
  none_day: 'sunny-outline',
  none_night: 'moon-outline',
};

export function getWeatherIcon(slug, size = 28, color = '#FFF') {
  const iconName = iconMap[slug] || 'cloud-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
}