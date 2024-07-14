import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Axios from "../utils/axios";
import * as SecureStore from 'expo-secure-store';
import { PlantCard } from "../components/Card";
import { Skeleton } from "moti/skeleton";

export default function List({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAllPlants = async (query = '') => {
    try {
      const { data } = await Axios({
        url: `/plants?search=${query}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
        }
      })

      setPlants(data);
      setLoading(false);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllPlants();
  }, [])

  const handleSearch = (query) => {
    setSearch(query);
    fetchAllPlants(query);
  };

  const userPreference = {
    preference: ["Tanaman Hias", "Tanaman Buah"],
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headContainer}>
          <View style={styles.containerWave}>
            <Text style={styles.containerWave.wave}>Selamat Pagi,</Text>
            <Text style={styles.containerWave.name}>Alyssa!</Text>
          </View>
          <TouchableOpacity style={[styles.addButton, styles.shadowProp]}>
            <Feather name="x" size={28} padding={12} color="#86BA85" onPress={() => {
              navigation.goBack()
            }} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          flex: 6,
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          backgroundColor: "#F8F8F8",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}
          >
            Menanam
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
              paddingVertical: 8,
            }}
          >
            <Feather
              name="star"
              size={14}
              color="#edc553"
              style={{ marginRight: 4 }}
            />
            <Text>= Recommended</Text>
          </View>
        </View>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            padding: 16,
            marginBottom: 24,
            borderRadius: 8,
            borderColor: "lightgray",
          }}
          onChangeText={handleSearch}
          value={search}
          placeholder="Search here.."
          keyboardType="text"
        />
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              borderTopStartRadius: 24,
              borderTopEndRadius: 24,
            }}
          >
            {plants.map((plant, index) => {
              return (
                <PlantCard
                  key={index}
                  plant={plant}
                  userPreference={userPreference}
                  navigation={navigation}
                  loading={loading}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#E8E8E8",
  },
  headContainer: {
    flexDirection: "row",
    marginTop: 40,
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