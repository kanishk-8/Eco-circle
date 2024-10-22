import { Link, router, Stack, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Token cache for SecureStore
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("SecureStore save item error: ", err);
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <RootStack />
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

function RootStack() {
  const { isLoaded, isSignedIn } = useUser();
  const segments = useSegments();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && segments[0] !== "(tabs)") {
        // If signed in and not on the tabs group, redirect to the home tab
        router.replace("/(tabs)/home");
      } else if (
        !isSignedIn &&
        segments[0] !== "login" &&
        segments[0] !== "signup"
      ) {
        // If not signed in and not on login page, redirect to login
        router.replace("/");
      }
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) {
    // Show a loading spinner while Clerk is loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="login"
        options={{
          animation: "fade_from_bottom",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          // animation: "fade_from_bottom",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
