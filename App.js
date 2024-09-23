import React from 'react';
import AppNavigation from './src/navigation'; // Importe corretamente o AppNavigation
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
