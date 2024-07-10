import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Text, TouchableOpacity } from "react-native";
import Home from "../screens/HomeScreen";
import ForumScreen from "../screens/ForumScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="log-out-outline" size={28} color="#ff0000" />
          </TouchableOpacity>
        ),
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
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
