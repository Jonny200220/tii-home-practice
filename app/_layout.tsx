import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "teal", headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="Historial"
          options={{
            tabBarIcon: () => (
              <AntDesign name="history" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="Ajustes"
          options={{
            tabBarIcon: () => (
              <Feather name="settings" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="Perfil"
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name="user" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
