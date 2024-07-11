import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/GreenSaver-logo.png")}
        style={styles.logo}
      />
      {/* <Text style={styles.masuk}>Masuk</Text> */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.lupaPassword}>
        <Text style={styles.lupaPasswordText}>Lupa Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Preferences1");
        }}
      >
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>
      <Text style={styles.atau}>atau</Text>
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.buttonTextGoogle}>Masuk dengan Google</Text>
      </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
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
    justifyContent: "center",
    backgroundColor: "#86BA85",
    marginBottom: 10,
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
});
