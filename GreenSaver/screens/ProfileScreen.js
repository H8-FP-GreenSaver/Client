import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from "../contexts/Auth";
import { useContext, useCallback, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";
import { Skeleton } from "moti/skeleton";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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

      return () => {
        setLoading(true);
      };
    }, [])
  );

  async function handleLogout() {
    await SecureStore.deleteItemAsync("access_token");
    // await SecureStore.deleteItemAsync("skill");
    await SecureStore.deleteItemAsync("temporary_access_token");
    authContext.setIsSignedIn(false);
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.containerWave}>
            <Skeleton colorMode="light" width={80} height={80} radius={"round"}>
              {loading ? null : (
                <View style={{ marginBottom: 16 }}>
                  <Image
                    source={{ uri: user.avatar }}
                    style={styles.profileImage}
                  />
                </View>
              )}
            </Skeleton>
            <View style={styles.userInfo}>
              <Skeleton colorMode="light" width={100} height={24} radius={8}>
                {loading ? null : (
                  <Text style={styles.name}>{user.fullName}</Text>
                )}
              </Skeleton>
              <Skeleton colorMode="light" width={150} height={20} radius={8}>
                {loading ? null : (
                  <Text style={styles.username}>{user.email}</Text>
                )}
              </Skeleton>
              <Skeleton colorMode="light" width={70} height={20} radius={8}>
                {loading ? null : <Text style={styles.role}>{user.skill}</Text>}
              </Skeleton>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 40, backgroundColor: "white", flex: 1, paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfileUser");
            }}
            style={{
              flexDirection: "row",
              marginTop: 24,
              padding: 16,
              backgroundColor: "#f7f7f7",
              borderRadius: 8,
            }}
          >
            <Text>Edit Profile</Text>
            <Entypo name="chevron-small-right" size={24} color="black" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FAQ");
            }}
            style={{
              flexDirection: "row",
              marginTop: 16,
              padding: 16,
              backgroundColor: "#f7f7f7",
              borderRadius: 8,
            }}
          >
            <Text>FAQ</Text>
            <Entypo name="chevron-small-right" size={24} color="black" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginTop: 16,
              padding: 16,
              backgroundColor: "#f7f7f7",
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate("MeetDevelopers");
            }}
          >
            <Text>Meet the Developers</Text>
            <Entypo name="chevron-small-right" size={24} color="black" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{
                marginTop: 24,
                backgroundColor: "red",
                paddingVertical: 16,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
                overflow: "hidden",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("EditProfileUser");
              }}
            >
              <MaterialIcons name="logout" size={24} color="white" />
              <Text style={{ color: "white" }}>Logout</Text>
            </View>
          </TouchableOpacity>
          {/* <View style={styles.imageCard}>
            <Image source={require("../assets/Ideation Rectangle 38.png")} />
            <Image source={require("../assets/Ideation Rectangle 39.png")} />
            <Image source={require("../assets/Ideation Rectangle 40.png")} />
          </View> */}
          <Text style={{ textAlign: "center", marginTop: 24, color: "#CDCDCD", fontWeight: "500" }}>App Version 1.0.0</Text>
        </View>
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
    // zIndex: 1,
    flex: 4,
    width: "100%",
    // paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#94C593",
  },
  containerWave: {
    alignItems: "center",
    width: "100%"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignSelf: "center",
    borderColor: "#fff",
    objectFit: "cover",
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
    // marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
    // marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#396D5E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 4,
    overflow: "hidden",
    borderRadius: 5,
    alignSelf: "center"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "#F5F4F4",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  statLabel: {
    fontSize: 14,
    color: "#222",
  },
  horizontalLine: {
    marginTop: 18,
    height: 2,
    backgroundColor: "#B4B4B4",
    width: "100%",
    alignSelf: "center",
  },
  imageCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    paddingTop: 24,
    gap: 16,
  },
});
