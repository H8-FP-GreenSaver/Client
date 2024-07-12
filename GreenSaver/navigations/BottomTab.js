import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Image, Text, TouchableOpacity } from "react-native";
import Home from "../screens/HomeScreen";
import ForumScreen from "../screens/ForumScreen";
import ProfileScreen from "../screens/ProfileScreen";
import List from "../screens/ListScreen";
import { FontAwesome } from "@expo/vector-icons";
import PestsList from "../screens/PestsList";
import PestDetail from "../screens/PestDetail";

const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <Image
            source={require("../assets/GreenSaver-logo.png")}
            style={{ width: 50, height: 30, marginRight: 25 }}
          />
        ),
        // headerLeft: () => (
        //   <TouchableOpacity
        //     onPress={() => {
        //       navigation.goBack();
        //     }}
        //     style={{ marginLeft: 15 }}
        //   >
        //     <Ionicons name="chevron-back-outline" size={24} color="black" />
        //   </TouchableOpacity>
        // ),
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "Forum") {
            return (
              <MaterialCommunityIcons
                name="forum-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Ensiklopedia") {
            return <FontAwesome name="wikipedia-w" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <Ionicons name="person" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#86BA85",
        tabBarInactiveTintColor: "#3D3D3D",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Forum" component={ForumScreen} />
      <Tab.Screen name="Ensiklopedia" component={PestsList} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
