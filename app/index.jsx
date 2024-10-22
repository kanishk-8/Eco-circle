import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Index = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <View style={styles.container}>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
