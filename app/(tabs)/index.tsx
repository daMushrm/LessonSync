import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getGroupsByDay } from "@/sqlite/groups";
import GroupCard from "@/components/Card";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createProfileTable, getName } from "@/sqlite/profile";

const welcomePhrases = [
  "Let's dive into today's teaching!",
  "Ready for an exciting day of learning?",
  "Time to inspire young minds!",
  "Another day to make a difference!",
  "Eager to share knowledge today?",
];

const Index = () => {
  const [todaysGroups, setTodaysGroups] = useState([]);
  const [welcomePhrase, setWelcomePhrase] = useState("");
  const [name, setName] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchName = async () => {
        await createProfileTable();
        const name = await getName();
        setName(name ? name : "Guest");
      };
      fetchName();

      const fetchTodaysGroups = async () => {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });
        const groups = await getGroupsByDay(today);
        setTodaysGroups(
          groups.sort((a: any, b: any) => a.time.localeCompare(b.time)) // order them by time
        );
      };
      fetchTodaysGroups();
      setWelcomePhrase(
        welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)]
      );
    }, [])
  );

  if (!todaysGroups[0]) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => router.push("/profile/profile")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Hi, {name}!</Text>
        <Text style={styles.phraseText}>No Lessons for Today</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => router.push("/profile/profile")}
      >
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>Welcome, {name}!</Text>
      <Text style={styles.phraseText}>{welcomePhrase}</Text>
      <ScrollView style={styles.scrollView}>
        {todaysGroups.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 60,
  },
  phraseText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  scrollView: {
    flex: 1,
  },
});

export default Index;
