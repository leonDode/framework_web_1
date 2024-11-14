import React from "react";
import AppNavigation from "./src/navigation"; // Importe corretamente o AppNavigation
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    NomeDaFonte: require("./assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
