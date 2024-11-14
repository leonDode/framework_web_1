import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function SaibaMais() {
  const navigation = useNavigation();

  return (
    <ScrollView className="bg-cyan-950  p-4">
      <View className="mb-4 pt-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 ml-0"
        >
          <ArrowLeftIcon size={24} color="rgb(6 182 212)" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-center text-cyan-500">
          O Ciclo Circadiano do Sono
        </Text>
      </View>

      <View className="mb-6 mt-8">
        <Text className="text-lg font-semibold text-white mb-2">
          O que é o Ciclo Circadiano?
        </Text>
        <Text className="text-white">
          O ciclo circadiano é o relógio interno do corpo, que regula o ciclo de
          sono e vigília em um ritmo de aproximadamente 24 horas. Esse ciclo é
          influenciado pela luz e pela escuridão no ambiente e controla várias
          funções corporais.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-white">
          Como Funciona o Ciclo Circadiano?
        </Text>
        <Text className="text-white">
          O ciclo é controlado pelo núcleo supraquiasmático (NSQ), uma área do
          cérebro que responde à luz. Quando a luz do dia começa, o NSQ sinaliza
          ao corpo que é hora de acordar, diminuindo a produção de melatonina
          (hormônio do sono). À noite, o NSQ faz o oposto, aumentando a
          melatonina e induzindo o sono.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-white mb-2">
          Benefícios de Seguir o Ciclo Circadiano
        </Text>
        <Text className="text-white">
          Seguir o ciclo circadiano traz benefícios para a saúde, como melhorar
          a qualidade do sono, aumentar a energia e promover o bem-estar mental.
          Ele também regula o metabolismo e ajuda na memória e na concentração.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-white mb-2">
          Problemas ao Ignorar o Ciclo Circadiano
        </Text>
        <Text className="text-white">
          Ignorar o ciclo circadiano pode levar a distúrbios do sono, fadiga,
          falta de concentração e problemas de humor. Em longo prazo, o
          desajuste do ciclo pode causar problemas de saúde mais graves, como
          doenças cardíacas, obesidade e depressão.
        </Text>
      </View>

      <View className="mt-4">
        <Text className="text-center text-sm text-white">
          Entender e respeitar o ciclo circadiano é essencial para uma vida
          equilibrada e saudável.
        </Text>
      </View>
    </ScrollView>
  );
}
