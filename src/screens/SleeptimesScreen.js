import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function SleepTimesScreen() {
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState(null);

  const sleepTimes = [
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
  ];

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  const handleDefineTime = () => {
    if (!selectedTime) {
      Alert.alert("Selecione um horário de acordar primeiro!");
      return;
    }

    // Navega para a tela de sugestões passando o horário selecionado
    navigation.navigate("SleepSuggestions", { wakeTime: selectedTime });
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
            Quando quer acordar?
          </Text>

          <View className="flex flex-wrap flex-row justify-center items-center w-full px-4">
            {sleepTimes.map((time, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(200 * index)
                  .duration(1000)
                  .springify()}
                className={`p-4 m-2 rounded-lg w-[30%] justify-center items-center border-2 ${
                  selectedTime === time
                    ? "bg-sky-500 border-blue-600"
                    : "bg-sky-900 border-neutral-400"
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

          <TouchableOpacity
            className="mt-8 bg-sky-800 py-2 px-4 rounded"
            onPress={handleDefineTime}
          >
            <Text className="text-white text-lg text-center">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
