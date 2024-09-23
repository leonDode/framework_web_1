import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error('Erro ao deslogar:', error.message);
    }
  };

  return (
    <View className="bg-cyan-950 h-full w-full justify-center items-center">
      {userEmail ? (
        <Text className="text-white text-xl">{userEmail}</Text>
      ) : (
        <Text className="text-white text-xl">Carregando...</Text>
      )}
      
      {/* Botão de Logout */}
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
      </View>
    </View>
  );
}
