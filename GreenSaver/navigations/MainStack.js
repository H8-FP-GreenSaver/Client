import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import BottomTab from "./BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import Preferences1 from "../screens/Preferences1";
import Preferences2 from "../screens/Preferences2";
import List from "../screens/ListScreen";
import Detail from "../screens/DetailScreen";
import PreSteps from "../screens/PreStepsScreen";
import Steps from "../screens/StepsScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="GreenSaver" component={BottomTab} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="PreSteps" component={PreSteps} />
        <Stack.Screen name="Steps" component={Steps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
