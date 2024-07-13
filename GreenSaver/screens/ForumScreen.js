import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase"; // Adjust the path according to your project structure

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

  // console.log(posts);
  // {
  //   posts.map((post) => console.log(post));
  // }
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
            onPress={() =>
              navigation.navigate("PostDetail", { postId: post.id })
            }
          >
            <Image
              source={{ uri: post.profileUrl }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 16,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {post.threadCaption}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {post.fullName}
              </Text>
              <Image
                source={{ uri: post.imageUrl }}
                style={{
                  height: 50,
                  borderRadius: 5,
                  marginRight: 16,
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />

              <Text style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                Comments: {post.comments.length}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
