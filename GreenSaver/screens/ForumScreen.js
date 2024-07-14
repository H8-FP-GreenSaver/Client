import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase"; // Adjust the path according to your project structure
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { timeSince } from "../helpers/timeConverter";
import { Skeleton } from "moti/skeleton";

export default function ForumScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(database, "threads"));
    const fetchedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(fetchedPosts);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

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
                gap: 12
              }}
            >
              <Skeleton show={false} colorMode="light" width={50} height={50} radius={"round"}>
                {loading ? null :
                  <Image
                    source={{ uri: post.profileUrl }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                }
              </Skeleton>
              <View style={{ gap: loading ? 8 : 0 }}>
                <View style={{flexDirection: "row"}}>
                  <Skeleton colorMode="light" width={120} height={24}>
                    {loading ? null :
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        {post.fullName}
                      </Text>
                    }
                  </Skeleton>
                  {/* <Text style={styles.role}>{post.skill}</Text> */}
                </View>
                <Skeleton colorMode="light" width={80} height={18}>
                  {loading ? null :
                    <Text>{timeSince(post.createdAt.seconds)}</Text>
                  }
                </Skeleton>
              </View>
            </View>
            <Skeleton colorMode="light" width={"100%"} height={250}>
              {loading ? null :
                <View style={{ width: "100%" }}>
                  <Image
                    source={{ uri: post.imageUrl }}
                    style={{
                      borderRadius: 5,
                      width: "auto",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
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
                      {post.comments ? post.comments.length : 0} komentar
                    </Text>
                  </View>
                </View>
              }
            </Skeleton>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddPost");
        }}
        style={{
          backgroundColor: "#86BA85",
          position: 'absolute',
          bottom: 24,
          right: 24,
          padding: 2,
          borderRadius: 50,
          elevation: 2,
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
  }
});