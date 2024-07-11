import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function Steps({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const plants = [
    {
      name: "Plant 1",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/024/859/837/small_2x/monstera-plant-in-ceramic-pot-illustration-ai-generative-png.png",
      category: "Tanaman Hias",
      difficulty: 2,
      price: 50000,
      water: 250,
      temperature: 26,
      description:
        "Tanaman hias tropis dan subtropis yang berasal dari Jepang Selatan. Mawar Jambe merupakan salah satu tanaman yang saat ini sedang naik daun bagi para penggemar tanaman.",
      medium: "pot bunga",
      plantArea: "kecil",
      steps: [
        {
          name: "Siapkan media tanam",
          description:
            "Untuk media tanam dapat menggunakan pot bunga atau langsung ditanamkan ke tanah. Bila memilih menggunakan pot bunga, gunakan ukuran yang kecil sampai sedang. Kemudian isi dengan tanah.",
          stepNumber: 1,
          imageUrl:
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-flower-pot-with-soil-png-image_13004175.png",
        },
        {
          name: "Siapkan tunas",
          description:
            "Untuk tunas bisa membelinya dari penjual tanaman atau diambil dari batang Mawar Jambe secara langsung. Bila mengambil langsung dari batang, gunakan pisau untuk mencongkel bagian tunas-nya.",
          stepNumber: 2,
          imageUrl:
            "https://png.pngtree.com/png-clipart/20210627/original/pngtree-cycad-leaves-outdoor-png-image_6469890.jpg",
          tips: "Mencongkel tunas dari batang butuh tenaga ekstra karena cukup keras.",
        },
        {
          name: "Proses menanam",
          description:
            "Kemudian tanam tunas sebelumnya ke dalam tanah sampai tertutup namun sisakan sedikit pada bagian atas",
          imageUrl:
            "https://png.pngtree.com/png-vector/20240317/ourmid/pngtree-cycad-palm-tree-png-image_11987990.png",
          stepNumber: 3,
          tips: "Lihat video teknik menanam di bawah ini agar lebih paham",
          videoUrl: "https://youtu.be/5_6-Oc1TQaY?si=ChX1vgfs_9-xY5T2",
        },
      ],
    },
    {
      name: "Plant 2",
      imageUrl:
        "https://static.vecteezy.com/system/resources/thumbnails/027/254/678/small_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png",
    },
    {
      name: "Plant 3",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/027/254/690/non_2x/monstera-plant-in-a-pot-on-a-white-background-ai-generated-png.png",
    },
  ];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < plants[0].steps.length) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("Home");
    }
  };

  let difficulty;

  if (plants[0].difficulty >= 1 && plants[0].difficulty < 3) {
    difficulty = "Mudah";
  } else if (plants[0].difficulty === 3) {
    difficulty = "Sedang";
  } else if (plants[0].difficulty > 3 && plants[0].difficulty <= 5) {
    difficulty = "Sulit";
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <Image
          style={{
            width: 200,
            height: 200,
            zIndex: 0,
            objectFit: "cover",
            marginHorizontal: "auto",
          }}
          source={{ uri: plants[0].steps[currentPage].imageUrl }}
        />
      </View>
      <View style={{ backgroundColor: "white", flex: 4, padding: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 8 }}>
          Langkah {currentPage + 1}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 16 }}>
          {plants[0].steps[currentPage].name}
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 28 }}>
          {plants[0].steps[currentPage].description}
        </Text>
        {plants[0].steps[currentPage].tips && (
          <View
            style={{
              backgroundColor: "#EFEDED",
              padding: 16,
              borderRadius: 8,
              marginTop: 16,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Feather name="info" size={18} color="#A5A5A5" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginBottom: 4,
                  color: "#A5A5A5",
                }}
              >
                Tips
              </Text>
            </View>
            <Text style={{ lineHeight: 28, fontSize: 16, marginStart: 28 }}>
              {plants[0].steps[currentPage].tips}
            </Text>
          </View>
        )}
      </View>
      <View style={{ padding: 24, flexDirection: "row" }}>
        {currentPage > 0 ? (
          <TouchableOpacity
            onPress={handlePrevPage}
            style={{
              backgroundColor: "#86BA85",
              zIndex: 2,
              marginBottom: 24,
              marginEnd: "auto",
              borderRadius: 50,
            }}
          >
            <Feather name="chevron-left" padding={20} size={24} color="white" />
          </TouchableOpacity>
        ) : (
          ""
        )}
        {currentPage === plants[0].steps.length - 1 ? (
          <TouchableOpacity
            onPress={handleNextPage}
            style={{
              backgroundColor: "#86BA85",
              zIndex: 2,
              marginBottom: 24,
              marginStart: "auto",
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              gap: 12,
            }}
          >
            <Feather name="check" size={24} color="white" />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
              Done
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNextPage}
            style={{
              backgroundColor: "#86BA85",
              zIndex: 2,
              marginBottom: 24,
              marginStart: "auto",
              borderRadius: 50,
            }}
          >
            <Feather
              name="chevron-right"
              padding={20}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
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
    flexDirection: "row",
    backgroundColor: "#94C593",
  },
  backgroundImage: {
    zIndex: 0,
    flex: 12,
    height: 500,
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
  containerWave: {
    marginRight: "auto",
    wave: {
      fontSize: 16,
    },
    name: {
      fontSize: 20,
      fontWeight: "500",
    },
  },
  addButton: {
    borderRadius: 28,
    backgroundColor: "white",
  },
  shadowProp: {
    elevation: 8,
    shadowColor: "#3F3F3F",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
