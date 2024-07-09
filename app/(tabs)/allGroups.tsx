import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "@/components/Card";
import { router } from "expo-router";

const AllGroups = () => {
  const groups = [
    {
      id: "1",
      name: "Group 1",
      time: "2024-07-08T12:00:00Z",
      day: "Monday",
      students: [],
    },
    {
      id: "2",
      name: "Group 2",
      time: "2024-07-08T12:00:00Z",
      day: "Tuesday",
      students: [],
    },
    {
      id: "3",
      name: "Group 3",
      time: "2024-07-08T12:00:00Z",
      day: "Wednesday",
      students: [],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Groups</Text>
      {groups.map((item) => (
        <Card
          key={item.id}
          text={item.name}
          onPress={() => router.push("/groups/showGroup")}
        />
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => router.push("/groups/addGroup")}
        >
          Add Group
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AllGroups;
