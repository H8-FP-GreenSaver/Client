import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export const PlantCard = ({ plant, userPreference, navigation }) => {
  // console.log(plant, "<<< dari card")
  const preference = userPreference.preference.map((pref) => {
    if (pref === `Tanaman ${plant.Category.categoryName}`) {
      return (
        <>
          <Feather name="star" size={14} color="#edc553" marginStart={4} />
        </>
      );
    }
  });

  let difficulty = "";

  if (plant.difficulty > 0 && plant.difficulty < 3) {
    difficulty = "Mudah" 
  } else if (plant.difficulty === 3) {
    difficulty = "Sedang"
  } else if (plant.difficulty > 3 && plant.difficulty <= 5) {
    difficulty = "Sulit"
  }

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Detail', { id: plant.id })
    }}>
      <View style={{ marginBottom: 24 }}>
        <Image
          style={{
            width: 165,
            height: 165,
            backgroundColor: "#94C593",
            borderRadius: 8,
          }}
          source={{
            uri: plant.imageUrl,
          }}
        />
        <View
          style={{
            padding: 12,
            backgroundColor: "white",
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            gap: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>
              {plant.plantName}
            </Text>
            {preference ? preference : ""}
          </View>
          <Text style={{ fontSize: 14 }}>Tanaman {plant.Category.categoryName}</Text>
          <Text>{difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const PestCard = ({ pest, navigation }) => {
  const icons = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= pest.dangerLevel) {
      icons.push(
        <FontAwesome5 key={i} name="book-dead" size={18} color="red" />
      );
    } else {
      icons.push(
        <FontAwesome5 key={i} name="book-dead" size={18} color="lightgray" />
      );
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PestsDetail", { id: pest.id });
      }}
    >

      <View style={{ marginBottom: 68 }}>
        <Image
          style={{
            width: 165,
            height: 165,
            backgroundColor: "#94C593",
            borderRadius: 8,
            objectFit: "cover",
          }}
          source={{
            uri: pest.imageUrl,
          }}
        />
        <View
          style={{
            padding: 12,
            backgroundColor: "white",
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            gap: 4,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 150,
              }}
              numberOfLines={1}
            >
              {pest.pestName}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 4, marginTop: 8 }}>
            {icons}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
