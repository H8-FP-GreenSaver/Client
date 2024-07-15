import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { CardLoader, PestCard, PlantCard } from "../components/Card";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";

export default function PestsList({ navigation }) {
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchPests = async (query = "") => {
    try {
      const { data } = await Axios({
        url: `/pests?search=${query}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      setPests(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPests();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    fetchPests(query);
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 24,
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
            {loading ?
              <>
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </>
              :
              pests.map((pest, index) => {
                return (
                  <PestCard key={index} pest={pest} navigation={navigation} loading={loading} />
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
