import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  iconName: any;
  color: string;           // Recibimos el color fuerte
  backgroundColor: string; // Recibimos el color suave
  isActive?: boolean;
  onPress: () => void;
}

export const ServiceCard = ({ 
  title, 
  subtitle, 
  iconName, 
  color, 
  backgroundColor, 
  isActive = false, 
  onPress 
}: ServiceCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isActive && styles.activeCard]}
    >
      <View style={styles.contentContainer}>
          {/* El contenedor del icono ahora usa el backgroundColor dinámico */}
          <View style={[styles.iconContainer, { backgroundColor: backgroundColor }]}>
             <Ionicons name={iconName} size={28} color={color} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Flecha roja de selección */}
      {isActive && (
        <View style={styles.activeArrow}>
             <Ionicons name="chevron-forward" size={16} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16, // Reduje un poco el padding para que se vea más compacto
    width: '47%', 
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1.5, // Borde un poquito más grueso
    borderColor: 'transparent',
    position: 'relative',
  },
  activeCard: {
    borderColor: '#FF5A5F', 
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12, // Bordes redondeados del cuadrito del icono
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Espacio entre icono y texto
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
  activeArrow: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5A5F',
    borderRadius: 50,
    padding: 3,
  }
});