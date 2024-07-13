import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";
import { database } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(database, "threads", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        setPost(postSnap.data());
      }
    };

    const fetchComments = () => {
      const q = query(collection(database, "threads", postId, "comments"));
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

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addDoc(collection(database, "threads", postId, "comments"), {
        text: newComment,
        createdAt: new Date(),
      });
      setNewComment("");
    }
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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {post.threadCaption}
            </Text>
          </View>
          <Image
            source={{ uri: post.imageUrl }}
            style={{ width: "100%", height: 200, marginBottom: 16 }}
          />
          <Text style={{ fontSize: 14, color: "gray", marginBottom: 16 }}>
            {post.postDescription}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>
            Comments
          </Text>
          {comments.map((comment) => (
            <View key={comment.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14 }}>{comment.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            style={{
              flex: 1,
              borderColor: "gray",
              borderWidth: 1,
              padding: 8,
              borderRadius: 8,
            }}
            placeholder="Add a comment"
          />
          <Button title="Send" onPress={handleAddComment} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
//   mainContainer: {
//     zIndex: 1,
//     flex: 4,
//     width: "100%",
//     paddingHorizontal: 24,
//     paddingTop: 24,
//     backgroundColor: "white",
//   },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonBack: {
    marginRight: 10,
  },
});
