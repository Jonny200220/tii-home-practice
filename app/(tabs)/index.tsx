import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = {
  label: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  highlight?: boolean;
  wide?: boolean;
};

const categories: Category[] = [
  {
    label: "Plomería",
    subtitle: "Reparaciones de agua",
    icon: "water-outline",
    highlight: true,
  },
  {
    label: "Electricista",
    subtitle: "Problemas de luz",
    icon: "flash-outline",
  },
  { label: "Cerrajería", subtitle: "Apertura de puertas", icon: "key-outline" },
  {
    label: "Electrodomésticos",
    subtitle: "Arreglos del hogar",
    icon: "cube-outline",
  },
  { label: "Empresas", subtitle: "?", icon: "help-circle-outline" },
  { label: "Proveedores", subtitle: "?", icon: "help-circle-outline" },
  {
    label: "Profesionales verificados",
    subtitle: "2,400+",
    icon: "shield-checkmark-outline",
    wide: true,
  },
];

const problemOptions = [
  "Se rompió mi tubería.",
  "Tengo una fuga de agua",
  "Se rompió mi tubería.",
];

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [customProblem, setCustomProblem] = useState("");
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark"/>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Buenos días</Text>
          <Pressable
            style={styles.questionButton}
            onPress={() => setModalVisible(true)}
            accessibilityRole="button"
          >
            <Text style={styles.question}>¿Qué hay que arreglar hoy?</Text>
          </Pressable>
          <Modal
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            animationType="slide"
            transparent
            // presentationStyle="pageSheet"
          >
            <SafeAreaView style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderIcon}>
                  <Ionicons name="water" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.modalHeaderTitle}>Plomería</Text>
                  <Text style={styles.modalHeaderSubtitle}>
                    Servicios de emergencia en el hogar
                  </Text>
                </View>
              </View>

              {/* Back link */}
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.backLink}
              >
                <Ionicons name="chevron-back" size={16} color="#64748b" />
                <Text style={styles.backLinkText}>Regresar al inicio</Text>
              </Pressable>

              {/* Title */}
              <Text style={styles.modalTitle}>¿Que problema tienes?</Text>
              <Text style={styles.modalSubtitle}>
                Nos ayudan a comprender el problema
              </Text>

              {/* Options */}
              <View style={styles.optionsContainer}>
                {problemOptions.map((option, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOption === index && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedOption(index)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === index && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#94a3b8"
                    />
                  </Pressable>
                ))}

                {/* Custom input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Describe el problema"
                    placeholderTextColor="#64748b"
                    value={customProblem}
                    onChangeText={setCustomProblem}
                  />
                  <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.buttonSecondary}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonSecondaryText}>Atras</Text>
                </Pressable>
                <Pressable style={styles.buttonPrimary}>
                  <Text style={styles.buttonPrimaryText}>Continuar</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </Modal>
        </View>

        <View style={styles.grid}>
          {categories.map((item) => (
            <Pressable
              key={item.label}
              style={[
                styles.card,
                { width: item.wide ? "100%" : isSmall ? "100%" : "48%" },
                item.highlight && styles.cardHighlight,
                item.wide && styles.cardWide,
              ]}
              accessibilityRole="button"
            >
              <View
                style={[
                  styles.iconWrapper,
                  item.highlight && styles.iconWrapperHighlight,
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.highlight ? "#0f172a" : "#334155"}
                />
              </View>
              <Text
                style={[
                  styles.cardTitle,
                  item.highlight && styles.cardTitleHighlight,
                ]}
              >
                {item.label}
              </Text>
              {item.subtitle ? (
                <Text
                  style={[
                    styles.cardSubtitle,
                    item.highlight && styles.cardSubtitleHighlight,
                  ]}
                >
                  {item.subtitle}
                </Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 36,
  },
  headerRow: {
    alignItems: "center",
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 4,
    textAlign: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    color: "#0f172a",
  },
  questionButton: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalHeaderIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  modalHeaderSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  backLinkText: {
    fontSize: 14,
    color: "#64748b",
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  optionButtonSelected: {
    borderColor: "#0f172a",
    borderWidth: 2,
    backgroundColor: "#f8fafc",
  },
  optionText: {
    fontSize: 15,
    color: "#334155",
  },
  optionTextSelected: {
    fontWeight: "600",
    color: "#0f172a",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#0f172a",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    paddingVertical: 20,
  },
  buttonSecondary: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#0f172a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonSecondaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonPrimaryText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardWide: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardHighlight: {
    borderColor: "#0f172a",
    backgroundColor: "#f8fafc",
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconWrapperHighlight: {
    backgroundColor: "#e2e8f0",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  cardTitleHighlight: {
    color: "#0f172a",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  cardSubtitleHighlight: {
    color: "#0f172a",
    fontWeight: "600",
  },
});
