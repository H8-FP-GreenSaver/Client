import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../contexts/Auth";
import { useContext } from "react";
import * as SecureStore from 'expo-secure-store';


export default function ProfileScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  async function handleLogout() {
    let cek = await SecureStore.deleteItemAsync("access_token");
    authContext.setIsSignedIn(false);
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.headContainer}>
          <View style={styles.containerWave}>
            <Image
              source={require("../assets/Ideation Ellipse 31.png")}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>Alyssa</Text>
              <Text style={styles.username}>@alyssaroem</Text>
              <Text style={styles.role}>Pemula</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 58 }}>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Tanaman</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Forum</Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Unggahan</Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <TouchableOpacity onPress={handleLogout}>
            <View style={{ marginTop: 24, backgroundColor: "red", paddingVertical: 16, borderRadius: 8, flexDirection: "row", justifyContent: "center", gap: 8, overflow: "hidden", alignItems: "center" }}>
              <MaterialIcons name="logout" size={24} color="white" />
              <Text style={{ color: "white" }}>Logout</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.imageCard}>
            <Image source={require("../assets/Ideation Rectangle 38.png")} />
            <Image source={require("../assets/Ideation Rectangle 39.png")} />
            <Image source={require("../assets/Ideation Rectangle 40.png")} />
          </View>
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
    flex: 4,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#94C593",
  },
  backgroundImage: {
    zIndex: 0,
    flex: 12,
    height: 560,
    width: "100%",
    backgroundColor: "#94C593",
  },
  headContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  containerWave: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    // marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#fff",
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
    justifyContent: "space-between",
    padding: 30,
    gap: 5,
  },
});
