import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { PestCard, PlantCard } from "../components/Card";

export default function PestEncyclopedia({ navigation }) {
    const [category, setCategory] = useState("Tanaman Hias");
    const userPreference = {
        preference: ["Tanaman Hias", "Tanaman Buah"],
    };

    const pests = [
        {
            pestName: "Ulat Bulu",
            description: "Ulat bulu berperan sebagai hama tanaman. Keberadaan ulat bulu pada inang dapat diketahui dengan melihat gejala yang terjadi pada inang yang diamati. Inang yang terserang ulat bulu menunjukkan gejala daun berlubang, bagian tepi daun habis dimakan ulat bulu, dan terdapat sisa kotoran ulat bulu.",
            imageUrl: "https://png.pngtree.com/png-vector/20240214/ourmid/pngtree-hairy-caterpillar-insects-centipedes-hairy-png-image_11693512.png",
            dangerLevel: 4,
            plantId: "Tanaman Gulma", // misalnya, nanti plantId tetep integer
        },
        {
            pestName: "Ulat Bulu 2",
            description: "Ulat bulu berperan sebagai hama tanaman. Keberadaan ulat bulu pada inang dapat diketahui dengan melihat gejala yang terjadi pada inang yang diamati. Inang yang terserang ulat bulu menunjukkan gejala daun berlubang, bagian tepi daun habis dimakan ulat bulu, dan terdapat sisa kotoran ulat bulu.",
            imageUrl: "https://png.pngtree.com/png-vector/20240214/ourmid/pngtree-hairy-caterpillar-insects-centipedes-hairy-png-image_11693512.png",
            dangerLevel: 3,
            plantId: "Tanaman Gulma", // misalnya, nanti plantId tetep integer
        },
        {
            pestName: "Ulat Bulu 3",
            description: "Ulat bulu berperan sebagai hama tanaman. Keberadaan ulat bulu pada inang dapat diketahui dengan melihat gejala yang terjadi pada inang yang diamati. Inang yang terserang ulat bulu menunjukkan gejala daun berlubang, bagian tepi daun habis dimakan ulat bulu, dan terdapat sisa kotoran ulat bulu.",
            imageUrl: "https://png.pngtree.com/png-vector/20240214/ourmid/pngtree-hairy-caterpillar-insects-centipedes-hairy-png-image_11693512.png",
            dangerLevel: 1,
            plantId: "Tanaman Gulma", // misalnya, nanti plantId tetep integer
        },
    ];

    return (
        <>
            <View style={{ paddingHorizontal: 24, paddingTop: 16, flex: 6, borderTopStartRadius: 24, borderTopEndRadius: 24, backgroundColor: "#F8F8F8", marginTop: 32 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, }}>
                    <Text style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}>
                        Hama
                    </Text>
                </View>
                <TextInput style={{ height: 50, borderWidth: 1, padding: 16, marginBottom: 24, borderRadius: 8, borderColor: "lightgray", }}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder="Search here.."
                    keyboardType="text"
                />
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", borderTopStartRadius: 24, borderTopEndRadius: 24, }}>
                    {pests.map((pest, index) => {
                        return (
                            <PestCard key={index} pest={pest} />
                        );
                    })}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({

});
