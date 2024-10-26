import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SectionList,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import ContributionProgress from "../../components/levelindicaor";

// Dummy data
const sections = [
  {
    title: "Challenges",
    data: [
      { id: "1", title: "Plant 5 Trees this Month", progress: "2/5 completed" },
      {
        id: "2",
        title: "Use Public Transport for a Week",
        progress: "5/7 days completed",
      },
    ],
  },
  {
    title: "Achievements",
    data: [
      {
        id: "1",
        title: "Tree Planting Champion",
        description: "Planted 50 trees!",
      },
      {
        id: "2",
        title: "Eco-Friendly Commuter",
        description: "Used public transport for a month!",
      },
    ],
  },
  {
    title: "Tips",
    data: [
      {
        id: "1",
        tip: "Use reusable bags for shopping to reduce plastic waste.",
      },
      {
        id: "2",
        tip: "Conserve water by turning off the tap while brushing your teeth.",
      },
    ],
  },
];

const Home = () => {
  const { isLoaded, user } = useUser();
  const dummyImage = "https://www.example.com/path/to/default/profile-pic.png"; // replace this with an actual dummy image URL

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleStyle: {
            color: "#4abd3e",
            fontWeight: "bold",
            fontSize: 50,
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
      <SectionList
        onRefresh={() => {}}
        refreshing={false}
        showsVerticalScrollIndicator={false}
        sections={[
          { title: "Budget Overview", data: [{ renderChart: true }] },
          ...sections,
        ]}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderSectionHeader={({ section }) => {
          if (section.title !== "Budget Overview") {
            return <Text style={styles.sectionTitle}>{section.title}</Text>;
          }
          return null; // Don't render title for the chart section
        }}
        renderItem={({ item, section }) => {
          if (item.renderChart) {
            return (
              <View style={styles.chartContainer}>
                {/* <BudgetDonutChart /> */}
                <ContributionProgress
                  contributionPercentage={40}
                  userLevel={4}
                />
              </View>
            );
          } else if (section.title === "Challenges") {
            return (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text>{item.progress}</Text>
              </View>
            );
          } else if (section.title === "Achievements") {
            return (
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
            );
          } else if (section.title === "Tips") {
            return (
              <View style={styles.item}>
                <Text>{item.tip}</Text>
              </View>
            );
          }
        }}
        contentContainerStyle={styles.listContent} // Add padding to the bottom of the list
      />
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
  chartContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    paddingLeft: 16,
    color: "#4abd3e",
  },
  item: {
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 80, // Add padding at the bottom for the bottom navigation bar
  },
});
