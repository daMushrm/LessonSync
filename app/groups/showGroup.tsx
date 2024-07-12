import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { createStudentTables, getStudentsByGroupId } from "@/sqlite/students";
import { getGroupById } from "@/sqlite/groups";

const ShowGroup = () => {
  const { group_id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [students, setStudents] = useState<
    { id: number; name: string; phone: string; parent_phone: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const getGroup = async () => {
    if (group_id) {
      const group = await getGroupById(Number(group_id));
      setGroupName(group?.name || "");
      setDay(group?.day || "");
      setTime(group?.time || "");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getGroup();

      const fetchStudents = async () => {
        if (group_id) {
          const students = await getStudentsByGroupId(Number(group_id));
          setStudents(students);
          setLoading(false);
        }
      };
      fetchStudents();
    }, [group_id])
  );

  const handleAddStudent = () => {
    router.push("/students/addStudent?group_id=" + group_id);
  };

  const handleStudentPress = (
    studentId: number,
    studentName: string,
    studentPhone: string,
    studentParentPhone: string
  ) => {
    router.push(
      `/students/editStudent?id=${studentId}&name=${studentName}&phone=${studentPhone}&parentPhone=${studentParentPhone}`
    );
  };

  const handleEditGroup = () => {
    router.push(
      `/groups/editGroup?id=${group_id}&name=${groupName}&day=${day}&time=${time}`
    );
  };

  const renderStudent = ({
    item,
  }: {
    item: { id: number; name: string; phone: string; parent_phone: string };
  }) => (
    <View style={styles.studentContainer}>
      <Text style={styles.studentName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() =>
          handleStudentPress(item.id, item.name, item.phone, item.parent_phone)
        }
      >
        <FontAwesome name="pencil" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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

      <TouchableOpacity style={styles.editButton} onPress={handleEditGroup}>
        <Text style={styles.editButtonText}>Edit Group</Text>
      </TouchableOpacity>

      <View style={styles.studentsSection}>
        <Text style={styles.studentsHeader}>Students:</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudent}
          contentContainerStyle={styles.studentsContainer}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.attButton}
          onPress={() =>
            router.push("/attendance/showAttendance?group_id=" + group_id)
          }
        >
          <Text style={styles.attButtonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => router.push("/paying/showPaying?group_id=" + group_id)}
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
    paddingBottom: 80,
  },
  studentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  studentName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
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
  editButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShowGroup;
