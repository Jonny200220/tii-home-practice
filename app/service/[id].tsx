import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function ServiceDetailScreen() {
  const router = useRouter();
const { title, color } = useLocalSearchParams();
  
  // --- ESTADOS ---
  const [currentStep, setCurrentStep] = useState(1); // Controlamos en qué paso estamos (1 o 2)
  const [selectedOption, setSelectedOption] = useState<number | null>(0);
  const [customDescription, setCustomDescription] = useState('');

  // Datos de las opciones (Paso 1)
  const options = [
    "Se rompió mi tubería.",
    "Tengo una fuga de agua",
    "El drenaje está tapado",
    "Describe el problema"
    
  ];

  // --- LÓGICA DE NAVEGACIÓN ENTRE PASOS ---
  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2); // Avanzar al paso de la foto
    } else {
      // Aquí iría la lógica final o siguiente paso
      Alert.alert("Proceso", "Aquí iríamos al paso 3 o finalizaríamos");
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1); // Volver al paso del problema
    } else {
      router.back(); // Si estamos en el paso 1, volvemos al Home
    }
  };

  // --- RENDERIZADO DEL CONTENIDO SEGÚN EL PASO ---
  const renderStepContent = () => {
    if (currentStep === 1) {
      // --- PASO 1: SELECCIÓN DEL PROBLEMA ---
      return (
        <>
          <Text style={styles.questionTitle}>¿Que problema tienes?</Text>
          <Text style={styles.questionSubtitle}>Nos ayudan a comprender el problema</Text>
          
          <View style={styles.optionsContainer}>
              {options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  return (
                      <TouchableOpacity 
                          key={index} 
                          style={[
                              styles.optionButton, 
                              isSelected ? styles.optionSelected : styles.optionUnselected
                          ]}
                          onPress={() => setSelectedOption(index)}
                      >
                          <Text style={[
                              styles.optionText, 
                              isSelected ? styles.textSelected : styles.textUnselected
                          ]}>
                              {option}
                          </Text>
                          {!isSelected && (
                              <Ionicons name="chevron-forward" size={20} color="#CCC" />
                          )}
                      </TouchableOpacity>
                  );
              })}

              {selectedOption === 3 && (
                <View style={styles.textAreaContainer}>
                    <Text style={styles.label}>Cuéntanos más detalles:</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Ej: La tubería gotea mucho cuando abro la llave..."
                        placeholderTextColor="#999"
                        value={customDescription}
                        onChangeText={setCustomDescription}
                    />
                </View>
              )}
          </View>
        </>
      );
    } 
    else if (currentStep === 2) {
      // --- PASO 2: FOTO DEL PROBLEMA ---
      return (
        <>
          <Text style={styles.questionTitle}>Foto del problema.</Text>
          <Text style={styles.questionSubtitle}>Nos ayudan a comprender el problema</Text>

          <Text style={styles.label}>Añadir una foto (opcional)</Text>
          
          <TouchableOpacity style={styles.uploadBox} onPress={() => Alert.alert("Cámara", "Aquí abriremos la cámara")}>
              <Ionicons name="camera-outline" size={40} color="#666" style={{ marginBottom: 10 }} />
              <Text style={styles.uploadText}>Toque para añadir foto</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. Abrimos el Escudo contra el teclado */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
          {/* 2. Abrimos el Scroll */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Header (Tarjeta del servicio) */}
            <View style={styles.headerCard}>
                <View style={[styles.iconBox, { backgroundColor: color as string }]}>
                    <Ionicons name="water-outline" size={32} color="white" />
                </View>
                <View>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.headerSubtitle}>Servicios de emergencia en el hogar</Text>
                </View>
            </View>

            {/* Contenedor del Formulario */}
            <View style={styles.formContainer}>
                {/* Link de Regresar */}
                <TouchableOpacity onPress={handleBack} style={styles.backLink}>
                    <Ionicons name="chevron-back" size={18} color="#888" />
                    <Text style={styles.backText}>Regresar al inicio</Text>
                </TouchableOpacity>

                {/* Barra de Progreso */}
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressSegment, styles.activeSegment]} />
                    <View style={[styles.progressSegment, currentStep >= 2 && styles.activeSegment]} />
                    <View style={[styles.progressSegment, currentStep >= 3 && styles.activeSegment]} />
                </View>

                {/* Contenido Dinámico (Paso 1 o 2) */}
                <View style={{ minHeight: 300 }}>
                    {renderStepContent()}
                </View>

                {/* Footer de Botones */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btnSecondary} onPress={handleBack}>
                        <Text style={styles.btnTextSecondary}>Atras</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.btnPrimary} onPress={handleContinue}>
                        <Text style={styles.btnTextPrimary}>Continuar</Text>
                    </TouchableOpacity>
                </View>

            </View>
          </ScrollView>
          {/* Cerramos el Scroll */}

      </KeyboardAvoidingView>
      {/* Cerramos el Escudo */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    minHeight: 550, // Altura mínima para que se vea bien
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 5,
  },
  // Barra de progreso
  progressBarContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressSegment: {
    height: 4,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 2,
  },
  activeSegment: {
    backgroundColor: '#1A1A1A', // Negro para activo
  },
  // Textos Generales
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  questionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
  },
  // Estilos Paso 1 (Opciones)
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  optionUnselected: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
  },
  optionSelected: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1A1A1A',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
  },
  textUnselected: {
    color: '#1A1A1A',
  },
  textSelected: {
    color: 'white',
  },
  // Estilos Paso 2 (Foto)
  label: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 15,
      color: '#333'
  },
  uploadBox: {
      borderWidth: 2,
      borderColor: '#CCC',
      borderStyle: 'dashed', // Borde punteado como en la imagen
      borderRadius: 12,
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAFAFA',
      marginBottom: 20,
  },
  uploadText: {
      color: '#666',
      fontSize: 14,
  },
  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto', 
    paddingTop: 20,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
    marginLeft: 10,
    alignItems: 'center',
  },
  btnTextSecondary: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  btnTextPrimary: {
    color: 'white',
    fontWeight: '600',
  },

textAreaContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    height: 100, // Altura fija para que parezca un cuadro grande
    textAlignVertical: 'top', // Importante: para que lo que escribas empiece arriba
    fontSize: 14,
    color: '#333',
  },
    
});