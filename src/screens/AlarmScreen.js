import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AlarmScreen({ route }) {
  const navigation = useNavigation();
  const { time = "00:00" } = route.params || {}; // Recebendo o horário da rota

  return (
    <View className="bg-cyan-950 h-full w-full flex justify-center items-center">
      <Text className="text-white text-2xl mb-4">Alarme Definido!</Text>
      <Text className="text-white text-lg mb-8">Você acordará às:</Text>
      <Text className="text-yellow-500 text-4xl">{time}</Text>

      <TouchableOpacity
        className="mt-8 bg-cyan-400 py-2 px-4 rounded"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-lg text-center">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
