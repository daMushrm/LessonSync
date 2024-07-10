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

const monthsData = [
  { label: "Jan", value: "01" },
  { label: "Feb", value: "02" },
  { label: "Mar", value: "03" },
  { label: "Apr", value: "04" },
  { label: "May", value: "05" },
  { label: "Jun", value: "06" },
  { label: "Jul", value: "07" },
  { label: "Aug", value: "08" },
  { label: "Sep", value: "09" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

const yearsData = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
];

const ShowPaying = () => {
  const [students, setStudents] = useState(studentsData);
  const [selectedMonth, setSelectedMonth] = useState(monthsData[0].value);
  const [selectedYear, setSelectedYear] = useState(yearsData[0].value);

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
      <Text style={styles.title}>Choose Paying Month</Text>
      <View style={styles.pickersContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          {monthsData.map((month) => (
            <Picker.Item
              key={month.value}
              label={month.label}
              value={month.value}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          {yearsData.map((year) => (
            <Picker.Item
              key={year.value}
              label={year.label}
              value={year.value}
            />
          ))}
        </Picker>
      </View>

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
  pickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 8,
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
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShowPaying;
