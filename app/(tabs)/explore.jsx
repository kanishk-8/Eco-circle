import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

// Dummy data for trending topics
const trendingTopics = [
  { id: "1", topic: "#Sustainability" },
  { id: "2", topic: "#GreenLiving" },
  { id: "3", topic: "#EcoWarrior" },
  { id: "4", topic: "#ClimateAction" },
];

// Dummy data for posts
// Updated Dummy data for posts with require statements for local images
const initialPosts = [
  {
    id: "1",
    user: "EcoLover",
    avatar: require("../../assets/images/9861902.png"),
    postimage: require("../../assets/post/img1.jpeg"),
    content: "Just planted 10 trees today! Feeling great 🌱",
    likes: 25,
    comments: 5,
  },
  {
    id: "2",
    user: "GreenEarth",
    avatar: require("../../assets/images/9861902.png"),
    postimage: require("../../assets/post/img2.jpeg"),
    content: "Reduce, Reuse, Recycle ♻️",
    likes: 25,
    comments: 5,
  },
  {
    id: "3",
    user: "EcoConscious",
    avatar: require("../../assets/images/9861902.png"),
    postimage: require("../../assets/post/img3.jpeg"),
    content: "Using public transport to reduce my carbon footprint! 🚌",
    likes: 15,
    comments: 3,
  },
  {
    id: "4",
    user: "EConscious",
    avatar: require("../../assets/images/9861902.png"),
    postimage: require("../../assets/post/img2.jpeg"),
    content: "Using public transport to reduce my carbon footprint! 🚌",
    likes: 15,
    comments: 3,
  },
];

const Community = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [comment, setComment] = useState("helo");
  const { user, isLoaded } = useUser();
  const dummyImage = "https://www.example.com/path/to/default/profile-pic.png"; // replace this with an actual dummy image URL

  // Handle like functionality
  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  // Render each post in the feed
  // Render each post in the feed
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        {/* <Image source={item.avatar} style={styles.avatar} /> */}
        <Image
          source={{ uri: user?.imageUrl || dummyImage }}
          style={styles.avatar}
        />

        <Text style={styles.username}>{item.user}</Text>
      </View>
      <View style={styles.postContent}>
        <Image source={item.postimage} style={styles.postImage} />
        {/* <Text style={styles.username}>{item.user}</Text> */}
        <Text style={styles.postText}>{item.content}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <FontAwesome name="heart" size={20} color="red" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="comment" size={20} color="gray" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
      </View>
    </View>
  );

  const renderTrendingHeader = () => (
    <View>
      <Text style={styles.header}>Trending Topics</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.trendingContainer}
      >
        {trendingTopics.map((topic) => (
          <View key={topic.id} style={styles.trendingTopic}>
            <Text style={styles.trendingText}>{topic.topic}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: () => {},
          },
          headerTitleStyle: {
            color: "#4abd3e",
            fontWeight: "bold",
            fontSize: 50,
          },
          headerStyle: {
            backgroundColor: "white",
            height: 120,
          },
        }}
      />

      <FlashList
        data={posts}
        ListHeaderComponent={() => renderTrendingHeader()}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={150}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4abd3e",
    marginBottom: 10,
    paddingLeft: 10,
  },
  trendingContainer: {
    flexDirection: "row",
    marginBottom: 20,
    maxHeight: 150,
  },
  trendingTopic: {
    backgroundColor: "#e0f7e0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    elevation: 1,
  },
  trendingText: {
    fontSize: 16,
    color: "#2c7a2c",
    fontWeight: "600",
  },
  postContainer: {
    // flexDirection: "row",
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },
  postImage: {
    width: Dimensions.get("window").width * 0.9,
    height: 300,
    borderRadius: 10,
    marginRight: 15,
  },
  postsList: {
    paddingBottom: 70,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 15,
  },
  postContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  postText: {
    color: "#555",
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: "#777",
    fontSize: 14,
  },
  commentInput: {
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Community;
