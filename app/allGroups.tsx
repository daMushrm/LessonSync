import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "@/components/Card";
import { addGroup, getGroups } from "@/storage/operations/groups";

const AllGroups: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const fetchedGroups = await getGroups();
      setGroups(fetchedGroups);
    };

    fetchGroups();
  }, []);

  const handleAddGroup = async () => {
    const newGroup = {
      id: (groups.length + 1).toString(),
      name: `Group ${groups.length + 1}`,
      time: new Date().toISOString(),
      day: "Thursday", // Example day
      students: [],
    };

    await addGroup(newGroup);
    const updatedGroups = await getGroups();
    setGroups(updatedGroups);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card text={item.name} onPress={() => alert(item.name)} />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddGroup}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
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
    paddingBottom: 80, // To ensure the add button doesn't cover the last item
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
