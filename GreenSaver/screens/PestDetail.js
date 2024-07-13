import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Axios from "../utils/axios";

export default function PestDetail({ route, navigation }) {
  const [pests, setPests] = useState({})
  const { id } = route.params;

  const icons = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= pests.dangerLevel) {
      icons.push(
        <FontAwesome5 key={i} name="book-dead" size={18} color="red" />
      );
    } else {
      icons.push(
        <FontAwesome5 key={i} name="book-dead" size={18} color="lightgray" />
      );
    }
  }

  const fetchPests = async () => {
    try {
      const { data } = await Axios({
        url: `/pests/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("access_token")}`
        }
      })

      setPests(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPests();
  }, [])

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
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 250,
          }}
        >
          <Image
            style={{ width: 300, height: 200, objectFit: "cover" }}
            source={{ uri: pests.imageUrl }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 8 }}>
              {pests.pestName}
            </Text>
            <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
              {icons}
            </View>
          </View>
          <Text style={{ fontSize: 16, lineHeight: 28, marginTop: 24 }}>
            {pests.description}
          </Text>
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Sering ditemukan pada:
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  backgroundColor: "#DBF0DA",
                  color: "#689867",
                  borderRadius: 8,
                }}
              >
                {pests.plantId}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonBack: {
    marginRight: 10,
  },
});