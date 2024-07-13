import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "../components/Dropdown";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Axios from "../utils/axios";


export default function Home({ navigation }) {
  // const [plant, setPlant] = useState([]);
  const [categories, setCategories] = useState([]);
  const plants = [
    {
      name: "Plant 1",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png",
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

  const fetchCategories = async () => {
    try {
      const { data } = await Axios({
        url: "/users/home",
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
        }
      })

      let categories = [];

      data.map(category => {
        categories.push(category.Plant.categoryId)
      })

      setCategories(categories)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  // console.log(categories)
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headContainer}>
          <View style={styles.containerWave}>
            <Text style={styles.containerWave.wave}>Selamat Pagi,</Text>
            <Text style={styles.containerWave.name}>Alyssa!</Text>
          </View>
          <TouchableOpacity style={[styles.addButton, styles.shadowProp]}>
            <Feather
              name="plus"
              size={28}
              padding={12}
              color="#86BA85"
              onPress={() => {
                navigation.navigate("List");
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 56 }}>
          {categories.map((category, index) => {
            return <Dropdown key={index} plants={plants} category={category} />
          })}
        </View>
      </View>
      <ImageBackground
        source={require("../assets/background-homepage.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    flex: 2,
    width: "100%",
    padding: 24,
    backgroundColor: "#E8E8E8",
  },
  backgroundImage: {
    zIndex: 0,
    flex: 7,
    height: 500,
    objectFit: "cover",
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
  headContainer: {
    flexDirection: "row",
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
});
