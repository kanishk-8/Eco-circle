import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LottieView from "lottie-react-native";

// Define screen dimensions for responsive design
const screenWidth = Dimensions.get("window").width;

const ContributionProgress = ({ contributionPercentage, userLevel }) => {
  // Lottie animations for different levels
  const levelAnimations = {
    1: require("../assets/lottie/seedlevel1.json"), // Seedling animation
    2: require("../assets/lottie/plantlevel2.json"), // Small plant animation
    3: require("../assets/lottie/treelevel3.json"), // Medium tree animation
    4: require("../assets/lottie/treelevel4.json"), // Fully grown tree animation
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={levelAnimations[userLevel]}
        autoPlay
        loop={false}
        resizeMode="center"
        style={styles.lottie}
      />
      <View style={styles.lottieContainer}>
        {/* Circular Progress Bar */}
        <AnimatedCircularProgress
          size={screenWidth / 3}
          width={10}
          fill={contributionPercentage}
          tintColor="#4abd3e" // Green tint for progress bar
          backgroundColor="#e0e0e0"
          rotation={0}
        >
          {(fill) => (
            <>
              <Text style={styles.percentageText}>{Math.round(fill)}%</Text>
              <Text style={styles.levelText}>Level {userLevel}</Text>
            </>
          )}
        </AnimatedCircularProgress>

        {/* Lottie Animation for User Level */}
      </View>
    </View>
  );
};

export default ContributionProgress;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4abd3e", // Green text color
  },
  lottieContainer: {
    alignItems: "center",
    margin: 15,
  },
  lottie: {
    width: 200,
    height: 200,
    // backgroundColor: "#fff",
  },
  levelText: {
    fontSize: 18,
    color: "#4abd3e",
    fontWeight: "bold",
  },
});
