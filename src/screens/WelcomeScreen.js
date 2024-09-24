import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react'
import { StatusBar } from "expo-status-bar";
import { View,Image,Text } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from '../firebase';


export default function WelcomeScreen() {

    const ring2padding = useSharedValue(0);
    const navigation = useNavigation()

 
    useEffect(()=>{
        ring2padding.value = 0;
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);



        const unSubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // Se o usuário estiver autenticado, navegue para a HomeScreen
            navigation.navigate("Main");
          } else {
            // Se o usuário não estiver autenticado, navegue para a tela de Login
            setTimeout(() => navigation.navigate("Login"), 2500);
          }
        });
    
        // Limpar o observador ao desmontar o componente
        return () => unSubscribe();

    },[])


  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-cyan-950">
    <StatusBar style="light" />

   
    <Animated.View className="bg-cyan-400 rounded-full"   style={{padding: ring2padding}}>
      <Animated.View className="bg-cyan-400 rounded-full">
          <Image source={require('../../assets/images/welcome.png')}
              style={{width: hp(20), height: hp(20) }} className=""/>
      </Animated.View>
    </Animated.View>
  </View>
  )
}