import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, firestore } from "../firebase";

export default function AlarmScreen({ route }) {
  const navigation = useNavigation();
  const { time = "00:00" } = route.params || {}; // Recebendo o horário da rota

  useEffect(() => {
    // Função para salvar o horário de sono no Firestore
    const saveSleepTime = async () => {
      const userID = auth.currentUser?.uid;
      if (!userID) {
        console.error("Usuário não autenticado.");
        return;
      }

      try {
        // Adiciona um novo documento na subcoleção sleepTimes com a data e hora
        await addDoc(collection(firestore, "users", userID, "sleepTimes"), {
          date: new Date().toISOString().split("T")[0], // Data atual no formato 'YYYY-MM-DD'
          time: time, // Hora passada na rota
          timestamp: Timestamp.now(), // Adiciona um timestamp para consultas futuras
        });
        console.log("Horário de sono salvo com sucesso.");
      } catch (error) {
        console.error("Erro ao salvar horário de sono:", error.message);
      }
    };

    // Chama a função para salvar o horário de sono assim que a tela é carregada
    saveSleepTime();
  }, [time]);

  return (
    <View className="bg-cyan-950 h-full w-full flex justify-center items-center">
      <Text className="text-white text-2xl mb-4 font-custom">
        Alarme Definido!
      </Text>
      <Text className="text-white text-lg mb-8 font-custom">
        Você acordará às:
      </Text>
      <View className="bg-black w-[150] h-[70] justify-center items-center border-2 border-cyan-800">
        <Text className="text-yellow-500 text-4xl font-custom">{time}</Text>
      </View>
      <TouchableOpacity
        className="mt-8 bg-cyan-400 py-2 px-4 rounded"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-lg text-center font-custom">
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
