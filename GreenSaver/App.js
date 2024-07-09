import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginPage";

import RegisterScreen from "./screens/RegisterPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



import Home from "./screens/HomeScreen";
import List from "./screens/ListScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <List />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
