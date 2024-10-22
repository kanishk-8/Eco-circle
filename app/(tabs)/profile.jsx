import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import { useClerk, ClerkLoaded, useUser } from "@clerk/clerk-expo"; // Import ClerkLoaded to check loading state
import { useRouter } from "expo-router";

const Profile = () => {
  const { signOut } = useClerk();

  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State to handle loading

  const onSignOutPress = async () => {
    try {
      setLoading(true); // Show loading while signing out
      await signOut();
      // Adding a slight delay to ensure the session is fully cleared
      setTimeout(() => {
        router.replace("/"); // Redirect to login page after sign-out
        setLoading(false); // Stop loading after navigation
      }, 300); // Adjust the delay as needed
    } catch (err) {
      console.error("Error signing out: ", err);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <ClerkLoaded>
      {isLoaded && isSignedIn ? (
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Text>Welcome, {user.firstName}!</Text>
          <Text>Email: {user.emailAddresses[0].emailAddress}</Text>
          <Button
            color="red"
            title={loading ? "Signing Out..." : "Sign Out"}
            onPress={onSignOutPress}
            disabled={loading}
          />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
