import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function PestDetail() {
    const pest = {
        pestName: "Ulat Bulu",
        description: "Ulat bulu berperan sebagai hama tanaman. Keberadaan ulat bulu pada inang dapat diketahui dengan melihat gejala yang terjadi pada inang yang diamati. Inang yang terserang ulat bulu menunjukkan gejala daun berlubang, bagian tepi daun habis dimakan ulat bulu, dan terdapat sisa kotoran ulat bulu.",
        imageUrl: "https://png.pngtree.com/png-vector/20240214/ourmid/pngtree-hairy-caterpillar-insects-centipedes-hairy-png-image_11693512.png",
        dangerLevel: 4,
        plantId: "Tanaman Gulma", // misalnya, nanti plantId tetep integer
    };

    const icons = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= pest.dangerLevel) {
            icons.push(<FontAwesome5 key={i} name="book-dead" size={18} color="red" />);
        } else {
            icons.push(<FontAwesome5 key={i} name="book-dead" size={18} color="lightgray" />);
        }
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={{ alignItems: "center", justifyContent: "center", width: "100%", height: 250 }}>
                    <Image style={{ width: 300, height: 200, objectFit: "cover" }} source={{ uri: pest.imageUrl }} />
                </View>
                <View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 8 }}>{pest.pestName}</Text>
                        <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
                            {icons}
                        </View>
                    </View>
                    <Text style={{ fontSize: 16, lineHeight: 28, marginTop: 24 }}>{pest.description}</Text>
                    <View style={{ marginTop: 24 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Sering ditemukan pada:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <Text style={{ fontSize: 16, padding: 8, backgroundColor: "#DBF0DA", color: "#689867", borderRadius: 8 }}>
                                {pest.plantId}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        zIndex: 1,
        flex: 4,
        width: "100%",
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: "white",
    },
});
