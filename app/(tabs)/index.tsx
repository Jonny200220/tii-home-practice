import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isSmall = width < 380;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
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
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.questionButton}>
                <Text style={styles.question}>Que problema Tienes?</Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text>Cerrar</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
          <Pressable style={styles.bellButton} accessibilityRole="button">
            <Ionicons name="notifications-outline" size={24} color="#0f172a" />
          </Pressable>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "bold",
  },
  questionButton: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  bellButton: {
    backgroundColor: "#e2e8f0",
    height: 44,
    width: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
