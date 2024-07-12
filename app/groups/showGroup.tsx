import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getStudentsByGroupId } from "@/sqlite/students";
import { getGroupById } from "@/sqlite/groups";

const ShowGroup = () => {
  const { group_id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("12:00 PM");
  const [students, setStudents] = useState<any[]>([]);
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

  const renderStudent = ({ item }: { item: any }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() =>
          handleStudentPress(item.id, item.name, item.phone, item.parent_phone)
        }
      >
        <FontAwesome name="pencil" size={18} color="black" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.groupName}>• {groupName}</Text>
        <TouchableOpacity onPress={handleEditGroup}>
          <FontAwesome
            name="pencil"
            size={20}
            color="black"
            style={{ padding: 10, marginTop: 10 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.timeContainer}>
        <Feather name="clock" size={24} color="black" />
        <Text style={styles.timeText}>{`${day}, ${time}`}</Text>
      </View>

      <View style={styles.studentHeaderContainer}>
        <Text style={styles.studentsHeader}>Students</Text>
      </View>

      <View style={styles.studentsSection}>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudent}
          contentContainerStyle={styles.studentsContainer}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.attButton}
          onPress={() =>
            router.push("/attendance/showAttendance?group_id=" + group_id)
          }
        >
          <Text style={styles.attButtonText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payingButton}
          onPress={() => router.push("/paying/showPaying?group_id=" + group_id)}
        >
          <Text style={styles.payingButtonText}>Paying</Text>
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
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    marginTop: 60,
    marginLeft: 8,
  },
  groupName: {
    fontSize: 28,
  },
  timeContainer: {
    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginLeft: 8,
    opacity: 0.7,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
  },
  studentHeaderContainer: {
    backgroundColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  studentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10,
    textAlign: "center",
  },
  studentsSection: {
    paddingHorizontal: 16,

    flex: 1,
    backgroundColor: "#fff",
  },
  studentsContainer: {
    paddingBottom: 16,
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  studentName: {
    fontSize: 16,
  },
  buttonsContainer: {
    paddingHorizontal: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
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
  payingButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  payingButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    margin: 16,
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
});

export default ShowGroup;
