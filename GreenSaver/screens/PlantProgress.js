import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";
import { daysCounter } from "../helpers/timeConverter";
import { Ionicons } from "@expo/vector-icons";

export default function PlantProgress({ route, navigation }) {
  const { id } = route.params;
  const [plant, setPlant] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const daysInterval = plant.Plant?.wateringTime;
  const daysOfWeek = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const renderWaterdrops = () => {
    const waterdrops = [];

    for (let i = 0; i < 7; i++) {
      if (i % daysInterval === 0) {
        waterdrops.push(
          <Image
            key={i}
            style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }}
            source={require("../assets/icon-waterdrop-solid.png")}
          />
        );
      } else {
        waterdrops.push(
          <View key={i} style={{ padding: 9 }}>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "#E8E8E8",
                borderRadius: 16,
              }}
            />
          </View>
        );
      }
    }

    return waterdrops;
  };

  const fetchPlant = async () => {
    try {
      const { data } = await Axios({
        url: `/users/plant-detail/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      setPlant(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlant = async () => {
    try {
      await Axios({
        url: `users/plant-detail/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, []);

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
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 16, lineHeight: 28 }}>
              Tanaman {plant.Plant?.categoryId}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {plant.Plant?.plantName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ padding: 16, backgroundColor: "white", borderRadius: 50 }}
          >
            <Feather name="trash-2" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: 300,
            height: 300,
            zIndex: 0,
            objectFit: "cover",
            alignSelf: "flex-start",
            marginHorizontal: "auto",
          }}
          source={{ uri: plant.Plant?.imageUrl }}
        />
      </View>

      {/* --- Modal --- */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{ fontSize: 20, fontWeight: "500", marginBottom: 8 }}
              >
                Hapus tanaman ini?
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 8,
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                Progress tanaman ini akan dihapus secara permanen
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    backgroundColor: "#DFDFDF",
                    paddingVertical: 12,
                    width: "50%",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "gray",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Batal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deletePlant}
                  style={{
                    backgroundColor: "red",
                    paddingVertical: 12,
                    width: "50%",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Ya, Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ backgroundColor: "white", flex: 2, padding: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
                color: "#AFAFAF",
              }}
            >
              Penyiraman
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, fontWeight: "500" }}>1x</Text>
              <Text style={{ fontSize: 18, marginTop: 4, color: "#AFAFAF" }}>
                /{plant.Plant?.wateringTime} hari
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
                color: "#AFAFAF",
              }}
            >
              Umur
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text style={{ fontSize: 24, fontWeight: "500" }}>
                {daysCounter(plant?.createdAt)}
              </Text>
              <Text style={{ fontSize: 18, marginTop: 4, color: "#AFAFAF" }}>
                hari
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ height: 1, backgroundColor: "#D9D9D9", marginVertical: 24 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 40,
            color: "#AFAFAF",
          }}
        >
          Penyiraman
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 4,
              gap: 18,
              alignItems: "center",
            }}
          >
            {renderWaterdrops()}
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "45%",
                height: 3,
                backgroundColor: "#56CCF2",
                marginVertical: 24,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#56CCF2",
                borderRadius: 50,
              }}
            />
            <View
              style={{
                width: "50%",
                height: 3,
                backgroundColor: "#E8E8E8",
                marginVertical: 24,
                borderRadius: 8,
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {daysOfWeek.map((day, index) => (
              <Text
                key={index}
                style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}
              >
                {day}
              </Text>
            ))}
          </View>
        </View>
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
    paddingTop: 56,
    backgroundColor: "#E8E8E8",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  buttonBack: {
    marginRight: 10,
  },
});
