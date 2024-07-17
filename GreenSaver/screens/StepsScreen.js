import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Steps({ route, navigation }) {
  const { id } = route.params;
  const itemsPerPage = 1;

  const [currentPage, setCurrentPage] = useState(0);
  const [steps, setSteps] = useState([]);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const fetchSteps = async () => {
    try {
      const { data } = await Axios({
        url: `/steps/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      setSteps(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPlant = async () => {
    try {
      await Axios({
        url: `/users/add-plant/${steps[0].Plant.id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < steps.length) {
      setCurrentPage(currentPage + 1);
    } else {
      handleAddPlant();
      navigation.navigate("Home");
    }
  };


  return (
    <>
      <View style={styles.mainContainer}>
        <Image
          style={{
            width: 200,
            height: 200,
            zIndex: 0,
            objectFit: "cover",
            marginHorizontal: "auto",
          }}
          source={{ uri: steps[currentPage]?.Step?.imageUrl }}
        />
      </View>

      <View style={{ backgroundColor: "white", flex: 4, padding: 24,  }}>
        <ScrollView>
          <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}>
            Langkah {currentPage + 1}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 16 }}>
            {steps[currentPage]?.Step?.stepName}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 28 }}>
            {steps[currentPage]?.Step?.description}
          </Text>
          {steps[currentPage]?.Step?.tips && (
            <View
              style={{
                backgroundColor: "#EFEDED",
                padding: 16,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <Feather name="info" size={18} color="#A5A5A5" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginBottom: 4,
                    color: "#A5A5A5",
                  }}
                >
                  Tips
                </Text>
              </View>
              <Text style={{ lineHeight: 28, fontSize: 16, marginStart: 28, marginBottom: 16 }}>
                {steps[currentPage]?.Step?.tips}
              </Text>
              {steps[currentPage]?.Step?.videoLink && (
                <View style={{marginStart: 28}}>
                  <YoutubePlayer
                    height={160}
                    play={playing}
                    videoId={steps[currentPage].Step.videoLink}
                    onChangeState={onStateChange}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        {currentPage > 0 ? (
          <TouchableOpacity
            onPress={handlePrevPage}
            style={{
              backgroundColor: "#86BA85",
              zIndex: 2,
              marginBottom: 16,
              marginEnd: "auto",
              borderRadius: 50,
            }}
          >
            <Feather name="chevron-left" padding={20} size={24} color="white" />
          </TouchableOpacity>
        ) : (
          ""
        )}
        {currentPage === steps.length - 1 ? (
          <TouchableOpacity
            onPress={handleNextPage}
            style={{
              backgroundColor: "#86BA85",
              zIndex: 2,
              marginBottom: 16,
              marginStart: "auto",
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              gap: 12,
            }}
          >
            <Feather name="check" size={24} color="white" />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
              Done
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNextPage}
            style={{
              backgroundColor: "#86BA85",
              // bottom: 8,
              // right: 24,
              marginBottom: 16,
              marginStart: "auto",
              borderRadius: 50,
              // position: "absolute",
              // elevation: 2
            }}
          >
            <Feather
              name="chevron-right"
              padding={20}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
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
});
