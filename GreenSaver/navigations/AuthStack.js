import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginPage";
import RegisterScreen from "../screens/RegisterPage";
import Preferences1 from "../screens/Preferences1";
import Preferences2 from "../screens/Preferences2";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Preferences1" component={Preferences1} />
      <Stack.Screen name="Preferences2" component={Preferences2} />
    </Stack.Navigator>
  );
}
