import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Axios from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function EditProfileUser({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  const [skill, setSkill] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = ['Pemula', 'Menengah', 'Ahli'];

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
        setAvatar(data.avatar);
        setSkill(data.skill);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setIsOpen(!isOpen);
  };

  const selectItem = (item) => {
    setSkill(item);
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const updateUserProfile = async () => {
    try {
      if (!fullName) {
        return setError("Nama harus diisi");
      } else if (!skill) {
        return setError("Skill harus diisi");
      }

      if (!avatar) {
        setAvatar("https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg");
      }

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
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      return setError("Error", "Failed to update profile");
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
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: avatar || "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Edit Profile</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Nama</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Skill</Text>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={[styles.dropdownHeader, styles.shadowProp]}
          >
            <Text style={styles.headerText}>{skill}</Text>
            <Feather
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={24}
              color="#3D3D3D"
            />
          </TouchableOpacity>
          {dropdownOpen && (
            <View style={styles.dropdownList}>
              <ScrollView>
                {dropdownItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectItem(item)}
                    style={styles.optionItem}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Foto Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Avatar URL"
            value={avatar}
            onChangeText={setAvatar}
          />
        </View>
        <TouchableOpacity
          onPress={updateUserProfile}
          style={{ paddingVertical: 16, backgroundColor: "#86BA85", borderRadius: 8 }}
        >
          <Text style={{fontSize: 16, textAlign: "center", fontWeight: "500", color: "white"}}>Update Profile</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
        </View>
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  },
  buttonBack: {
    marginRight: 10,
  },
  errorText: {
    backgroundColor: "red",
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 4,
    color: "white",
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 24,
    backgroundColor: "white",
    borderRadius: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    zIndex: 1,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  headerText: {
    flex: 1,
    fontSize: 16,
  },
  dropdownList: {
    maxHeight: 150,
    borderTopColor: "white",
    borderLeftColor: "#ccc",
    borderBottomColor: "#ccc",
    borderRightColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
  },
  optionItem: {
    borderColor: "#ccc",
    fontSize: 16,
    padding: 10,
  }
});
