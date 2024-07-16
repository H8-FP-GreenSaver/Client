import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

export const PlantCard = ({ plant, userPreference, navigation, loading }) => {
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
    difficulty = "Mudah";
  } else if (plant.difficulty === 3) {
    difficulty = "Sedang";
  } else if (plant.difficulty > 3 && plant.difficulty <= 5) {
    difficulty = "Sulit";
  }


  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { id: plant.id });
      }}
    >
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

export const PestCard = ({ pest, navigation, loading }) => {
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
      style={{width: "47%"}}
    >
      <View style={{ marginBottom: 24 }}>
        <Image
          style={{
            width: "100%",
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

export const CardLoader = () => {
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Detail', { id: plant.id })
    }}>
      <View style={{ marginBottom: 24 }}>
        <Skeleton colorMode="light" width={165} height={165} />
        <View
          style={{
            padding: 12,
            backgroundColor: "white",
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            gap: 4,
          }}
        >
          <Skeleton colorMode="light" width={120} height={24} />
          <Skeleton colorMode="light" width={90} height={20} />
          <Skeleton colorMode="light" width={50} height={20} />
        </View>
      </View>
    </TouchableOpacity >
  );
};

export const CardLoaderForum = () => {
  return (
    <View
      style={{ flex: 1, paddingHorizontal: 24, backgroundColor: "#E8E8E8" }}
    >
      <ScrollView style={{ marginTop: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
              width: "100%"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
                gap: 12,
                width: "100%"
              }}
            >
              <Skeleton colorMode="light" width={50} height={50} radius={"round"} />
              <View style={{ gap: 8}}>
                <View style={{ flexDirection: "row" }}>
                  <Skeleton colorMode="light" width={120} height={24} />
                </View>
                <Skeleton colorMode="light" width={80} height={18} />
              </View>
            </View>
            <Skeleton colorMode="light" width={"100%"} height={250} />
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}