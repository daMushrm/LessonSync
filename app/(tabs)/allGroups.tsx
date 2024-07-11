import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "@/components/Card";
import { router, useLocalSearchParams } from "expo-router";
import { Group, createGroupTables, getAllGroups } from "@/sqlite/groups";

const AllGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const { refresh } = useLocalSearchParams();
  // refresh logic
  const [data, setData] = useState<string>("");
  const refreshData = () => setData("result");

  const fetchGroups = async () => {
    const fetchedGroups = await getAllGroups();
    setGroups(fetchedGroups);
  };

  useEffect(() => {
    // refresh logic
    if (refresh) {
      void refreshData();
    }

    createGroupTables();
    fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Groups</Text>
      {groups.map((item) => (
        <Card
          key={item.id}
          text={item.name}
          onPress={() =>
            router.push(
              "/groups/showGroup?group_id=" +
                item.id +
                "&group_name=" +
                item.name +
                "&group_day=" +
                item.day +
                "&group_time=" +
                item.time
            )
          }
        />
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/groups/addGroup")}
      >
        <Text style={styles.addButtonText}>Add Group</Text>
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
