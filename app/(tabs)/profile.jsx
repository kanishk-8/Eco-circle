import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useClerk, ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { signOut } = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width; // Get the screen width
  const dummyImage = "https://www.example.com/path/to/default/profile-pic.png"; // replace this with an actual dummy image URL

  const onSignOutPress = async () => {
    try {
      setLoading(true); // Show loading while signing out
      await signOut();
      setTimeout(() => {
        router.replace("/"); // Redirect to login page after sign-out
        setLoading(false); // Stop loading after navigation
      }, 300);
    } catch (err) {
      console.error("Error signing out: ", err);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <ClerkLoaded>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            color: "#4abd3e",
            fontWeight: "bold",
            fontSize: 60,
          },
          headerStyle: {
            backgroundColor: "white",
            height: 120,
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.signOutButton} // Adjust width based on screen size
              onPress={onSignOutPress}
              disabled={loading}
            >
              <Ionicons name="log-out-outline" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      {isLoaded && isSignedIn ? (
        <View style={styles.container}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user?.imageUrl || dummyImage }} // Fallback to dummy image if user image is not available
              style={styles.profileImage}
            />
            <Text style={styles.name}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.email}>
              {user.emailAddresses[0].emailAddress}
            </Text>
          </View>

          {/* Contribution Section */}
          <View style={styles.contributionSection}>
            <Text style={styles.sectionTitle}>
              Nature Well-being Contributions
            </Text>
            <Text style={styles.contributionText}>
              🌳 Planted 5 trees this month
            </Text>
            <Text style={styles.contributionText}>
              🌍 Reduced carbon footprint by 15% this year
            </Text>
            <Text style={styles.contributionText}>
              ♻️ Recycled 30 kg of waste last quarter
            </Text>
          </View>

          {/* Modern Custom Sign-Out Button */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </ClerkLoaded>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  contributionSection: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2f4f4f",
  },
  contributionText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#555",
  },
  signOutButton: {
    backgroundColor: "#4abd3e", // Change this to match your app's theme
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5, // Add elevation for Android shadow
  },
  buttonText: {
    color: "#fff", // White text for better contrast
    fontSize: 28,
    fontWeight: "bold",
  },
});
