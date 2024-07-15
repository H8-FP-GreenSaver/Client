import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { timeSince } from "../helpers/timeConverter";

import { CardLoaderForum } from "../components/Card";

import { useFocusEffect } from "@react-navigation/native";

export default function ForumScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(database, "threads"));
        const fetchedPosts = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const commentsSnapshot = await getDocs(
              collection(database, "threads", doc.id, "comments")
            );
            return {
              id: doc.id,
              ...doc.data(),
              commentsCount: commentsSnapshot.size,
            };
          })
        );

        setPosts(fetchedPosts);
        setLoading(false);
      };

      fetchPosts();
    }, [])
  );

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 24, backgroundColor: "#E8E8E8" }}
    >
      <ScrollView style={{ marginTop: 24 }}>
        {loading ?
          <>
            <CardLoaderForum />
            <CardLoaderForum />
            <CardLoaderForum />
          </>
          :
          posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                gap: 12,
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
                  gap: 12
                }}
              >
                <Image
                  source={{ uri: post.profileUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
                <View style={{ gap: loading ? 8 : 0 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {post.fullName}
                    </Text>
                  </View>
                  <Text>{timeSince(post.createdAt.seconds)}</Text>
                </View>
              </View>
              <View style={{ width: "100%" }}>
                {post.imageUrl &&
                  <Image
                    source={{ uri: post.imageUrl }}
                    style={{
                      borderRadius: 5,
                      width: "auto",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                }
                <Text
                  style={{ fontSize: 16, fontWeight: "500", marginTop: 12 }}
                >
                  {post.threadCaption}
                </Text>
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
                    {post.commentsCount} komentar
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
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

const styles = StyleSheet.create({
  role: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#396D5E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    overflow: "hidden",
    borderRadius: 5,
  },
});
