import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getGroupsByDay } from "@/sqlite/groups";
import GroupCard from "@/components/Card";

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

  const name = "Tarek"; // This could be dynamic, fetched from user profile

  useEffect(() => {
    const fetchTodaysGroups = async () => {
      const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
      const groups = await getGroupsByDay(today);
      setTodaysGroups(groups);
    };
    fetchTodaysGroups();
    setWelcomePhrase(
      welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)]
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {name}!</Text>
      <Text style={styles.phraseText}>{welcomePhrase}</Text>
      <ScrollView style={styles.scrollView}>
        {todaysGroups.map((group) => (
          <GroupCard group={group} />
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
