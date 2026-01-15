import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ServiceDetailScreen() {
  const router = useRouter();
const { title, color } = useLocalSearchParams();
  
  // --- ESTADOS ---
  const [currentStep, setCurrentStep] = useState(1); // Controlamos en qué paso estamos (1 o 2)
  const [selectedOption, setSelectedOption] = useState<number | null>(0);
  const [customDescription, setCustomDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<number | null>(null);

  // Datos para los botones de urgencia
  const urgencyOptions = [
    { title: "Emergencia lo antes posible", subtitle: "Necesito ayuda ahora mismo", icon: "warning-outline" },
    { title: "Dentro de 2 horas", subtitle: "Puedo esperar un poco", icon: "time-outline" },
    { title: "Programar visita", subtitle: "Seleccionar fecha y hora", icon: "calendar-outline" },
  ];

  // Datos de las opciones (Paso 1)
  const options = [
    "Se rompió mi tubería.",
    "Tengo una fuga de agua",
    "El drenaje está tapado",
    "Describe el problema"
    
  ];


// --- FUNCIÓN PARA SELECCIONAR IMAGEN ---
  const pickImage = async () => {
    // No necesitamos pedir permisos explícitos para la galería en versiones modernas
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      allowsEditing: true, // Permitir recortar (opcional)
      aspect: [4, 3], // Proporción (opcional)
      quality: 1, // Calidad máxima
    });

if (!result.canceled) {
      // Si el usuario no canceló, guardamos la ruta de la imagen
      setImageUri(result.assets[0].uri);
      // Opcional: Si quieres que avance automáticamente al seleccionar, descomenta esto:
      // handleContinue(); 
    }
  };

 // --- LÓGICA DE NAVEGACIÓN ---
  const handleContinue = () => {
    // Paso 1 -> 2 (De Problema a Foto)
    if (currentStep === 1) {
      setCurrentStep(2); 
    } 
    // Paso 2 -> 3 (De Foto a Urgencia)
    else if (currentStep === 2) {
      setCurrentStep(3); 
    } 
    // Paso 3 -> 4 (De Urgencia a Buscando...)
    else if (currentStep === 3) {
      setCurrentStep(4); 

      // Simulamos espera de 3 segundos
      setTimeout(() => {
        setCurrentStep(5); // Cambiamos directo a la pantalla de Heroe 
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2); // De Urgencia volver a Foto (NUEVO)
    } else if (currentStep === 2) {
      setCurrentStep(1); // De Foto volver a Problema
    } else {
      router.back(); // Salir
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
    } else if (currentStep === 2) {
      // --- PASO 2: FOTO DEL PROBLEMA ---
      return (
        <>
          <Text style={styles.questionTitle}>Foto del problema.</Text>
          <Text style={styles.questionSubtitle}>Nos ayudan a comprender el problema</Text>

          <Text style={styles.label}>Añadir una foto (opcional)</Text>
          
          {/* LÓGICA CONDICIONAL */}
          {!imageUri ? (
            // A) Si NO hay foto, mostramos el botón de subir
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                <Ionicons name="camera-outline" size={40} color="#666" style={{ marginBottom: 10 }} />
                <Text style={styles.uploadText}>Toque para añadir foto</Text>
            </TouchableOpacity>
          ) : (
            // B) Si SÍ hay foto, mostramos la previsualización
            <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                {/* Botón para eliminar la foto */}
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setImageUri(null)}>
                    <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
            </View>
          )}
        </>
      );
    }
    
    else if (currentStep === 3) {
      // --- PASO 3: URGENCIA
      return (
        <>
          <Text style={styles.questionTitle}>¿Qué tan urgente es esto?</Text>
          <Text style={styles.questionSubtitle}>Priorizaremos tu solicitud según esto</Text>

          <View style={styles.optionsContainer}>
            {urgencyOptions.map((item, index) => {
              const isSelected = urgency === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.urgencyCard,
                    isSelected ? styles.urgencySelected : styles.urgencyUnselected
                  ]}
                  onPress={() => setUrgency(index)}
                >
                  <View style={styles.urgencyContent}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24} 
                      color={isSelected ? "white" : "#1A1A1A"} 
                      style={{ marginRight: 15 }}
                    />
                    <View>
                      <Text style={[styles.urgencyTitle, isSelected ? styles.textSelected : styles.textUnselected]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.urgencySubtitle, isSelected ? {color: '#CCC'} : {color: '#666'}]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      );
    
    } else if (currentStep === 4) {
      // --- PASO 4: BUSCANDO (Loading) ---
      return (
        <View style={styles.searchingContainer}>
          {/* Círculo con Icono */}
          <View style={styles.pulseCircle}>
             <Ionicons name="paper-plane-outline" size={40} color="#1A1A1A" style={{ marginLeft: -2, marginTop: 2 }} />
          </View>

          <Text style={styles.searchingTitle}>Buscando tu asesor...</Text>
          <Text style={styles.searchingSubtitle}>
            Conectándote con el mejor {title?.toString().toLowerCase() || "profesional"} cercano
          </Text>

          {/* Animación de puntitos (Simulada visualmente) */}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
             <View style={[styles.dot, { opacity: 1 }]} />
             <View style={[styles.dot, { opacity: 0.6 }]} />
             <View style={[styles.dot, { opacity: 0.3 }]} />
          </View>
        </View>
      );
    } else if (currentStep === 5) {
      // --- PASO 5: HÉROE ASIGNADO ---
      return (
        <View style={styles.heroContainer}>
            
            {/* Encabezado con Check y Cerrar */}
            <View style={styles.heroHeader}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="checkmark-circle" size={24} color="#1A1A1A" />
                    <Text style={styles.heroTitle}>¡Héroe asignado!</Text>
                </View>
                {/* La X cierra todo y manda al inicio */}
                <TouchableOpacity onPress={() => router.push("/")}>
                    <Ionicons name="close" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            {/* Foto del Técnico */}
            <View style={styles.avatarContainer}>
                {/* Usamos una imagen de muestra de internet */}
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                    style={styles.heroAvatar} 
                />
            </View>

            {/* Datos del Técnico */}
            <Text style={styles.heroName}>Eliot Alderson</Text>
            <Text style={styles.heroRole}>Plomero maestro</Text>

            {/* Badge de Verificado */}
            <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={12} color="white" style={{marginRight:4}} />
                <Text style={styles.verifiedText}>Profesional Verificado</Text>
            </View>

            {/* Rating y Llegada */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Ionicons name="star" size={16} color="#1A1A1A" />
                    <Text style={styles.statText}>4.9 <Text style={{color:'#999', fontWeight:'400'}}>(847)</Text></Text>
                </View>
                <View style={styles.statItem}>
                    <Ionicons name="time-outline" size={16} color="#1A1A1A" />
                    <Text style={styles.statText}>8 min</Text>
                </View>
                 <View style={styles.statItem}>
                    <Ionicons name="location-outline" size={16} color="#1A1A1A" />
                    <Text style={styles.statText}>1.2 km</Text>
                </View>
            </View>

            {/* Galería de trabajos recientes */}
            <View style={styles.recentWorkContainer}>
                <Text style={styles.sectionLabel}>Recientes trabajos</Text>
                <View style={styles.workImagesRow}>
                    <Image source={{ uri: 'https://picsum.photos/100' }} style={styles.workImage} />
                    <Image source={{ uri: 'https://picsum.photos/101' }} style={styles.workImage} />
                    <Image source={{ uri: 'https://picsum.photos/102' }} style={styles.workImage} />
                </View>
            </View>

            {/* Botones de Acción */}
            <View style={styles.actionButtonsRow}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name="chatbubble-outline" size={18} color="#1A1A1A" style={{marginRight: 8}}/>
                    <Text style={styles.btnTextOutline}>Mensaje</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSolid}>
                    <Ionicons name="call-outline" size={18} color="white" style={{marginRight: 8}}/>
                    <Text style={styles.btnTextSolid}>Llamar</Text>
                </TouchableOpacity>
            </View>

            {/* Resumen Final del Servicio */}
            <View style={styles.serviceSummary}>
                <View>
                    <Text style={styles.summaryLabel}>Servicio</Text>
                    <Text style={styles.summaryValue}>{title} - {options[selectedOption!]}</Text>
                </View>
                <View style={styles.summaryBadge}>
                     <Text style={styles.summaryBadgeText}>Emergencia</Text>
                </View>
            </View>

        </View>
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
                {/* AGREGAMOS ESTA CONDICIÓN: Si estamos en el paso 4, ocultamos los botones */}
                {currentStep < 4 && (
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.btnSecondary} onPress={handleBack}>
                            <Text style={styles.btnTextSecondary}>Atras</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.btnPrimary} onPress={handleContinue}>
                            <Text style={styles.btnTextPrimary}>
                                {currentStep === 3 ? "Encontrar Pro" : "Continuar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

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
    
// Estilos para la previsualización de la imagen
  imagePreviewContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden', // Para que la imagen respete el borde redondeado
    marginBottom: 20,
    position: 'relative', // Para poder posicionar el botón de borrar encima
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)', // Fondo semitransparente negro
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
 },

// Estilos Paso 3 (Urgencia)
  urgencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
  },
  urgencyUnselected: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
  },
  urgencySelected: {
    backgroundColor: '#1A1A1A', // Fondo negro al seleccionar
    borderColor: '#1A1A1A',
  },
  urgencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  urgencySubtitle: {
    fontSize: 12,

  },
// Estilos Paso 4 (Buscando)
  searchingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  pulseCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0', // Gris muy clarito
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  searchingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchingSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  // Estilos para los 3 puntitos
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 4,
  },

  // Estilos Paso 5 (Héroe Asignado)
  heroContainer: {
    paddingTop: 10,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
    color: '#1A1A1A',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  heroAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Círculo perfecto
  },
  heroName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1A1A1A',
  },
  heroRole: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  verifiedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, // Espacio entre elementos
    marginBottom: 25,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  // Galería
  recentWorkContainer: {
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  workImagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  workImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  // Botones
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  btnOutline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  btnSolid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#1A1A1A',
  },
  btnTextOutline: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  btnTextSolid: {
    fontWeight: '600',
    color: 'white',
  },
  // Resumen footer
  serviceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 16,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    maxWidth: 200,
  },
  summaryBadge: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  summaryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
  },
});