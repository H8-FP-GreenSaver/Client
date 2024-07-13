import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Preferences2({ navigation }) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonPress = (button) => {
    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(button)) {
        return prevSelectedButtons.filter((item) => item !== button);
      } else {
        return [...prevSelectedButtons, button];
      }
    });
  };

  const handleNextPress = () => {
    if (selectedButtons.length > 0) {
      navigation.navigate("GreenSaver");
    } else {
      alert("Please select at least one option");
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
        {["Hias", "Sayur", "Rumput", "Obat", "Buah"].map((button) => (
          <TouchableOpacity
            key={button}
            style={[
              styles.buttonChecked,
              selectedButtons.includes(button) && styles.buttonSelected,
            ]}
            onPress={() => handleButtonPress(button)}
          >
            {selectedButtons.includes(button) && (
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
                selectedButtons.includes(button) && styles.buttonTextSelected,
              ]}
            >
              {button}
            </Text>
            {selectedButtons.includes(button) && (
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