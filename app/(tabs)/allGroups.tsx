import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Group, createGroupTables, getAllGroups } from "@/sqlite/groups";
import GroupCard from "@/components/Card";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Function to get the day index for sorting
const getDayIndex = (day: string) => daysOfWeek.indexOf(day);

const AllGroups = () => {
  const [groups, setGroups] = useState<{ [key: string]: Group[] }>({});

  const fetchGroups = async () => {
    const fetchedGroups = await getAllGroups();

    // Sort groups by day and time within each day
    const sortedGroups = fetchedGroups.sort((a, b) => {
      const dayComparison = getDayIndex(a.day) - getDayIndex(b.day);
      if (dayComparison !== 0) {
        return dayComparison;
      }
      // Compare times as numbers (HHmm format)
      const timeA = Number(a.time.replace(":", ""));
      const timeB = Number(b.time.replace(":", ""));
      return timeA - timeB;
    });

    // Group sortedGroups by day
    const groupedByDay = daysOfWeek.reduce((acc, day) => {
      const dayGroups = sortedGroups.filter((group) => group.day === day);
      if (dayGroups.length > 0) {
        acc[day] = dayGroups;
      }
      return acc;
    }, {} as { [key: string]: Group[] });

    setGroups(groupedByDay);
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
          {Object.keys(groups).map((day) => (
            <View key={day}>
              <Text style={styles.dayTitle}>{day}</Text>
              {groups[day].map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </View>
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
  dayTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default AllGroups;
