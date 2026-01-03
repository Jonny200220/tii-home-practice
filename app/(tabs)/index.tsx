import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ServiceCard } from '../../components/ServiceCard';
import { StatsCard } from '../../components/StatsCard';
import { ServiceItem, StatItem } from '../../types/interfaces';
import { useRouter } from 'expo-router';

// --- DATOS FALSOS (MOCK DATA) ---
// Esto es lo que tu equipo de backend te enviará después.
// Por ahora lo simulamos aquí.
const fakeServicesData: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Plomería', 
    subtitle: 'Fugas, Tuberías', 
    iconName: 'water-outline', 
    color: '#3498DB',       
    backgroundColor: '#EBF5FB' 
  },
  { 
    id: '2', 
    title: 'Electricista', 
    subtitle: 'Cortos, Instalación', 
    iconName: 'flash-outline', 
    color: '#F39C12',       
    backgroundColor: '#FEF5E7' 
  },
  { 
    id: '3', 
    title: 'Cerrajería', 
    subtitle: 'Apertura de chapas', 
    iconName: 'key-outline', 
    color: '#7F8C8D',       
    backgroundColor: '#F2F4F4' 
  },
  { 
    id: '4', 
    title: 'Electrodomésticos', 
    subtitle: 'Reparación general', 
    iconName: 'construct-outline', 
    color: '#27AE60',      
    backgroundColor: '#E9F7EF' 
  },
];

const fakeStatsData: StatItem[] = [
    { 
      title: 'Tiempo Resp.', // Abreviación de Tiempo de Respuesta
      value: '8 min', 
      iconName: 'time-outline', 
      iconColor: '#FF5A5F' 
    },
    { 
      title: 'Verificados', 
      value: '2,400+', 
      iconName: 'shield-checkmark-outline', 
      iconColor: '#27AE60' 
    },
];


export default function HomeScreen() {
  const router = useRouter();
  // Estado para saber cuál servicio está seleccionado (simulando el click)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('1'); // Empezamos con Plumbing seleccionado

  // --- HEADER PERSONALIZADO ---
  const CustomHeader = () => (
    <View style={headerStyles.container}>
        <TouchableOpacity>
             <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        
        <View style={headerStyles.rightSide}>
            <TouchableOpacity style={headerStyles.notificationContainer}>
                 <Ionicons name="notifications-outline" size={26} color="#333" />
                 {/* El puntito rojo de notificación */}
                 <View style={headerStyles.badge} />
            </TouchableOpacity>
            
            {/* Avatar con iniciales */}
            <View style={headerStyles.avatar}>
                <Text style={headerStyles.avatarText}>JD</Text>
            </View>
        </View>
    </View>
  );


  return (
    // SafeAreaView asegura que no choquemos con la barra de estado del celular
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {/* 1. Insertamos el Header */}
        <CustomHeader />

        {/* 2. Sección de Saludo */}
        <View style={styles.greetingSection}>
            <Text style={styles.greetingSub}>Buenos días,</Text>
            <Text style={styles.greetingTitle}>¿Qué hay que arreglar?</Text>
        </View>

        {/* 3. Sección de Estadísticas (Stats) */}
        <View style={styles.statsContainer}>
            {fakeStatsData.map((stat, index) => (
                <StatsCard 
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    iconName={stat.iconName}
                    iconColor={stat.iconColor}
                />
            ))}
        </View>

        <View style={styles.gridContainer}>
            {fakeServicesData.map((service) => (
            <ServiceCard
                key={service.id}
                title={service.title}
                subtitle={service.subtitle}
                iconName={service.iconName}
                color={service.color}
                backgroundColor={service.backgroundColor}
                isActive={service.id === selectedServiceId}
                // --- AQUÍ ESTÁ EL CAMBIO ---
                onPress={() => {
                    // 1. Marcamos visualmente la tarjeta
                    setSelectedServiceId(service.id);
                    
                    // 2. Navegamos enviando los datos a la nueva pantalla
                    router.push({
                        pathname: "/service/[id]",
                        params: { 
                            id: service.id, 
                            title: service.title, 
                            color: service.color, 
                            backgroundColor: service.backgroundColor 
                        }
                    });
                }}
            />
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- ESTILOS PRINCIPALES ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FB', // Color de fondo gris claro de la Imagen 2
  },
  container: {
    flex: 1,
  },
  contentContainer: {
      padding: 20,
  },
  greetingSection: {
      marginTop: 20,
      marginBottom: 25,
  },
  greetingSub: {
      fontSize: 16,
      color: '#A0A0A0',
      marginBottom: 5,
  },
  greetingTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#1A1A1A',
  },
  statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los elementos bajen a la siguiente línea
    justifyContent: 'space-between', // Espacio uniforme entre columnas
  },
});

// --- ESTILOS DEL HEADER ---
const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10, // Un poco de espacio arriba
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationContainer: {
        marginRight: 15,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 3,
        width: 8,
        height: 8,
        backgroundColor: '#FF5A5F',
        borderRadius: 4,
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: '#FF7F50', // Color naranja del diseño
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});