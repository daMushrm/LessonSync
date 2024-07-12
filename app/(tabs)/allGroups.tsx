import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Group, createGroupTables, getAllGroups } from "@/sqlite/groups";

const GroupCard = ({ group }: any) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => router.push("/groups/showGroup?group_id=" + group.id)}
  >
    <Text style={styles.cardTitle}>{group.name}</Text>
    <View style={styles.cardTimeContainer}>
      <Feather name="clock" size={16} color="gray" />
      <Text style={styles.cardTime}>Monday, 12:00 PM</Text>
    </View>
  </TouchableOpacity>
);

const AllGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    const fetchedGroups = await getAllGroups();
    setGroups(fetchedGroups);
  };

  useFocusEffect(
    useCallback(() => {
      createGroupTables();
      fetchGroups();
    }, [])
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>All Groups</Text>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/groups/addGroup")}
        >
          <Text style={styles.addButtonText}>Add Group</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  titleContainer: {
    width: "100%",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 60,
    textAlign: "center",
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTime: {
    marginLeft: 8,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllGroups;
