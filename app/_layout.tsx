import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [shouldCreateAccount, setShouldCreateAccount] = useState(false);

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      {/* {shouldCreateAccount && <Redirect href="/CreateAccount" />}
      {!shouldCreateAccount && isLoggedIn && <Redirect href="/(tabs)" />}
      {!shouldCreateAccount && !isLoggedIn && <Redirect href="/Sign-In" />} */}
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
