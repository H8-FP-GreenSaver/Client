import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Dropdown } from "../components/Dropdown";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [plants, setPlants] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const { data } = await Axios({
        url: `/users/user-profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
    }, [])
  );

  console.log(user);
  const fetchPlants = async () => {
    try {
      const { data } = await Axios({
        url: "/users/home",
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      let tempArr = [];

      if (data["1"]) {
        tempArr.push(data["1"]);
      }

      if (data["2"]) {
        tempArr.push(data["2"]);
      }

      if (data["3"]) {
        tempArr.push(data["3"]);
      }

      if (data["4"]) {
        tempArr.push(data["4"]);
      }

      if (data["5"]) {
        tempArr.push(data["5"]);
      }

      setPlants(tempArr);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlants();
    }, [])
  );

  // useEffect(() => {
  //   fetchPlants();
  // }, [])

  return (
    <>
      <View style={styles.mainContainer}>
          {/* <Image source={{ uri: user.avatar }} style={styles.profileImage} /> */}
        <View style={styles.headContainer}>
          <View style={styles.containerWave}>
            <Text style={styles.containerWave.wave}>Welcome,</Text>
            <Text style={styles.containerWave.name}>{user.fullName}!</Text>
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
        <ScrollView>
          <View style={{ paddingHorizontal: 24 }}>
            {plants &&
              plants.map((plant, index) => {
                return (
                  <Dropdown key={index} plant={plant} navigation={navigation} />
                );
              })}
          </View>
        </ScrollView>
      </View>
      {/* <ImageBackground
        source={require("../assets/background-homepage.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    flex: 2,
    width: "100%",
    // padding: 24,
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
    marginVertical: 16,
    paddingHorizontal: 24,
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
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
});
