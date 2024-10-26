import { Dimensions, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView
            tint="light" // You can try 'dark' for darker designs
            intensity={100} // Increase intensity for stronger blur effect
          />
        ),
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#4abd3e", // Frosted glass effect with transparency
          borderTopWidth: 0, // Remove border for a cleaner look
          elevation: 0, // Remove shadow on Android
          bottom: 10,
          marginHorizontal: (Dimensions.get("window").width * 0.5) / 2,
          padding: 10,
          // paddingHorizontal: 15,
          paddingVertical: 15,
          paddingBottom: 15,
          alignItems: "space-between",
          borderRadius: 40,
          height: Dimensions.get("window").height * 0.08,
        },
        tabBarActiveTintColor: "#4abd3e", // Active icon color
        tabBarInactiveTintColor: "white", // Inactive icon color
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: focused ? "white" : "transparent",

                padding: 8,
                borderRadius: 99,
                margin: 10,
              }}
            >
              <MaterialIcons name="home" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Community",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: focused ? "white" : "transparent",

                padding: 8,
                borderRadius: 99,
                margin: 10,
              }}
            >
              <MaterialIcons name="explore" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: focused ? "white" : "transparent",

                padding: 8,
                borderRadius: 99,
                margin: 10,
              }}
            >
              <MaterialIcons name="person" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
