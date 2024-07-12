import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { getStudentsByGroupId } from "@/sqlite/students";
import {
  addAttendance,
  createAttendanceTables,
  getAttendanceByGroupId,
  updateAttendance,
} from "@/sqlite/attendance";

const ShowAttendance = () => {
  const { group_id } = useLocalSearchParams();
  const [listedStudents, setListedStudents] = useState<
    { id: number; name: string; checked: boolean; student_id: number }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [attendance, setAttendance] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);

  const fetchAttendance = async (groupId: number) => {
    const result = await getAttendanceByGroupId(groupId);
    setAttendance(result);
  };

  const getDates = async () => {
    try {
      const uniqueDates = [...new Set(attendance.map((record) => record.date))];
      setDates(uniqueDates);
      if (uniqueDates.length > 0) {
        setSelectedDate(uniqueDates[0]);
        setListedStudents(
          // problem solved like a pro :D
          attendance.map((record) => ({
            id: record.id,
            name: record.name,
            checked: record.date === uniqueDates[0] && record.attended,
            student_id: record.student_id,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const fetchStudents = async (groupId: number) => {
    const students = await getStudentsByGroupId(groupId);
    setGroupStudents(students);
  };

  useEffect(() => {
    createAttendanceTables();
    fetchAttendance(Number(group_id));
    fetchStudents(Number(group_id));
  }, [group_id]);

  useEffect(() => {
    getDates();
  }, [attendance]);

  const handleCheck = (id: number) => {
    const updatedStudents = listedStudents.map((student) =>
      student.id === id ? { ...student, checked: !student.checked } : student
    );
    setListedStudents(updatedStudents);
  };

  const handleChangeDate = (date: string) => {
    setSelectedDate(date);
    setListedStudents(
      attendance.filter(
        (record) => record.group_id === Number(group_id) && record.date === date
      )
    );
  };

  const handleSave = () => {
    listedStudents.forEach((student) => {
      updateAttendance(student.id, student.checked);
    });
    router.back();
  };

  const handleAdd = async () => {
    const todaysDate = new Date().toISOString().split("T")[0];
    Alert.alert(
      "Confirm",
      `Are you sure you want to add attendance for ${groupStudents.length} students?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: async () => {
            groupStudents.forEach((student) => {
              addAttendance(todaysDate, Number(group_id), student.id, false);
            });
            fetchAttendance(Number(group_id));
          },
        },
      ]
    );
  };

  const openWhatsApp = (studentName: string) => {
    Alert.alert("WhatsApp", `Open WhatsApp for ${studentName}`);
    // Add your logic to open WhatsApp for the student
  };

  const renderStudent = ({ item }: { item: any }) => (
    <View style={styles.studentContainer}>
      <TouchableOpacity
        onPress={() => openWhatsApp(item.name)}
      >
        <FontAwesome
          name="whatsapp"
          size={24}
          color={item.checked ? "gray" : "green"}
        />
      </TouchableOpacity>
      <Text style={styles.studentName}>
        {groupStudents.find((student) => student.id === item.student_id)?.name}
      </Text>
      <Checkbox
        value={item.checked? true : false}
        onValueChange={() => handleCheck(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Attendance Date</Text>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => handleChangeDate(itemValue)}
        style={styles.picker}
      >
        {dates.map((date) => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>

      <FlatList
        data={listedStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.saveButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  listContainer: {
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
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ShowAttendance;
