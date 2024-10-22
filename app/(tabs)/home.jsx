import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import piggybank from "../../assets/images/piggy.json";
import BudgetDonutChart from "../../components/piechart";
import { Stack } from "expo-router";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const { isLoaded, user } = useUser();

  // Dummy image URL for fallback
  const dummyImage = "https://www.example.com/path/to/default/profile-pic.png"; // replace this with an actual dummy image URL

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            color: "orange",
            fontWeight: "bold",
            fontSize: 60,
          },
          headerStyle: {
            backgroundColor: "white",
            height: 120,
          },
          headerRight: () => (
            <Image
              source={{ uri: user?.imageUrl || dummyImage }} // Fallback to dummy image if user image is not available
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 10,
              }}
            />
          ),
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Monthly Budget (Donut Chart)</Text>
          <BudgetDonutChart />
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottie: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
