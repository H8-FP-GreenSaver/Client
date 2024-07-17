import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";


export default function MeetDevelopers({ navigation }) {
    const openLinkedInProfileJundi = () => {
        const urlDeveloper = 'https://www.linkedin.com/in/jundi-hibban-nursandy-06ab29300';
        Linking.openURL(urlDeveloper);
    };

    const openLinkedInProfileWel = () => {
        const urlDeveloper = 'https://www.linkedin.com/in/wel-ferdinand-tanada-007aab11b/';
        Linking.openURL(urlDeveloper);
    }

    const openLinkedInProfileDeta = () => {
        const urlDeveloper = 'https://www.linkedin.com/in/bernadeta-regina-paramasanti-90b34b233/';
        Linking.openURL(urlDeveloper);
    }

    const openLinkedInProfileKakLili = () => {
        const urlDeveloper = 'https://www.linkedin.com/in/lilian-adisty-40030aa3/';
        Linking.openURL(urlDeveloper);
    }

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
            <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
                <Text style={{ marginBottom: 40, fontSize: 20, fontWeight: "500", textAlign: "center", color: "#396D5E" }}>🌱 Our Developers 🌱</Text>
                <View style={{ gap: 32 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Image source={{ uri: "https://media.licdn.com/dms/image/D5603AQH2E9CjEJRUOQ/profile-displayphoto-shrink_200_200/0/1703048803194?e=2147483647&v=beta&t=HJaaut2JEX_6StDv6p3VCdH99qooCUo71dEqVYb2r-Y" }} style={{ width: 65, height: 65, borderRadius: 33 }} />
                        <View style={{ gap: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Jundi Hibban Nursandy</Text>
                            <TouchableOpacity
                                onPress={openLinkedInProfileJundi}
                            >
                                <AntDesign name="linkedin-square" size={20} color="#0077B5" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Image source={require("../assets/developer2.jpg")} style={{ width: 65, height: 65, borderRadius: 33 }} />
                        <View style={{ gap: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Wel Ferdinand Tanada</Text>
                            <TouchableOpacity
                                onPress={openLinkedInProfileWel}
                            >
                                <AntDesign name="linkedin-square" size={20} color="#0077B5" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Image source={require("../assets/developer3.jpg")} style={{ width: 65, height: 65, borderRadius: 33 }} />
                        <View style={{ gap: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Bernadeta Regina Paramasanti</Text>
                            <TouchableOpacity
                                onPress={openLinkedInProfileDeta}
                            >
                                <AntDesign name="linkedin-square" size={20} color="#0077B5" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Image source={require("../assets/developer4.jpg")} style={{ width: 65, height: 65, borderRadius: 33 }} />
                        <View style={{ gap: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Lilian Adisty</Text>
                            <TouchableOpacity
                                onPress={openLinkedInProfileKakLili}
                            >
                                <AntDesign name="linkedin-square" size={20} color="#0077B5" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
})