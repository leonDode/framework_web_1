import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeftIcon } from "react-native-heroicons/solid"; // Importando o ícone

export default function WakeUpTimesScreen() {
  const navigation = useNavigation();
  const [wakeUpTimes, setWakeUpTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null); // Estado para guardar o horário selecionado

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
    if (selectedTime === time) {
      setSelectedTime(null); // Desmarca o horário se ele já estiver selecionado
    } else {
      setSelectedTime(time); // Marca o horário
    }
  };

  const handleDefineTime = () => {
    Alert.alert(
      "Definir Alarme",
      `Você gostaria de definir um alarme para ${selectedTime}?`,
      [
        {
          text: "Não",
          onPress: () => console.log("Alarme não definido"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            navigation.navigate("Alarm Clock", { time: selectedTime }),
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="h-full w-full">
        {/* Ícone de voltar */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-6 left-4 z-10 p-2 bg-black/50 rounded-full mt-10"
        >
          <ArrowLeftIcon color="white" size={24} />
        </TouchableOpacity>

        <View className="h-full w-full flex justify-center items-center">
          <Text className="text-white text-4xl text-center mb-4 font-extrabold">
            Vai Dormir Agora?
          </Text>

          <Text className="text-white text-xl text-center mb-4 font-extrabold">
            Horários ideais para acordar:
          </Text>

          <View className="flex flex-wrap flex-row justify-center items-center w-full px-4">
            {wakeUpTimes.map((time, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(200 * index)
                  .duration(1000)
                  .springify()}
                className={`p-4 m-2 rounded-lg w-[30%] justify-center items-center border-2 ${
                  selectedTime === time
                    ? "bg-blue-500 border-blue-600"
                    : "bg-teal-700 border-neutral-400"
                }`}
              >
                <TouchableOpacity
                  onPress={() => handleTimePress(time)}
                  className="flex justify-center items-center "
                >
                  <Text
                    className={`text-lg ${
                      selectedTime === time ? "text-black" : "text-white"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {selectedTime ? (
            <TouchableOpacity
              className="mt-8 bg-blue-500 py-2 px-4 rounded"
              onPress={handleDefineTime}
            >
              <Text className="text-white text-lg text-center">
                Definir Horário
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="mt-8 bg-cyan-400 py-2 px-4 rounded"
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white text-lg text-center">Voltar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
