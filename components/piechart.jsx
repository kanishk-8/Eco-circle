import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get("window").width;

const BudgetDonutChart = () => {
  const chartWidth = screenWidth - 230;
  const [selectedItem, setSelectedItem] = useState(null);

  // Dummy JSON data
  const [budgetData] = useState([
    { label: "Expense", value: 500, color: "#f54242", text: "500" },
    { label: "Income", value: 300, color: "#f5a442", text: "300" },
    { label: "Savings", value: 150, color: "#42aaf5", text: "150" },
    { label: "Assets", value: 100, color: "#42f554", text: "100" },
  ]);

  return (
    <View style={styles.container}>
      {/* Pie Chart with built-in focusOnPress attribute */}
      <PieChart
        donut
        data={budgetData}
        radius={chartWidth / 2}
        innerRadius={chartWidth / 3}
      />

      {/* Legend with circles and text */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>{selectedItem?.text}</Text>
        {budgetData.map((item, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.legendItem}>
              <View
                style={[styles.colorCircle, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  legendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    // marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Circular shape
    marginRight: 10,
  },
  legendText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  centerLabelText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default BudgetDonutChart;
