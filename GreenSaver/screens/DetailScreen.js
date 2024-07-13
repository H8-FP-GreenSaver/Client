import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Axios from "../utils/axios";

export default function Detail({ route, navigation }) {
  const { id } = route.params;
  const [plant, setPlant] = useState([]);

  const fetchPlant = async () => {
    try {
      const { data } = await Axios({
        url: `/plants/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
        }
      })

      setPlant(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPlant();
  }, [])

  let difficulty;

  if (plant.difficulty >= 1 && plant.difficulty < 3) {
    difficulty = "Mudah";
  } else if (plant.difficulty === 3) {
    difficulty = "Sedang";
  } else if (plant.difficulty > 3 && plant.difficulty <= 5) {
    difficulty = "Sulit";
  }

  const icons = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= plant.difficulty) {
      icons.push(
        <Image key={i} source={require("../assets/rating-solid.png")} />
      );
    } else {
      icons.push(
        <Image key={i} source={require("../assets/rating-outline.png")} />
      );
    }
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.buttonBack}
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headContainer}>
          <Image
            style={{ width: 400, height: 400, flex: 1 }}
            source={{ uri: plant.imageUrl }}
          />
        </View>
      </View>
      <View
        style={{ backgroundColor: "white", flex: 9, padding: 24, zIndex: 2 }}
      >
        <ScrollView>

          <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
            {plant.plantName}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            Tanaman {plant.Category?.categoryName}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: "#BBE7BA",
                color: "#3D3D3D",
                borderRadius: 8,
                width: "auto",
                marginRight: 12,
              }}
            >
              {difficulty}
            </Text>
            {/* <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
              {icons}
            </View> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {icons}
            </View>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FBFBFB",
                padding: 24,
                gap: 8,
                borderRadius: 8,
                marginBottom: 16,
                minWidth: "45%",
              }}
            >
              <Image source={require("../assets/icon-money.png")} />
              <View>
                <Text>Harga (Bibit)</Text>
                <Text style={{ fontWeight: "500", fontSize: 18 }}>
                  Rp {new Intl.NumberFormat().format(plant.estimatePrice)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FBFBFB",
                padding: 24,
                gap: 8,
                borderRadius: 8,
                marginBottom: 16,
                minWidth: "45%",
              }}
            >
              <Ionicons name="water-outline" size={24} color="black" />
              <View>
                <Text>Harga (Bibit)</Text>
                <Text style={{ fontWeight: "500", fontSize: 18 }}>
                  {plant.estimateWater} ml
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FBFBFB",
                padding: 24,
                gap: 8,
                borderRadius: 8,
                marginBottom: 16,
                minWidth: "48%",
              }}
            >
              <Image source={require("../assets/icon-temperature.png")} />
              <View>
                <Text>Suhu</Text>
                <Text style={{ fontWeight: "500", fontSize: 18 }}>
                  {plant.estimateTemperature}°C
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
              Deskripsi
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 28 }}>
              {plant.description}
            </Text>
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#86BA85",
          zIndex: 2,
          padding: 20,
          width: "90%",
          marginBottom: 24,
          marginHorizontal: "auto",
          borderRadius: 16,
        }}
        onPress={() => {
          navigation.navigate("PreSteps");
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
            color: "white",
          }}
        >
          Tanam
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    flex: 4,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#94C593",
  },
  backgroundImage: {
    zIndex: 0,
    flex: 12,
    height: 500,
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
  headContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  containerWave: {
    marginRight: "auto",
    wave: {
      fontSize: 16,
    },
    name: {
      fontSize: 20,
      fontWeight: "500",
    },
  },
  addButton: {
    borderRadius: 28,
    backgroundColor: "white",
  },
  shadowProp: {
    elevation: 8,
    shadowColor: "#3F3F3F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  buttonBack: {
    marginRight: 10,
  },
});
