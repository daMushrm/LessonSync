import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Card from "@/components/Card";
import { router, useLocalSearchParams } from "expo-router";
import { createStudentTables, getStudentsByGroupId } from "@/sqlite/students";

const ShowGroup = () => {
  const { group_id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [students, setStudents] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (group_id) {
        await createStudentTables();
        const students = await getStudentsByGroupId(Number(group_id));
        setStudents(students);
      }
    };
    fetchStudents();
  }, [group_id]);

  const handleAddStudent = () => {
    router.push("/students/addStudent?group_id=" + group_id);
  };

  const handleStudentPress = (studentId: number) => {
    router.push(`/students/editStudent?id=${studentId}`);
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
            <TouchableOpacity
              key={student.id}
              onPress={() => handleStudentPress(student.id)}
            >
              <Card text={student.name} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.attButton}
          onPress={() => router.push("/attendance/showAttendance")}
        >
          <Text style={styles.attButtonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => router.push("/paying/showPaying")}
        >
          <Text style={styles.payButtonText}>Paying</Text>
        </TouchableOpacity>
      </View>

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  attButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  attButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShowGroup;
