import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Axios from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../contexts/Auth";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileUser({ navigation }) {
  const { isSignedIn } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [skill, setSkill] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await Axios({
          url: "/users/user-profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "access_token"
            )}`,
          },
        });

        setFullName(data.fullName);
        setSkill(data.skill);
        setAvatar(data.avatar);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const updateUserProfile = async () => {
    try {
      const { data } = await Axios({
        url: "/users/user-profile/edit-profile",
        method: "PUT",
        data: {
          fullName,
          skill,
          avatar,
        },
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      if (data) {
        Alert.alert("Success", "User profile is updated");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.mainContainer}></View>
      <Image
        source={{ uri: avatar || "https://via.placeholder.com/100" }}
        style={styles.avatar}
      />
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Skill"
        value={skill}
        onChangeText={setSkill}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={setAvatar}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Update Profile"
          onPress={updateUserProfile}
          color="#6200EE"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  mainContainer: {
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  buttonBack: {
    marginRight: 10,
  },
});
