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
import PestDetail from "../screens/PestDetail";
import PlantProgress from "../screens/PlantProgress";
import PestsList from "../screens/PestsList";
import { AuthContext } from "../contexts/Auth";
import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import PostDetailScreen from "../screens/PostDetail";
import AddPost from "../screens/AddPost";
import EditProfileUser from "../screens/EditProfileUser";
import MeetDevelopers from "../screens/MeetDevelopers";
import FAQ from "../screens/Faq";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function check() {
      const result = await SecureStore.getItemAsync("access_token");
      // const skill = await SecureStore.getItemAsync('skill');

      if (result) {
        authContext.setIsSignedIn(true);
      }
    }
    check();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {authContext.isSignedIn ? (
          <>
            <Stack.Screen name="GreenSaver" component={BottomTab} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="PreSteps" component={PreSteps} />
            <Stack.Screen name="Steps" component={Steps} />
            <Stack.Screen name="PestsDetail" component={PestDetail} />
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="PlantProgress" component={PlantProgress} />
            <Stack.Screen name="EditProfileUser" component={EditProfileUser} />
            <Stack.Screen name="MeetDevelopers" component={MeetDevelopers} />
            <Stack.Screen name="FAQ" component={FAQ} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
