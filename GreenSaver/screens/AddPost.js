import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import Axios from "../utils/axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// import { firebase } from "@react-native-firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/Auth";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";


export default function AddPost({ navigation }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [img, setImg] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [convertedImage, setConvertedImage] = useState(null);

  const authContext = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const { data } = await Axios({
        url: '/users/user-profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            'access_token'
          )}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const uploadViaCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (permission.granted) {
        let result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        let localUri = result.assets[0].uri;
        let filename = localUri.split("/").pop();

        // Infer the type of the image
        let match = /.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        setImg({ uri: localUri, name: filename, type });
        // fullName,
        //   profileUrl,
        //   threadCaption,
        // let formData = new FormData();
        // formData.append("file", { uri: localUri, name: filename, type });
        // formData.append("fullName", user.name);
        // formData.append("profileUrl", user.avatar);
        // formData.append("threadCaption", caption);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error)
    }
    // try {
    //   const permission = await ImagePicker.requestCameraPermissionsAsync();

    //   if (permission.granted) {
    //     let result = await ImagePicker.launchCameraAsync({
    //       cameraType: ImagePicker.CameraType.back,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });

    //     if (!result.cancelled) {
    //       setImage(result.assets[0].uri);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const uploadViaGallery = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      // console.log(type, localUri, filename, "<<<<<");

      setImg({ uri: localUri, name: filename, type });
      // fullName,
      //   profileUrl,
      //   threadCaption,
      // let formData = new FormData();
      // formData.append("file", { uri: localUri, name: filename, type });
      // formData.append("fullName", user.name);
      // formData.append("profileUrl", user.avatar);
      // formData.append("threadCaption", caption);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const fileSystem = async () => {
    try {
      if (image) {
        const { uri } = await FileSystem.getInfoAsync(image);

        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Oops! Something's wrong!"));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });

        const fileName = image.substring(image.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(fileName);

        await ref.put(blob);
        console.log(ref);
        return await ref.getDownloadURL();

      }
    } catch (error) {
      console.log(error);
      setUploading(false);
      throw error;
    }
  };

  // console.log(image);

  const handleSubmitPost = async () => {
    try {
      console.log(img, user, caption);
      let formData = new FormData();
      formData.append("file", img);
      formData.append("fullName", user.fullName);
      formData.append("profileUrl", user.avatar);
      formData.append("threadCaption", caption);

      const res = await Axios({
        url: `/forums`,
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data, "<--- hoi");
      navigation.navigate("Forum");
      // setUser(data);
      // setLoading(false);
    } catch (error) {
      console.log(error, "<--- hei");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     setUploading(true);
  //     const imageUrl = await fileSystem();
  //     const postData = {
  //       fullName: user.fullName,
  //       profileUrl: user.avatar || "https://example.com/default-avatar.png",
  //       threadCaption: caption,
  //       imageUrl: image,
  //       createdAt: new Date(),
  //     };

  //     await addDoc(collection(database, "threads"), postData);
  //     setCaption("");
  //     setImage(null);
  //     setUploading(false);
  //     navigation.goBack();
  //   } catch (error) {
  //     console.log(error);
  //     setUploading(false);
  //   }
  // };

  return (
    <>
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
      <View style={{ padding: 24 }}>
        <View style={{ marginBottom: 16 }}>
          {image ? (
            <>
              <TouchableOpacity>
                <Image
                  source={{ uri: image }}
                  style={{ width: '100%', height: 250, borderRadius: 8 }}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                <TouchableOpacity
                  onPress={() => {
                    setImage(null);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: '#ff5f5c',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      paddingVertical: 12,
                    }}
                  >
                    Hapus
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={uploadViaGallery}
                  style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    paddingVertical: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Via Galeri
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={uploadViaCamera}
                  style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    paddingVertical: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Via Kamera
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 250,
                  backgroundColor: 'lightgray',
                  borderRadius: 8,
                }}
                onPress={uploadViaGallery}
              >
                <MaterialCommunityIcons
                  name="file-image-plus-outline"
                  size={64}
                  color="darkgray"
                />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                <TouchableOpacity
                  onPress={uploadViaGallery}
                  style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    paddingVertical: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Via Galeri
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={uploadViaCamera}
                  style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    paddingVertical: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ textAlign: 'center', color: 'white' }}>
                    Via Kamera
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
        <View style={{ marginVertical: 16 }}>
          <Text style={{ paddingHorizontal: 8, marginBottom: 8 }}>Caption</Text>
          <TextInput
            placeholder="Caption Post"
            style={{
              alignSelf: 'flex-start',
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 12,
              width: '100%',
            }}
            multiline={true}
            numberOfLines={2}
            onChangeText={setCaption}
            value={caption}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#86BA85',
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 32,
          }}
          onPress={handleSubmitPost}
          disabled={uploading}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {uploading ? 'Uploading...' : 'Kirim'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
//       <TouchableOpacity

//         style={{
//           backgroundColor: '#86BA85',
//           paddingVertical: 16,
//           borderRadius: 8,
//           alignItems: 'center',
//           marginBottom: 32,
//         }}
//         // style={styles.button}
//         onPress={handleSubmitPost}
//         disabled={uploading}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>
//           {uploading ? 'Uploading...' : 'Kirim'}
//         </Text>
//       </TouchableOpacity>
//     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  textArea: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 150,
    fontSize: 16,
    textAlignVertical: "top",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: "100%",
    height: 250,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: "lightgray",
    borderStyle: "dashed",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  errorText: {
    backgroundColor: "red",
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    borderRadius: 4,
    color: "white",
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 45,
  },
});
