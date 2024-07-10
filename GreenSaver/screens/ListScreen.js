import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { PlantCard } from "../components/Card";

export default function List() {
    const [category, setCategory] = useState('Tanaman Hias');
    const userPreference = {
        preference: ["Tanaman Hias", "Tanaman Buah"]
    }

    const plants = [
        {
            name: 'Plant 1',
            imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png',
            category: 'Tanaman Hias',
            difficulty: 'Mudah'
        },
        {
            name: 'Plant 2',
            imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/027/254/678/small_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png',
            category: 'Tanaman Buah',
            difficulty: 'Sedang'
        },
        {
            name: 'Plant 3',
            imageUrl: 'https://static.vecteezy.com/system/resources/previews/027/254/690/non_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png',
            category: 'Tanaman Obat',
            difficulty: 'Sulit'
        }
    ];

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.headContainer}>
                    <View style={styles.containerWave}>
                        <Text style={styles.containerWave.wave}>Selamat Pagi,</Text>
                        <Text style={styles.containerWave.name}>Alyssa!</Text>
                    </View>
                    <TouchableOpacity style={[styles.addButton, styles.shadowProp]}>
                        <Feather name="x" size={28} padding={12} color="#86BA85" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 24, paddingTop: 16, flex: 6, borderTopStartRadius: 24, borderTopEndRadius: 24, backgroundColor: "#F8F8F8" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: "500", alignSelf: "center" }}>Menanam</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingVertical: 8 }}>
                        <Feather name="star" size={14} color="#edc553" style={{ marginRight: 4 }} />
                        <Text>= Recommended</Text>
                    </View>
                </View>
                <TextInput
                    style={{ height: 50, borderWidth: 1, padding: 16, marginBottom: 24, borderRadius: 8, borderColor: "lightgray" }}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder="Search here.."
                    keyboardType="text"
                />
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", borderTopStartRadius: 24, borderTopEndRadius: 24 }}>
                    {plants.map((plant, index) => {
                        return <PlantCard key={index} plant={plant} userPreference={userPreference} />
                    })}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        zIndex: 1,
        flex: 1,
        width: "100%",
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: "#E8E8E8",
    },
    headContainer: {
        flexDirection: "row",
        marginTop: 40,
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
