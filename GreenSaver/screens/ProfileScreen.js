import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text>Testing</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/bg.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 3,
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: "#86BA85",
  },
  headContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  backgroundImage: {
    zIndex: 0,
    flex: 16,
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
});
