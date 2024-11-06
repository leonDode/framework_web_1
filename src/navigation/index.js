import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AlarmScreen from "../screens/AlarmScreen";
import DataScreen from "../screens/DataScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/login/loginScreen";
import SignUpScreen from "../screens/login/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import WakeUpTimesScreen from "../screens/WakeUpTimes";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgb(0 0 0)",
          borderTopWidth: 0,
          bottom: 10,
          left: 14,
          right: 14,
          elevation: 0,
          borderRadius: 4,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="home" size={size} color={"rgb(34 211 238)"} />
              );
            }
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Alarm Clock"
        component={AlarmScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="alarm" size={size} color={"rgb(34 211 238)"} />
              );
            }
            return <Ionicons name="alarm-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Data"
        component={DataScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="bar-chart"
                  size={size}
                  color={"rgb(34 211 238)"}
                />
              );
            }
            return (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons name="person" size={size} color={"rgb(34 211 238)"} />
              );
            }
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="WakeUp" component={WakeUpTimesScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
