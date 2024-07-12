import React, { useState, useEffect, useCallback } from "react";
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
  addPayment,
  createPaymentTables,
  getPaymentByGroupId,
  updatePayment,
} from "@/sqlite/paying";
import showToast from "@/components/showToast";

const ShowPaying = () => {
  const { group_id } = useLocalSearchParams();
  const [listedStudents, setListedStudents] = useState<
    { id: number; name: string; checked: boolean; student_id: number }[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [payments, setPayments] = useState<any[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2025", "2026"];

  const fetchPayments = useCallback(async (groupId: number) => {
    try {
      const result = await getPaymentByGroupId(groupId);
      setPayments(result);
    } catch (error) {
      console.error("Error fetching payments:", error);
      Alert.alert("Error", "Failed to fetch payments. Please try again.");
    }
  }, []);

  const fetchStudents = useCallback(async (groupId: number) => {
    try {
      const students = await getStudentsByGroupId(groupId);
      setGroupStudents(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      Alert.alert("Error", "Failed to fetch students. Please try again.");
    }
  }, []);

  useEffect(() => {
    const initializeComponent = async () => {
      await createPaymentTables();
      const groupIdNumber = Number(group_id);
      await fetchPayments(groupIdNumber);
      await fetchStudents(groupIdNumber);
    };

    initializeComponent();
  }, [group_id, fetchPayments, fetchStudents]);

  useEffect(() => {
    const filteredPayments = payments.filter(
      (record) =>
        record.group_id === Number(group_id) &&
        record.month === selectedMonth &&
        record.year === selectedYear
    );

    setListedStudents(
      groupStudents.map((student) => {
        const paymentRecord = filteredPayments.find(
          (record) => record.student_id === student.id
        );
        return {
          id: paymentRecord ? paymentRecord.id : student.id,
          name: student.name,
          checked: paymentRecord ? paymentRecord.paid : false,
          student_id: student.id,
        };
      })
    );
  }, [payments, groupStudents, selectedMonth, selectedYear, group_id]);

  const handleCheck = useCallback((id: number) => {
    setListedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, checked: !student.checked } : student
      )
    );
  }, []);

  const handleChangeDate = useCallback((month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await Promise.all(
        listedStudents.map(async (student) => {
          const existingRecord = payments.find(
            (record) =>
              record.month === selectedMonth &&
              record.year === selectedYear &&
              record.student_id === student.student_id
          );
          if (existingRecord) {
            await updatePayment(existingRecord.id, student.checked);
          } else {
            await addPayment(
              selectedMonth,
              selectedYear,
              Number(group_id),
              student.student_id,
              student.checked
            );
          }
        })
      );
      showToast("Saved successfully");
      router.back();
    } catch (error) {
      console.error("Error saving payments:", error);
      Alert.alert("Error", "Failed to save payments. Please try again.");
    }
  }, [listedStudents, payments, selectedMonth, selectedYear, group_id]);

  const openWhatsApp = useCallback((studentName: string) => {
    Alert.alert("WhatsApp", `Open WhatsApp for ${studentName}`);
    // Add your logic to open WhatsApp for the student
  }, []);

  const renderStudent = ({ item }: { item: any }) => (
    <View style={styles.studentContainer}>
      <TouchableOpacity onPress={() => openWhatsApp(item.name)}>
        {!item.checked && (
          <FontAwesome
            name="whatsapp"
            size={24}
            color={item.checked ? "gray" : "green"}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.studentName}>
        {groupStudents.find((student) => student.id === item.student_id)?.name}
      </Text>
      <Checkbox
        value={item.checked ? true : false}
        onValueChange={() => handleCheck(item.id)}
        color={item.checked ? "#000" : undefined}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Paying Month and Year</Text>
      <View style={styles.pickersContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) =>
            handleChangeDate(itemValue, selectedYear)
          }
          style={styles.picker}
        >
          {months.map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) =>
            handleChangeDate(selectedMonth, itemValue)
          }
          style={styles.picker}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={listedStudents}
        keyExtractor={(item) => item.id.toString()}
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
    fontSize: 20,
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

export default ShowPaying;
