import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';

export default function PlantProgress() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 1;

    const plants = [
        {
            name: 'Plant 1',
            imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png',
            category: "Tanaman Hias",
            difficulty: 2,
            price: 50000,
            water: 250,
            temperature: 26,
            wateringTime: 1,
            description: "Tanaman hias tropis dan subtropis yang berasal dari Jepang Selatan. Mawar Jambe merupakan salah satu tanaman yang saat ini sedang naik daun bagi para penggemar tanaman.",
            medium: "pot bunga",
            plantArea: "kecil",
            createdAt: "",
            today: "",
            steps: [
                {
                    name: "Siapkan media tanam",
                    description: "Untuk media tanam dapat menggunakan pot bunga atau langsung ditanamkan ke tanah. Bila memilih menggunakan pot bunga, gunakan ukuran yang kecil sampai sedang. Kemudian isi dengan tanah.",
                    stepNumber: 1,
                    imageUrl: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-flower-pot-with-soil-png-image_13004175.png"
                },
                {
                    name: "Siapkan tunas",
                    description: "Untuk tunas bisa membelinya dari penjual tanaman atau diambil dari batang Mawar Jambe secara langsung. Bila mengambil langsung dari batang, gunakan pisau untuk mencongkel bagian tunas-nya.",
                    stepNumber: 2,
                    imageUrl: "https://png.pngtree.com/png-clipart/20210627/original/pngtree-cycad-leaves-outdoor-png-image_6469890.jpg",
                    tips: "Mencongkel tunas dari batang butuh tenaga ekstra karena cukup keras."
                },
                {
                    name: "Proses menanam",
                    description: "Kemudian tanam tunas sebelumnya ke dalam tanah sampai tertutup namun sisakan sedikit pada bagian atas",
                    imageUrl: "https://png.pngtree.com/png-vector/20240317/ourmid/pngtree-cycad-palm-tree-png-image_11987990.png",
                    stepNumber: 3,
                    tips: "Lihat video teknik menanam di bawah ini agar lebih paham",
                    videoUrl: "https://youtu.be/5_6-Oc1TQaY?si=ChX1vgfs_9-xY5T2"
                },
            ]
        },
        {
            name: 'Plant 2',
            imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/027/254/678/small_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png',
        },
        {
            name: 'Plant 3',
            imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/254/690/non_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png',
        }
    ];


    let difficulty;

    if (plants[0].difficulty >= 1 && plants[0].difficulty < 3) {
        difficulty = "Mudah"
    } else if (plants[0].difficulty === 3) {
        difficulty = "Sedang"
    } else if (plants[0].difficulty > 3 && plants[0].difficulty <= 5) {
        difficulty = "Sulit"
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ marginRight: 16 }}>
                        <Text style={{ fontSize: 16, lineHeight: 28 }}>{plants[0].category}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>{plants[0].name}</Text>
                    </View>
                    <View style={{ padding: 8, backgroundColor: "white", borderRadius: 50 }}>
                        <Image style={{ width: 32, height: 32 }} source={require("../assets/icon-menu.png")} />
                    </View>
                </View>
                <Image style={{ width: 300, height: 300, zIndex: 0, objectFit: "cover", alignSelf: "flex-start", marginHorizontal: "auto" }} source={{ uri: plants[0].imageUrl }} />
            </View>
            <View style={{ backgroundColor: "white", flex: 2, padding: 24 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 8, color: "#AFAFAF" }}>Penyiraman</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 24, fontWeight: "500" }}>{plants[0].wateringTime}x</Text>
                            <Text style={{ fontSize: 18, marginTop: 4, color: "#AFAFAF" }}>/hari</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 8, color: "#AFAFAF" }}>Umur</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Text style={{ fontSize: 24, fontWeight: "500" }}>100</Text>
                            <Text style={{ fontSize: 18, marginTop: 4, color: "#AFAFAF" }}>hari</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#D9D9D9', marginVertical: 24 }} />
                <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 40, color: "#AFAFAF" }}>Penyiraman</Text>
                <View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 4, gap: 18, alignItems: "center" }}>
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                        <Image style={{ width: 32, height: 32, zIndex: 0, objectFit: "cover" }} source={require("../assets/icon-waterdrop-solid.png")} />
                    </View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 16, alignItems: "center" }}>
                        <View style={{ width: "45%", height: 3, backgroundColor: '#56CCF2', marginVertical: 24, borderRadius: 8 }} />
                        <View style={{ width: 16, height: 16, backgroundColor: '#56CCF2', borderRadius: 50 }} />
                        <View style={{ width: "50%", height: 3, backgroundColor: '#E8E8E8', marginVertical: 24, borderRadius: 8 }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Senin</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Selasa</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Rabu</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Kamis</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Jumat</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Sabtu</Text>
                        <Text style={{ fontSize: 14, fontWeight: "500", color: "#3D3D3D" }}>Minggu</Text>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        zIndex: 1,
        flex: 2,
        padding: 24,
        width: "100%",
        paddingTop: 56,
        backgroundColor: "#E8E8E8",
    },
    backgroundImage: {
        zIndex: 0,
        flex: 12,
        height: 500,
        width: "100%",
        backgroundColor: "#E8E8E8"
    },
    containerWave: {
        marginRight: "auto",
        wave: {
            fontSize: 16,
        },
        name: {
            fontSize: 20,
            fontWeight: "500"
        }
    },
    addButton: {
        borderRadius: 28,
        backgroundColor: "white"
    },
    shadowProp: {
        elevation: 8,
        shadowColor: '#3F3F3F',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});
