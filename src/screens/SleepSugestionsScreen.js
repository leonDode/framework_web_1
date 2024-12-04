import React, { useEffect, useState } from "react";
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

export default function SleepSuggestionsScreen({ route }) {
  const navigation = useNavigation();
  const { wakeTime } = route.params; // Horário de acordar recebido da rota anterior
  const [sleepSuggestions, setSleepSuggestions] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    calculateSleepTimes(wakeTime);
  }, [wakeTime]);

  const calculateSleepTimes = (wakeTime) => {
    const [hours, minutes] = wakeTime.split(":").map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hours);
    wakeDate.setMinutes(minutes);

    const suggestions = [];
    for (let i = 1; i <= 6; i++) {
      wakeDate.setMinutes(wakeDate.getMinutes() - 90); // Subtrai 90 minutos por ciclo
      const sleepHours = wakeDate.getHours().toString().padStart(2, "0");
      const sleepMinutes = wakeDate.getMinutes().toString().padStart(2, "0");
      suggestions.unshift(`${sleepHours}:${sleepMinutes}`); // Adiciona ao início da lista
    }

    setSleepSuggestions(suggestions);
  };

  const handleTimePress = (time) => {
    if (selectedTime === time) {
      setSelectedTime(null); // Desmarca o horário se ele já estiver selecionado
    } else {
      setSelectedTime(time); // Marca o horário
    }
  };

  const handleSetAlarm = () => {
    if (!selectedTime) {
      Alert.alert("Selecione um horário para dormir primeiro!");
      return;
    }

    // Exemplo: Redirecionar para a tela de alarme
    navigation.navigate("Alarm Clock", { time: selectedTime });

    Alert.alert("Alarme Definido", `Alarme configurado para ${selectedTime}.`, [
      {
        text: "OK",
        onPress: () => console.log("Alarme configurado!"),
      },
    ]);
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
            Horários Ideais para Dormir
          </Text>

          <Text className="text-white text-xl text-center mb-4">
            Baseado no horário de acordar às {wakeTime}
          </Text>

          <View className="flex flex-wrap flex-row justify-center items-center w-full px-4">
            {sleepSuggestions.map((time, index) => (
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
            className="mt-8 bg-sky-900 py-2 px-4 rounded"
            onPress={handleSetAlarm}
          >
            <Text className="text-white text-lg text-center">
              Definir Alarme
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
