import Axios from "../utils/axios";
import { AuthContext } from "../contexts/Auth";
import * as SecureStore from "expo-secure-store";
import { useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const authContext = useContext(AuthContext)

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError("Email / Password is required");
        return;
      }
      
      // setLoading(true)
      const response = await Axios({
        url: "/users/login",
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      });

      if (response) {
        await SecureStore.setItemAsync(
          "access_token",
          response.data.access_token
        );

        // setLoading(false)
        const skill = response.data.skill

        if (skill) {
          authContext.setIsSignedIn(true);
          // navigation.navigate("Preferences1")
        } else {
          // await SecureStore.setItemAsync('temporary_access_token', response.data.access_token); 
          navigation.navigate("Preferences1"); 
        }
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else if (error.request) {
        setError("Network error. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      {/* {loading ?
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#86BA85" />
        </View>
        : */}

        <View style={styles.container}>
          <Image
            source={require("../assets/GreenSaver-logo.png")}
            style={styles.logo}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry
          />
          {/* <TouchableOpacity style={styles.lupaPassword}>
            <Text style={styles.lupaPasswordText}>Lupa Password?</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
          {/* <Text style={styles.atau}>atau</Text>
          <TouchableOpacity style={styles.buttonGoogle}>
            <Text style={styles.buttonTextGoogle}>Masuk dengan Google</Text>
          </TouchableOpacity> */}
          <View style={styles.registerContainer}>
            <Text style={styles.akun}>Belum punya akun?</Text>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.signInText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* } */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 88,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    // marginBottom: 20,
  },
  masuk: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    height: 40,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  lupaPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  lupaPasswordText: {
    color: "#0066cc",
  },
  button: {
    height: 40,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: "#86BA85",
    marginBottom: 24,
  },
  akun: {
    textAlign: "center",
    marginRight: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonGoogle: {
    height: 40,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#86BA85",
  },
  buttonTextGoogle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
    borderColor: "#86BA85",
  },
  atau: {
    fontSize: 18,
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    marginLeft: 5,
  },
  signInText: {
    color: "#0066cc",
  },
  errorText: {
    backgroundColor: "red",
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 4,
    color: "white",
    marginBottom: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});