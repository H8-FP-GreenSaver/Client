import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Axios from "../utils/axios";
import { AuthContext } from "../contexts/Auth";
import * as SecureStore from "expo-secure-store";

export default function Preferences2({ navigation }) {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const authContext = useContext(AuthContext);

  const buttonData = [
    { id: 1, label: "Hias" },
    { id: 2, label: "Sayur" },
    { id: 3, label: "Rumput" },
    { id: 4, label: "Obat" },
    { id: 5, label: "Buah" },
  ];

  const handleButtonPress = (id) => {
    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(id)) {
        return prevSelectedButtons.filter((item) => item !== id);
      } else {
        return [...prevSelectedButtons, id];
      }
    });
  };

  const handleAddPreferences = async () => {
    try {
      if (selectedButtons.length === 0) {
        alert("Please select an option");
      } else {
        await Axios({
          url: "/users/user-preferences/add",
          method: "POST",
          data: {
            categoryIds: selectedButtons,
          },
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        });

        authContext.setIsSignedIn(true);
        navigation.navigate("GreenSaver");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/headbar2.png")} style={styles.logo} />
      <Image
        source={require("../assets/Tanaman 3.png")}
        style={styles.picture}
      />
      <View style={styles.boxUser}>
        <Text style={styles.name}>Suka tanaman apa?</Text>
        <Text style={styles.greetings}>
          Pilih kategori tanaman yang anda suka
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttonData.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[
              styles.buttonChecked,
              selectedButtons.includes(button.id) && styles.buttonSelected,
            ]}
            onPress={() => handleButtonPress(button.id)}
          >
            {selectedButtons.includes(button.id) && (
              <AntDesign
                name="check"
                size={16}
                color="#fff"
                style={styles.iconLeft}
              />
            )}
            <Text
              style={[
                styles.buttonText,
                selectedButtons.includes(button.id) &&
                  styles.buttonTextSelected,
              ]}
            >
              {button.label}
            </Text>
            {selectedButtons.includes(button.id) && (
              <AntDesign
                name="close"
                size={16}
                color="#fff"
                style={styles.iconRight}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.nextContainer}>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={handleAddPreferences}
        >
          <AntDesign name="right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  picture: {
    alignSelf: "center",
    marginBottom: 20,
  },
  boxUser: {
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  greetings: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
  },
  buttonChecked: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#86BA85",
    borderRadius: 5,
    margin: 5,
  },
  buttonSelected: {
    backgroundColor: "#86BA85",
  },
  buttonText: {
    fontSize: 16,
    color: "#222",
  },
  buttonTextSelected: {
    color: "#fff",
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
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
