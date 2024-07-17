import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Ionicons, Octicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Axios from "../utils/axios";
import { ScrollView } from "moti";

export default function PreSteps({ route, navigation }) {
  const { id } = route.params;

  const [plant, setPlant] = useState([]);
  const [steps, setSteps] = useState([])

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

  const fetchSteps = async () => {
    try {
      const { data } = await Axios({
        url: `/steps/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
        }
      })

      setSteps(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPlant();
    fetchSteps();
  }, []);

  let difficulty;

  if (plant.difficulty >= 1 && plant.difficulty < 3) {
    difficulty = "Mudah";
  } else if (plant.difficulty === 3) {
    difficulty = "Sedang";
  } else if (plant.difficulty > 3 && plant.difficulty <= 5) {
    difficulty = "Sulit";
  }


  return (
    <>
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
      <View style={styles.mainContainer}>
        <View style={{ gap: 24, justifyContent: "center" }}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View
              style={{
                backgroundColor: "#E4FFE3",
                padding: 14,
                borderRadius: 50,
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../assets/rating-solid-md.png")}
              />
            </View>
            <View>
              <Text style={{ color: "white", marginBottom: 6, fontSize: 16 }}>
                {difficulty}
              </Text>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
                {plant.difficulty}/5
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View
              style={{
                backgroundColor: "#E4FFE3",
                padding: 14,
                borderRadius: 50,
              }}
            >
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../assets/icon-temperature-green.png")}
              />
            </View>
            <View>
              <Text style={{ color: "white", marginBottom: 6, fontSize: 16 }}>
                Suhu
              </Text>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
                {plant.estimateTemperature}°C
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={{
            width: 200,
            height: 200,
            zIndex: 0,
            objectFit: "cover",
            marginStart: "auto",
          }}
          source={{ uri: plant.imageUrl }}
        />
      </View>

      <View style={{ backgroundColor: "white", flex: 4, padding: 24 }}>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 16 }}>
            Persiapan
          </Text>
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
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 14,
                borderRadius: 8,
                marginBottom: 16,
                width: "47%",
              }}
            >
              <MaterialCommunityIcons name="pitchfork" size={20} color="black" />
              <View>
                <Text>Media Tanam</Text>
                <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 8 }}>
                  {plant.medium}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FBFBFB",
                paddingVertical: 16,
                paddingHorizontal: 24,
                gap: 14,
                borderRadius: 8,
                marginBottom: 16,
                width: "47%",
              }}
            >
              <Octicons name="number" size={22} color="black" />
              <View>
                <Text>Luas Area</Text>
                <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 8 }}>
                  {plant.plantArea}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginTop: 8,
                marginBottom: 20,
              }}
            >
              Langkah-Langkah
            </Text>
            {steps.map((step, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 16,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 14,
                      backgroundColor: "#94C593",
                      color: "white",
                      overflow: "hidden",
                      borderRadius: 18,
                    }}
                  >
                    {step.Step.stepNumber}
                  </Text>
                  <Text style={{ fontSize: 16, lineHeight: 28 }}>
                    {step.Step.stepName}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={{ backgroundColor: "white" }}>
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
            navigation.navigate("Steps", { id: plant.id });
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
            Mulai
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    flex: 2,
    padding: 24,
    width: "100%",
    paddingTop: 90,
    flexDirection: "row",
    backgroundColor: "#94C593",
  },
  backgroundImage: {
    zIndex: 0,
    flex: 12,
    height: 500,
    width: "100%",
    backgroundColor: "#E8E8E8",
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
    position: "absolute",
    top: 60,
    left: 30,
    zIndex: 10,
  },
  buttonBack: {
    marginRight: 10,
  },
});