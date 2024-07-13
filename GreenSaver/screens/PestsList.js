import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { PestCard, PlantCard } from "../components/Card";
import * as SecureStore from 'expo-secure-store';
import Axios from "../utils/axios";

export default function PestsList({ navigation }) {
  const [pests, setPests] = useState([]);

  const fetchPests = async () => {
    try {
      const { data } = await Axios({
        url: "/pests/",
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
      <View
        style={{
          paddingHorizontal: 24,
          flex: 6,
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          backgroundColor: "#F8F8F8",
          // marginTop: 32,
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
            Hama
          </Text>
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
          // onChangeText={onChangeNumber}
          // value={number}
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
            {pests.map((pest, index) => {
              return <PestCard key={index} pest={pest} navigation={navigation} />;
            })}
          </View>
        </ScrollView>
      </View >
    </>
  );
}

const styles = StyleSheet.create({});
