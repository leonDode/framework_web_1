import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function WakeUpTimesScreen() {
  const navigation = useNavigation();
  const [wakeUpTimes, setWakeUpTimes] = useState([]);

  useEffect(() => {
    calculateWakeUpTimes();
  }, []);

  const calculateWakeUpTimes = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); // Adiciona 15 minutos ao horário atual

    const times = [];
    for (let i = 1; i <= 6; i++) {
      now.setMinutes(now.getMinutes() + 90); // Adiciona 90 minutos para cada ciclo
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
    }

    setWakeUpTimes(times);
  };

  const handleTimePress = (time) => {
    Alert.alert(
      "Definir Alarme",
      `Você gostaria de definir um alarme para ${time}?`,
      [
        {
          text: "Não",
          onPress: () => console.log("Alarme não definido"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => navigation.navigate("Alarm Clock", { time }),
        },
      ]
    );
  };

  return (
    <View className="bg-cyan-950 h-full w-full flex justify-center items-center">
      <Text className="text-white text-2xl text-center mb-4">
        Vai Dormir Agora?
      </Text>

      <Text className="text-white text-lg text-center mb-4">
        Horários ideais para acordar:
      </Text>

      <View className="flex flex-wrap flex-row justify-center items-center w-full px-4">
        {wakeUpTimes.map((time, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(200 * index)
              .duration(1000)
              .springify()}
            className="bg-teal-700 p-4 m-2 rounded-lg w-[30%] justify-center items-center	border-2 border-neutral-400"
          >
            <TouchableOpacity
              onPress={() => handleTimePress(time)} // Chama a função para mostrar o alerta
              className="flex justify-center items-center "
            >
              <Text className="text-white text-lg">{time}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity
        className="mt-8 bg-cyan-400 py-2 px-4 rounded"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-lg text-center">Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
