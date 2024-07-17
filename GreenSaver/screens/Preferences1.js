import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Axios from "../utils/axios";
import * as SecureStore from "expo-secure-store";

export default function Preferences1({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [error, setError] = useState(null)

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleUpdateSkill = async () => {
    try {
      if (!selectedButton) {
        return setError("Silahkan memilih salah satu");
      } else {
        let response = await Axios({
          url: "/users/user-profile/update-skill",
          method: "PATCH",
          data: {
            skill: selectedButton,
          },
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
          }
        })

        navigation.navigate("Preferences2");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else if (error.request) {
        setError("Network error. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require("../assets/progress-bar-1.png")} style={styles.logo} />
        <Image
          source={require("../assets/Ideation Tanaman5.png")}
          style={styles.picture}
        />
        <View style={styles.boxUser}>
          <Text style={styles.name}>Halo!</Text>
          <Text style={styles.greetings}>Sudah sejauh mana anda berkebun?</Text>
        </View>
        {error &&
          <Text style={{ color: "red", fontSize: 16, marginBottom: 16, marginLeft: 40 }}>Silahkan memilih salah satu</Text>
        }
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.buttonChecked,
                selectedButton === "Pemula" && styles.buttonSelected,
              ]}
              onPress={() => handleButtonPress("Pemula")}
            >
              <AntDesign name="smileo" size={32} color="#86BA85" />
            </TouchableOpacity>
            <Text style={styles.label}>Pemula</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.buttonChecked,
                selectedButton === "Menengah" && styles.buttonSelected,
              ]}
              onPress={() => handleButtonPress("Menengah")}
            >
              <FontAwesome6 name="face-smile-beam" size={32} color="#86BA85" />
            </TouchableOpacity>
            <Text style={styles.label}>Menengah</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[
                styles.buttonChecked,
                selectedButton === "Ahli" && styles.buttonSelected,
              ]}
              onPress={() => handleButtonPress("Ahli")}
            >
              <Fontisto name="smiley" size={32} color="#86BA85" />
            </TouchableOpacity>
            <Text style={styles.label}>Ahli</Text>
          </View>
        </View>
        <View style={styles.nextContainer}>
          <TouchableOpacity style={styles.buttonNext} onPress={handleUpdateSkill}>
            <AntDesign name="right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 250,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  picture: {
    alignSelf: "center",
    marginBottom: 20,
  },
  boxUser: {
    width: "75%",
    justifyContent: "center",
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
    marginTop: 10,
  },
  greetings: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "80%",
  },
  buttonWrapper: {
    alignItems: "center",
  },
  buttonChecked: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "#86BA85",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonSelected: {
    backgroundColor: "#e0f7e0",
  },
  buttonText: {
    color: "#222",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: "#86BA85",
  },
  nextContainer: {
    alignItems: "flex-end",
    marginTop: 10,
    marginEnd: 20,
  },
  buttonNext: {
    marginTop: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#86BA85",
    justifyContent: "center",
    alignItems: "center",
  },
});