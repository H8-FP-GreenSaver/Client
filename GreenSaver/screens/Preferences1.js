import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function Preferences1({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleNextPress = () => {
    if (selectedButton !== null) {
      navigation.navigate("Preferences2");
    } else {
      alert("Please select an option");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/headbar.png")} style={styles.logo} />
      <Image
        source={require("../assets/Ideation Tanaman5.png")}
        style={styles.picture}
      />
      <View style={styles.boxUser}>
        <Text style={styles.name}>Halo, Alyssa!</Text>
        <Text style={styles.greetings}>Sudah sejauh mana anda berkebun?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.buttonChecked,
              selectedButton === "smileo" && styles.buttonSelected,
            ]}
            onPress={() => handleButtonPress("smileo")}
          >
            <AntDesign name="smileo" size={32} color="#86BA85" />
          </TouchableOpacity>
          <Text style={styles.label}>Pemula</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.buttonChecked,
              selectedButton === "face-smile-beam" && styles.buttonSelected,
            ]}
            onPress={() => handleButtonPress("face-smile-beam")}
          >
            <FontAwesome6 name="face-smile-beam" size={32} color="#86BA85" />
          </TouchableOpacity>
          <Text style={styles.label}>Menengah</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.buttonChecked,
              selectedButton === "smiley" && styles.buttonSelected,
            ]}
            onPress={() => handleButtonPress("smiley")}
          >
            <Fontisto name="smiley" size={32} color="#86BA85" />
          </TouchableOpacity>
          <Text style={styles.label}>Ahli</Text>
        </View>
      </View>
      <View style={styles.nextContainer}>
        <TouchableOpacity style={styles.buttonNext} onPress={handleNextPress}>
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
    width: "50%",
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
