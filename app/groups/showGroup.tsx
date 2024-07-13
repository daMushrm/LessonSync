import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
        <TouchableOpacity onPress={handleAddStudent} style={styles.addIcon}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.studentsSection}>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudent}
          contentContainerStyle={styles.studentsContainer}
        />
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            router.push("/attendance/showAttendance?group_id=" + group_id)
          }
        >
          <MaterialIcons name="event-note" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => console.log("Performance icon pressed")}
        >
          <FontAwesome name="line-chart" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/finance/showFinance?group_id=" + group_id)}
        >
          <FontAwesome name="money" size={30} color="black" />
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  addIcon: {
    padding: 10,
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
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 16,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
});

export default ShowGroup;
