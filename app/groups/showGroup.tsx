import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "@/components/Card"; // Assuming you have a Card component
import { router } from "expo-router";

const showGroup = () => {
  const [groupName, setGroupName] = useState("Groujp 1");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("12:00 PM");
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Charlie White" },
    { id: 6, name: "David Black" },
    { id: 7, name: "Eve Green" },
    { id: 8, name: "Frank Grey" },
    { id: 9, name: "Grace Orange" },
    { id: 10, name: "Henry Purple" },
    { id: 11, name: "Ivy Red" },
    { id: 12, name: "Jack Yellow" },
  ]);

  const handleAddStudent = () => {
    router.push("/students/addStudent");
  };

  const handleStudentPress = () => {
    router.push("/students/editStudent");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Day:</Text>
        <Text style={styles.text}>{day}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.text}>{time}</Text>
      </View>

      <View style={styles.studentsSection}>
        <Text style={styles.studentsHeader}>Students:</Text>
        <ScrollView style={styles.studentsContainer}>
          {students.map((student) => (
            <TouchableOpacity key={student.id}>
              <Card text={student.name} onPress={() => handleStudentPress()} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.attButton}
        onPress={() => router.push("/attendance/showAttendance")}
      >
        <Text style={styles.attButtonText}>Attendance History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  text: {
    fontSize: 18,
  },
  studentsSection: {
    flex: 1,
    marginTop: 20,
  },
  studentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  studentsContainer: {
    maxHeight: 400,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
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
  attButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  attButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default showGroup;
