import React, { useState } from "react";
import Axios from "../utils/axios";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [name, onChangeName] = useState(null);
  const [email, onChangeEmail] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await Axios({
        url: "/users/register",
        method: "POST",
        data: {
          fullName: name,
          email: email,
          password: password
        }
      })
  
      if (result) {
        navigation.navigate("Login")
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/GreenSaver-logo.png")}
        style={styles.logo}
      />
      {/* <Text style={styles.masuk}>Daftar</Text> */}
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        onChangeText={onChangeName}
        value={name}
      />
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
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, checked && styles.checkedCheckbox]}
          onPress={() => setChecked(!checked)}
        />
        <Text style={styles.checkboxLabel}>
          Dengan mendaftar saya menyetujui syarat dan ketentuan privasi keamanan
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>
      <Text style={styles.atau}>atau</Text>
      <TouchableOpacity style={styles.buttonGoogle}>
        <Text style={styles.buttonTextGoogle}>Masuk dengan Google</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.akun}>Sudah punya akun?</Text>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.signInText}>Masuk nih</Text>
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
    // marginBottom: 20,
  },
  masuk: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 50,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#86BA85",
  },
  checkboxLabel: {
    color: "black",
    flex: 1,
    flexWrap: "wrap",
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
