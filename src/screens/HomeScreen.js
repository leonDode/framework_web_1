import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function HomeScreen() {
  const navigation = useNavigation();

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
                Quando devo ir pra cada?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5s p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TouchableOpacity
              className="py-2 px-4 rounded"
              onPress={() => Alert.alert("Botão 2 Pressionado")}
            >
              <Text className="text-white text-lg text-center">
                Vai Dormir Agora?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full"
          ></Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text className="text-white">O que e ciclo circadiano? </Text>
            <TouchableOpacity>
              <Text className="text-cyan-400">Saiba Mais</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
