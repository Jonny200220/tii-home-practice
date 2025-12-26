import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import CreateAccount from "./CreateAccount";

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [shouldCreateAccount, setShouldCreateAccount] = useState(false);

  if (shouldCreateAccount) {
    return <CreateAccount />;
  }

  if (isLoggedIn) {
    return <Stack.Screen name="(tabs)" options={{ headerShown: false }} />;
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn && !shouldCreateAccount}>
          <Stack.Screen name="Sign-In" options={{ headerShown: true }} />
        </Stack.Protected>

        <Stack.Protected guard={shouldCreateAccount}>
          <Stack.Screen name="CreateAccount" options={{ headerShown: true }} />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
