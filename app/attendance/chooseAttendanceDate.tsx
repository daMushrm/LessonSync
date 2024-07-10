import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "@/components/Card";
import { router } from "expo-router";

const datesData = [
  { id: "1", date: "2024-07-01" },
  { id: "2", date: "2024-07-02" },
  { id: "3", date: "2024-07-03" },
  { id: "4", date: "2024-07-04" },
  { id: "5", date: "2024-07-05" },
  // Add more dates as needed
];

const ChooseAttendanceDate = () => {
  const handleDatePress = (date: any) => {
    alert(`Selected date: ${date}`);
    // Add your logic to navigate to the attendance page with the selected date
  };

  const renderDateCard = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleDatePress(item.date)}>
      <Card
        text={item.date}
        onPress={() => router.push("/attendance/showAttendance")}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={datesData}
        keyExtractor={(item) => item.id}
        renderItem={renderDateCard}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
});

export default ChooseAttendanceDate;
