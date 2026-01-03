import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatsCardProps {
    title: string;
    value: string;
    iconName: any;
    iconColor: string;
}

export const StatsCard = ({ title, value, iconName, iconColor }: StatsCardProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
      <View>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row', // Icono al lado del texto
    alignItems: 'center',
    width: '48%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 10,
    color: '#A0A0A0',
    fontWeight: '600',
    marginBottom: 2
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});