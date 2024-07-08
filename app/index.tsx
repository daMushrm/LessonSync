import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import Card from "@/components/Card";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Card text="Show All Groups" onPress={() => router.push("/groups/allGroups")} />
      <Card
        text="Show Today's Lessons"
        onPress={() => alert("Show Today's Lessons")}
      />
      <Card
        text="Attendance History"
        onPress={() => alert("Attendance History")}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made by{" "}
          <Text
            style={styles.footerLink}
            onPress={() => Linking.openURL("https://example.com")}
          >
            Omar
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    opacity: 0.5,
  },
  footerText: {
    fontSize: 14,
    color: "#333333",
  },
  footerLink: {
    color: "blue",
  },
});
