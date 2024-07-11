import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function ForumScreen() {
  const posts = [
    {
      userImage: "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
      postTitle: "Pertumbuhan tanaman mawar jambe terhambat",
      postDescription: "Jadi saya sedang menanam tanaman mawar jambe",
      commentsAmount: 5
    },
    {
      userImage: "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
      postTitle: "Pertumbuhan tanaman mawar jambe terhambat",
      postDescription: "Jadi saya sedang menanam tanaman mawar jambe",
      commentsAmount: 5
    },
    {
      userImage: "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
      postTitle: "Pertumbuhan tanaman mawar jambe terhambat",
      postDescription: "Jadi saya sedang menanam tanaman mawar jambe",
      commentsAmount: 5
    },
  ];

  return (
    <>
      <View style={{ padding: 24, backgroundColor: "lightgray" }}>
        <Text style={{ marginTop: 40, fontSize: 24, fontWeight: "500" }}>Forum</Text>
        <TouchableOpacity>
          <View style={{ backgroundColor: "white", padding: 16, borderRadius: 16 }}>
            <Text>{posts[0].postTitle}</Text>
            <Text>{posts[0].postDescription}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}