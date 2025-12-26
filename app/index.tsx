import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleEmergency = (): void => {
    console.log("hola mundo");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Buenos Dias</Text>
      <View >
        <Pressable style={styles.btnEmergency} onPress={handleEmergency}>
          <Text>Que hay que Arreglar hoy?</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnEmergency: {
    marginBlock: 'auto',
    backgroundColor: '#fff',
    padding: 15
  },
});
