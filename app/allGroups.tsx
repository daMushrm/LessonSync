import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "@/components/Card";
import { useRouter } from "expo-router";

const AllGroups = () => {
  const router = useRouter();

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
        <Card key={item.id} text={item.name} onPress={() => alert(item.name)} />
      ))}
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => router.push("/addGroup")}
        > 
          Add
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
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AllGroups;
