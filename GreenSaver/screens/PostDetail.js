import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { database } from "../config/firebase";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/Auth";
import Axios from "../utils/axios";
import * as SecureStore from "expo-secure-store";
import { timeSince } from "../helpers/timeConverter";

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(database, "threads", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost(postSnap.data());
      }
    };

    const fetchComments = () => {
      const q = query(
        collection(database, "threads", postId, "comments"),
        orderBy("createdAt", "desc")
      );
      return onSnapshot(q, (querySnapshot) => {
        const fetchedComments = [];
        querySnapshot.forEach((doc) => {
          fetchedComments.push({ id: doc.id, ...doc.data() });
        });
        setComments(fetchedComments);
      });
    };

    fetchPost();
    const unsubscribe = fetchComments();
    return () => unsubscribe();
  }, [postId]);

  const fetchUser = async () => {
    try {
      const { data } = await Axios({
        url: `/users/user-profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "access_token"
          )}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentData = {
        text: newComment,
        createdAt: new Date(),
        fullName: user.fullName,
        imageUrl: user.avatar || "https://example.com/default-avatar.png",
      };

      await addDoc(
        collection(database, "threads", postId, "comments"),
        commentData
      );
      setNewComment("");
    }
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toDate().toLocaleDateString("en-US", options);
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonBack}
        >
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              marginTop: 10,
            }}
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
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {post.fullName}
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {timeSince(post.createdAt.seconds)}
              </Text>
            </View>
          </View>

          <Image
            source={{ uri: post.imageUrl }}
            style={{
              width: "100%",
              height: 200,
              marginBottom: 16,
              borderRadius: 5,
            }}
          />
          <Text style={{ fontSize: 14, color: "gray", marginBottom: 16 }}>
            {post.threadCaption}
          </Text>

          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 16 }}>
            Comments
          </Text>
          {comments.map((comment) => (
            <View key={comment.id} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: comment.imageUrl }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    marginRight: 8,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    {comment.fullName}
                  </Text>
                  <Text style={{ fontSize: 12, color: "gray", paddingTop: 2 }}>
                    {timeSince(comment.createdAt.seconds)}
                  </Text>
                </View>
              </View>
              <Text style={{ marginLeft: 38, marginTop: 3 }}>
                {comment.text}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            marginBottom: 26,
          }}
        >
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
            style={{
              flex: 1,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 8,
              marginRight: 8,
            }}
          />
          <FontAwesome
            onPress={handleAddComment}
            name="send"
            size={24}
            color="black"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 45,
  },
  buttonBack: {
    marginRight: 10,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  commentAuthor: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    marginBottom: 8,
    color: "gray",
  },
  commentText: {
    fontSize: 16,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    paddingVertical: 10,
  },
});
