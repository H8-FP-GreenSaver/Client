import { Image, Text, View } from "react-native"
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export const PlantCard = ({ plant, userPreference }) => {

    const preference = userPreference.preference.map(pref => {
        if (pref === plant.category) {
            return <>
                <Feather name="star" size={14} color="#edc553" marginStart={4} />
            </>
        }
    })


    return (
        <View style={{ marginBottom: 24 }}>
            <Image style={{ width: 165, height: 165, backgroundColor: "#94C593", borderRadius: 8 }} source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png" }} />
            <View style={{ padding: 12, backgroundColor: "white", borderBottomRightRadius: 8, borderBottomLeftRadius: 8, gap: 4 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>{plant.name}</Text>
                    {preference ? preference : ""}
                </View>
                <Text style={{ fontSize: 14 }}>{plant.category}</Text>
                <Text>{plant.difficulty}</Text>
            </View>
        </View>
    )
}

export const PestCard = ({ pest }) => {
    const icons = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= pest.dangerLevel) {
            icons.push(<FontAwesome5 key={i} name="book-dead" size={18} color="red" />);
        } else {
            icons.push(<FontAwesome5 key={i} name="book-dead" size={18} color="lightgray" />);
        }
    }

    return (
        <View style={{ marginBottom: 24 }}>
            <Image style={{ width: 165, height: 165, backgroundColor: "#94C593", borderRadius: 8, objectFit: "cover" }} source={{ uri: "https://png.pngtree.com/png-vector/20240214/ourmid/pngtree-hairy-caterpillar-insects-centipedes-hairy-png-image_11693512.png" }} />
            <View style={{ padding: 12, backgroundColor: "white", borderBottomRightRadius: 8, borderBottomLeftRadius: 8, gap: 4 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>{pest.pestName}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
                    {icons}
                </View>
            </View>
        </View>
    )
}