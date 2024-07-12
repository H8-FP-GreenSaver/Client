import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const posts = [
  {
    id: 1,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Pertumbuhan tanaman mawar jambe terhambat",
    postDescription: "Jadi saya sedang menanam tanaman mawar jambe",
    commentsAmount: 5,
  },
  {
    id: 2,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Bagaimana cara menanam padi dengan baik?",
    postDescription: "Saya ingin tahu cara menanam padi dengan baik dan benar",
    commentsAmount: 3,
  },
  {
    id: 3,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Masalah hama pada tanaman cabai",
    postDescription: "Tanaman cabai saya sering diserang hama, apa solusinya?",
    commentsAmount: 8,
  },
  {
    id: 4,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Masalah hama pada tanaman cabai",
    postDescription: "Tanaman cabai saya sering diserang hama, apa solusinya?",
    commentsAmount: 8,
  },
  {
    id: 5,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Masalah hama pada tanaman cabai",
    postDescription: "Tanaman cabai saya sering diserang hama, apa solusinya?",
    commentsAmount: 8,
  },
  {
    id: 6,
    userImage:
      "https://t3.ftcdn.net/jpg/01/73/51/90/360_F_173519074_pQtUUwh9wdgl9kvxHy1eHUL02yUjrqPW.jpg",
    postTitle: "Masalah hama pada tanaman cabai",
    postDescription: "Tanaman cabai saya sering diserang hama, apa solusinya?",
    commentsAmount: 8,
  },
];

export default function ForumScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "lightgray" }}>
      <Text style={{ marginTop: 40, fontSize: 24, fontWeight: "500" }}>
        Forum
      </Text>
      <ScrollView style={{ marginTop: 20 }}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={{
              backgroundColor: "#DBF0DA",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={
              () => {}
              // navigation.navigate("PostDetail", { postId: post.id })
            }
          >
            <Image
              source={{ uri: post.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {post.postTitle}
              </Text>
              <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>
                {post.postDescription}
              </Text>
              <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                Comments: {post.commentsAmount}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
