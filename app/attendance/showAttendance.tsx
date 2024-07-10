import React, { useState } from "react";
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
import { router } from "expo-router";

const studentsData = [
  { id: "1", name: "Student 1", checked: false },
  { id: "2", name: "Student 2", checked: false },
  { id: "3", name: "Student 3", checked: false },
];

const datesData = [
  "2024-07-01",
  "2024-07-02",
  "2024-07-03",
  "2024-07-04",
  "2024-07-05",
];

const ShowAttendance = () => {
  const [students, setStudents] = useState(studentsData);
  const [selectedDate, setSelectedDate] = useState(datesData[0]);

  const handleCheck = (id: string) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, checked: !student.checked } : student
    );
    setStudents(updatedStudents);
  };

  const handleSave = () => {
    // Add your logic to save the data to your backend or storage
    students.filter((student) => !student.checked);
    router.back();
  };

  const openWhatsApp = (studentName: string) => {
    Alert.alert("WhatsApp", `Open WhatsApp for ${studentName}`);
    // Add your logic to open WhatsApp for the student
  };

  const renderStudent = ({ item }: { item: any }) => (
    <View style={styles.studentContainer}>
      <TouchableOpacity
        onPress={() => openWhatsApp(item.name)}
        disabled={item.checked ? true : false}
      >
        <FontAwesome
          name="whatsapp"
          size={24}
          color={item.checked ? "gray" : "green"}
        />
      </TouchableOpacity>
      <Text style={styles.studentName}>{item.name}</Text>
      <Checkbox
        value={item.checked}
        onValueChange={() => handleCheck(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Attendance Date</Text>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => setSelectedDate(itemValue)}
        style={styles.picker}
      >
        {datesData.map((date) => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
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
});

export default ShowAttendance;
