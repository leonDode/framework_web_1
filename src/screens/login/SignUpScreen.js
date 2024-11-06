import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { setDoc, doc } from "firebase/firestore";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userID = userCredential.user.uid;

        // Cria o documento do usuário no Firestore
        await setDoc(doc(firestore, "users", userID), {
          email,
          password,
          createdAt: new Date(), // Armazena a data de criação da conta
        });

        // Redireciona para a tela de login
        navigation.push("Login");
      } catch (error) {
        console.error("Erro ao criar conta:", error.message);
      }
    } else {
      console.error("As senhas não coincidem");
    }
  };

  return (
    <View className="bg-cyan-950 h-full w-full">
      <View className="flex-row justify-center w-full absolute mt-10">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[200] w-[420]"
          source={require("../../../assets/images/welcome.png")}
        />
      </View>

      <View className="h-full w-full flex justify-around pt-40 mt-10">
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={setEmail}
              style={{ color: "white" }}
              keyboardType="default"
            />
          </Animated.View>

          {/* <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-white/5 p-5 rounded-2xl w-full"> */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TextInput
              placeholder="Senha"
              placeholderTextColor="white"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{ color: "white" }}
              keyboardType="default"
            />
          </Animated.View>

          {/* <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-white/5 p-5 rounded-2xl w-full"> */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400"
          >
            <TextInput
              placeholder="Confirmar Senha"
              placeholderTextColor="white"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={{ color: "white" }}
              keyboardType="default"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className="w-full bg-cyan-400 p-3 rounded-2xl mb-3"
              onPress={handleSignUp}
            >
              <Text className="text-xl font-bold text-white text-center">
                Cadastrar-se
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center"
          >
            <Text className="text-white">Já tem uma conta? Faça </Text>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text className="text-cyan-400">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
