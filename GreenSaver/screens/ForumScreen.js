import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase"; // Adjust the path according to your project structure
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { timeSince } from "../helpers/timeConverter";

export default function ForumScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(database, "threads"));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  console.log(posts);
  // {
  // posts.map((post) => console.log(post.comments))
  //   console.log(comment, "__+_+++_")
  // })));
  // }
  return (
    <View
      style={{ flex: 1, paddingHorizontal: 24, backgroundColor: "#E8E8E8" }}
    >
      <ScrollView style={{ marginTop: 24 }}>
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 16,
              marginBottom: 16,
            }}
            onPress={() =>
              navigation.navigate("PostDetail", { postId: post.id })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Image
                source={{ uri: post.profileUrl }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 12,
                }}
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {post.fullName}
                </Text>
                <Text>{timeSince(post.createdAt.seconds)}</Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "500", marginBottom: 12 }}
              >
                {post.threadCaption}
              </Text>
              <Image
                source={{ uri: post.imageUrl }}
                style={{
                  borderRadius: 5,
                  width: "auto",
                  height: 200,
                  objectFit: "cover",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <FontAwesome6 name="comment-alt" size={18} color="gray" />
                <Text style={{ fontSize: 14, color: "gray" }}>
                  {post.comments.length} komentar
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddPost");
        }}
        style={{
          backgroundColor: "#86BA85",
          zIndex: 2,
          marginBottom: 24,
          marginStart: "auto",
          borderRadius: 50,
        }}
      >
        <Feather name="plus" padding={20} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
