// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import LoginScreen from "./screens/LoginPage";

import { AuthProvider } from "./contexts/Auth";
import MainStack from "./navigations/MainStack";

// import RegisterScreen from "./screens/RegisterPage";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./screens/HomeScreen";
// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
    // <View style={styles.container}>
    //   <RegisterScreen />
    //   {/* <LoginScreen /> */}
    //   {/* <Home /> */}
    //   <StatusBar style="auto" />
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
