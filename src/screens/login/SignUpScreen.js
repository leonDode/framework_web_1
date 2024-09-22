import { useNavigation } from "@react-navigation/native"
import { Image, View,Text } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { TouchableOpacity } from "react-native"
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

export default function SignUpScreen(){
    const navigation = useNavigation()


    return (
        <View className="bg-cyan-950 h-full w-full">
            <StatusBar style="dark" />
    
            <View className="flex-row justify-center w-full absolute mt-8">
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[200] w-[420]" source={require("../../../assets/images/welcome.png")} />
            </View>
    
            <View className="h-full w-full flex justify-around pt-40">
                <View className="flex items-center mx-4 space-y-4">
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400">
                        <TextInput placeholder="Nome" placeholderTextColor={'white'} />
                    </Animated.View>
    
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400">
                        <TextInput placeholder="Email" placeholderTextColor={'white'} />
                    </Animated.View>
    
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400">
                        <TextInput placeholder="Senha" placeholderTextColor={'white'} />
                    </Animated.View>
    
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full border border-cyan-400">
                        <TextInput placeholder="Confirmar Senha" placeholderTextColor={'white'} />
                    </Animated.View>
    
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="w-full">
                        <TouchableOpacity className="w-full bg-cyan-400 p-3 rounded-2xl mb-3" onPress={() => navigation.push('Main')}>
                            <Text className="text-xl font-bold text-white text-center">Cadastrar-se</Text>
                        </TouchableOpacity>
                    </Animated.View>
    
                    <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="flex-row justify-center">
                        <Text className="text-white">Já tem uma conta? Faça </Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text className="text-cyan-400">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
    
}
