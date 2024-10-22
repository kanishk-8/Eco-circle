import { Dimensions, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
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
          bottom: 20,
          marginHorizontal: (Dimensions.get("window").width * 0.5) / 2,
          padding: 10,
          // paddingHorizontal: 15,
          paddingVertical: 15,
          paddingBottom: 15,
          alignItems: "space-between",
          borderRadius: 40,
          height: Dimensions.get("window").height * 0.08,
        },
        tabBarActiveTintColor: "black", // Active icon color
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
              <MaterialIcons name="currency-rupee" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "explore",
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
              <MaterialIcons name="settings" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>

    // <Tabs
    //   screenOptions={{
    //     tabBarBackground: () => (
    //       <BlurView
    //         tint="light" // You can try 'dark' for darker designs
    //         intensity={100} // Increase intensity for stronger blur effect
    //       />
    //     ),
    //     tabBarStyle: {
    //       backgroundColor: "transparent", // Frosted glass effect with transparency
    //       borderTopWidth: 0, // Remove border for a cleaner look
    //       elevation: 0, // Remove shadow on Android
    //     },
    //     tabBarActiveTintColor: "lightgreen", // Active icon color
    //     tabBarInactiveTintColor: "black", // Inactive icon color
    //   }}
    // >
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       tabBarIcon: (color) => (
    //         <MaterialIcons name="home" size={27} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       tabBarIcon: (color) => (
    //         <MaterialIcons name="explore" size={27} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       tabBarIcon: (color) => (
    //         <MaterialIcons name="settings" size={27} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}
