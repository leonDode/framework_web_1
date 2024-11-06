import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { LineChart } from "react-native-chart-kit";
import { auth, firestore } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function DataScreen() {
  const [sleepData, setSleepData] = useState([]);

  const fetchSleepData = async () => {
    const userID = auth.currentUser?.uid;
    if (!userID) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const sleepTimesRef = collection(
        firestore,
        "users",
        userID,
        "sleepTimes"
      );
      const querySnapshot = await getDocs(sleepTimesRef);

      const data = querySnapshot.docs.map((doc) => {
        const { date, time } = doc.data();
        return { date, time };
      });

      setSleepData(data);
    } catch (error) {
      console.error("Erro ao buscar dados de sono:", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSleepData();
    }, [])
  );

  const chartData = {
    labels: sleepData.map((entry) => entry.date),
    datasets: [
      {
        data: sleepData.map((entry) => {
          const [hours, minutes] = entry.time.split(":").map(Number);
          return hours + minutes / 60;
        }),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-800">
      <Text className="text-white text-2xl mb-6 font-custom">
        Histórico de Horários de Sono
      </Text>
      {sleepData.length > 0 ? (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 32} // Largura do gráfico
          height={220}
          yAxisSuffix="h" // Sufixo para as unidades de tempo no eixo Y
          chartConfig={{
            backgroundColor: "#1f2937",
            backgroundGradientFrom: "#3b82f6",
            backgroundGradientTo: "#2563eb",
            decimalPlaces: 1, // Casas decimais no eixo Y
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier // Linha curva
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text className="text-white text-lg font-custom">
          Nenhum dado de sono disponível.
        </Text>
      )}
    </View>
  );
}
