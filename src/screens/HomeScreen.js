import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="bg-cyan-950/90 h-full w-full">
        <View className="flex-row justify-center w-full absolute mt-16">
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-[300] w-[320]"
            source={require("../../assets/images/welcome.png")}
          />
        </View>

        <View className="h-full w-full flex justify-around pt-40 pb-10">
          <View className="flex items-center mx-4 space-y-4">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="bg-cyan-500 p-5 rounded-2xl w-full border border-cyan-500"
            >
              <TouchableOpacity
                className="py-2 px-4 rounded"
                onPress={() => Alert.alert("Botão 1 Pressionado")}
              >
                <Text className="font-custom text-white text-lg text-center">
                  Quando ir pra cama
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-500"
            >
              <TouchableOpacity
                className="py-2 px-4 rounded"
                onPress={() => navigation.navigate("WakeUp")}
              >
                <Text className="font-custom text-white text-lg text-center">
                  Vai Dormir Agora?
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text className="font-custom text-white">
                O que é ciclo circadiano?{" "}
              </Text>
              <TouchableOpacity>
                <Text className="font-custom text-cyan-400">Saiba Mais</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
