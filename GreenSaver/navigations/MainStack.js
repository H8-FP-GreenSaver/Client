import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import BottomTab from "./BottomTab";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="GreenSaver" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
