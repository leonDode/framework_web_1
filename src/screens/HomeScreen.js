import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0"); // Obter as horas
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Obter os minutos

    setCurrentTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="bg-cyan-950 h-full w-full">
      <View className="flex-row justify-center w-full absolute mt-16">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[200] w-[320]"
          source={require("../../assets/images/welcome.png")}
        />
      </View>

      <View className="h-full w-full flex justify-around pt-40 pb-10 ">
        <View className="flex items-center mx-4 space-y-4 ">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-cyan-400 p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TouchableOpacity
              className="py-2 px-4 rounded"
              onPress={() => Alert.alert("Botão 1 Pressionado")}
            >
              <Text className="text-white text-lg text-center">
                Quando devo ir pra cama?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TouchableOpacity
              className="py-2 px-4 rounded"
              onPress={() => navigation.navigate("WakeUp")}
            >
              <Text className="text-white text-lg text-center">
                Vai Dormir Agora?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text className="text-white">O que é ciclo circadiano? </Text>
            <TouchableOpacity>
              <Text className="text-cyan-400">Saiba Mais</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
