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
import { useEffect, useState } from "react";
// import { PestCard, PlantCard } from "../components/Card";
// import * as SecureStore from "expo-secure-store";
// import Axios from "../utils/axios";
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system";
// import { firebase } from "@react-native-firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddPost({ navigation }) {
    const [name, onChangeName] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [password, onChangePassword] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const uploadViaCamera = async () => {
        try {
            const permission = await ImagePicker.requestCameraPermissionsAsync();

            if (permission) {
                let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1
                })

                if (!result.canceled) {
                    setImage(result.assets[0].uri)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uploadViaGallery = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
    
            if (!result.canceled) {
                setImage(result.assets[0].uri)
            }
        }
    }

    const uploadMedia = async () => {
        setUploading(true);
    }

    const fileSystem = async () => {
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                }
                xhr.onerror = (e) => {
                    reject(new TypeError("Oops! Something's wrong!"))
                }
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null)
            })

            const fileName = image.substring(image.lastIndexOf("/") + 1);
            const ref = firebase.storage().ref().child(fileName);

            await ref.put(blob);
            setUploading(false);
            Alert.alert("Photo Uploaded!")

        } catch (error) {
            console.log(error);
            setUploading(false)
        }
    }

    const handleSubmit = async () => {
        try {
            // integrasi sama firestore

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 16, marginTop: 40, }}>
                {image ?
                    <>
                        <TouchableOpacity>
                            <Image source={{ uri: image }} style={{ width: "100%", height: 250, borderRadius: 8 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                            <TouchableOpacity
                                onPress={() => { setImage(null) }}
                                style={{ flex: 1, backgroundColor: "#ff5f5c", borderRadius: 8 }}
                            >
                                <Text style={{ textAlign: "center", color: "white", paddingVertical: 12 }}>Hapus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={uploadViaGallery}
                                style={{ flex: 1, backgroundColor: "red", paddingVertical: 12, borderRadius: 8, backgroundColor: "gray" }}
                            >
                                <Text style={{ textAlign: "center", color: "white" }}>Via Galeri</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={uploadViaCamera}
                                style={{ flex: 1, backgroundColor: "red", paddingVertical: 12, borderRadius: 8, backgroundColor: "gray" }}
                            >
                                <Text style={{ textAlign: "center", color: "white" }}>Via Kamera</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <TouchableOpacity style={{ width: "100%", height: 250, borderWidth: 3, borderRadius: 8, borderColor: "lightgray", borderStyle: "dashed", backgroundColor: "#F5F5F5", justifyContent: "center", }} onPress={uploadViaGallery}>
                            <View style={{ alignItems: "center" }}>
                                <MaterialCommunityIcons name="file-image-plus-outline" size={64} color="lightgray" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
                            <TouchableOpacity
                                onPress={uploadViaGallery}
                                style={{ flex: 1, backgroundColor: "red", paddingVertical: 12, borderRadius: 8, backgroundColor: "gray" }}
                            >
                                <Text style={{ textAlign: "center", color: "white" }}>Via Galeri</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={uploadViaCamera}
                                style={{ flex: 1, backgroundColor: "red", paddingVertical: 12, borderRadius: 8, backgroundColor: "gray" }}
                            >
                                <Text style={{ textAlign: "center", color: "white" }}>Via Kamera</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
            <View style={{marginVertical: 16}}>
                <Text style={styles.label}>Caption</Text>
                <TextInput
                    placeholder="Caption Post"
                    style={styles.textArea}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={onChangeName}
                    value={name}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Kirim</Text>
            </TouchableOpacity>
        </View>
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
    input: {
        height: 100,
        borderRadius: 5,
        fontSize: 16,
        borderColor: "gray",
        borderWidth: 1,
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
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
    textArea: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        height: 150,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});
