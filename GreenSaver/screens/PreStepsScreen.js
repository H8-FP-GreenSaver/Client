import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons, Ionicons, Octicons } from "@expo/vector-icons";

export default function PreSteps({ navigation }) {
  const [category, setCategory] = useState("Tanaman Hias");
  const [rating, setRating] = useState([]);
  const plants = [
    {
      name: "Plant 1",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png",
      category: "Tanaman Hias",
      difficulty: 2,
      price: 50000,
      water: 250,
      temperature: 26,
      description:
        "Tanaman hias tropis dan subtropis yang berasal dari Jepang Selatan. Mawar Jambe merupakan salah satu tanaman yang saat ini sedang naik daun bagi para penggemar tanaman.",
      medium: "pot bunga",
      plantArea: "kecil",
      steps: [
        {
          name: "Siapkan media tanam",
          stepNumber: 1,
        },
        {
          name: "Siapkan tunas",
          stepNumber: 2,
        },
        {
          name: "Proses menanam",
          stepNumber: 3,
        },
      ],
    },
    {
      name: "Plant 2",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/027/254/678/small_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png",
    },
    {
      name: "Plant 3",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/027/254/690/non_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png",
    },
  ];

  let difficulty;

  if (plants[0].difficulty >= 1 && plants[0].difficulty < 3) {
    difficulty = "Mudah";
  } else if (plants[0].difficulty === 3) {
    difficulty = "Sedang";
  } else if (plants[0].difficulty > 3 && plants[0].difficulty <= 5) {
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
                {plants[0].difficulty}/5
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
                {plants[0].temperature}°C
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
          source={{ uri: plants[0].imageUrl }}
        />
      </View>
      <View style={{ backgroundColor: "white", flex: 4, padding: 24 }}>
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
              paddingHorizontal: 24,
              gap: 14,
              borderRadius: 8,
              marginBottom: 16,
              minWidth: "45%",
            }}
          >
            <MaterialCommunityIcons name="pitchfork" size={24} color="black" />
            <View>
              <Text>Media Tanam</Text>
              <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 8 }}>
                {plants[0].medium}
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
              minWidth: "45%",
            }}
          >
            <Octicons name="number" size={22} color="black" />
            <View>
              <Text>Luas Area</Text>
              <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 8 }}>
                {plants[0].plantArea}
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
          {plants[0].steps.map((step, index) => {
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
                    borderRadius: 5,
                  }}
                >
                  {step.stepNumber}
                </Text>
                <Text style={{ fontSize: 16, lineHeight: 28 }}>
                  {step.name}
                </Text>
              </View>
            );
          })}
        </View>
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
          navigation.navigate("Steps");
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