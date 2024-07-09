import { Image, StyleSheet, TextInput, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/youtube-logo.png")}
        style={styles.logo}
      />
      <TextInput
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 30,
  },
});
