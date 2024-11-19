import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { Picker } from "react-native-wheel-picker-expo";

export default function AlarmScreen({ route }) {
  const navigation = useNavigation();
  const { time = "00:00" } = route.params || {}; // Recebendo o horário da rota

  // Estados para horas e minutos
  const [selectedHour, setSelectedHour] = useState(time.split(":")[0]);
  const [selectedMinute, setSelectedMinute] = useState(time.split(":")[1]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleSaveAlarm = async () => {
    const userID = auth.currentUser?.uid;
    if (!userID) {
      console.error("Usuário não autenticado.");
      return;
    }

    const newTime = `${selectedHour}:${selectedMinute}`;

    try {
      await addDoc(collection(firestore, "users", userID, "sleepTimes"), {
        date: new Date().toISOString().split("T")[0],
        time: newTime,
        timestamp: Timestamp.now(),
      });
      console.log("Horário de sono salvo com sucesso:", newTime);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar horário de sono:", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="h-full w-full flex justify-center items-center">
        <Text className="text-white text-2xl mb-4 font-custom">
          Defina Seu Alarme
        </Text>
        <Text className="text-white text-lg mb-4 font-custom">
          Ajuste o horário manualmente:
        </Text>

        {/* Seletor de Horas e Minutos */}
        <View className="flex flex-row justify-center items-center">
          <Picker
            selectedValue={selectedHour}
            pickerData={hours}
            onValueChange={(value) => setSelectedHour(value)}
            style={{ width: 80, height: 180 }}
            textColor="#fff"
          />
          <Text className="text-white text-2xl mx-2">:</Text>
          <Picker
            selectedValue={selectedMinute}
            pickerData={minutes}
            onValueChange={(value) => setSelectedMinute(value)}
            style={{ width: 80, height: 180 }}
            textColor="#fff"
          />
        </View>

        <TouchableOpacity
          className="mt-8 bg-green-500 py-2 px-4 rounded"
          onPress={handleSaveAlarm}
        >
          <Text className="text-white text-lg text-center font-custom">
            Definir Despertador
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 bg-cyan-400 py-2 px-4 rounded"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-lg text-center font-custom">
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
