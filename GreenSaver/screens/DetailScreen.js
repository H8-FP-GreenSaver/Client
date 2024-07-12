import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Detail({ navigation }) {
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
            source={{ uri: plants[0].imageUrl }}
          />
        </View>
      </View>
      <View
        style={{ backgroundColor: "white", flex: 9, padding: 24, zIndex: 2 }}
      >
        <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
          {plants[0].name}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 16 }}>
          {plants[0].category}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../assets/rating-solid.png")} />
            <Image source={require("../assets/rating-solid.png")} />
            <Image source={require("../assets/rating-outline.png")} />
            <Image source={require("../assets/rating-outline.png")} />
            <Image source={require("../assets/rating-outline.png")} />
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
                Rp {new Intl.NumberFormat().format(plants[0].price)}
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
                {plants[0].water} ml
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
                {plants[0].temperature}°C
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
            Deskripsi
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 28 }}>
            Tanaman hias tropis dan subtropis yang berasal dari Jepang Selatan.
            Mawar Jambe merupakan salah satu tanaman yang saat ini sedang naik
            daun bagi para penggemar tanaman.
          </Text>
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
