import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => alert("Show All Groups")}
      >
        <Text style={styles.cardText}>Show All Groups</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => alert("Show Today's Lessons")}
      >
        <Text style={styles.cardText}>Show Today's Lessons</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => alert("Attendance History")}
      >
        <Text style={styles.cardText}>Attendance History</Text>
      </TouchableOpacity>
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
  card: {
    width: "90%",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    fontWeight: "bold",
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
