import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getStudentsByGroupId } from "@/sqlite/students";
import {
  addAttendance,
  createAttendanceTables,
  getAttendanceByGroupId,
  updateAttendance,
} from "@/sqlite/attendance";
import openWhatsApp from "@/components/openWhatsApp";
import showToast from "@/components/showToast";
import CustomModal from "@/components/modals/CustomModal";

const ShowAttendance = () => {
  const { group_id } = useLocalSearchParams();
  const [listedStudents, setListedStudents] = useState<
    { id: number; name: string; checked: boolean; student_id: number }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [attendance, setAttendance] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAttendance = useCallback(async (groupId: number) => {
    const result = await getAttendanceByGroupId(groupId);
    setAttendance(result);
  }, []);

  const getDates = useCallback(() => {
    const uniqueDates = [...new Set(attendance.map((record) => record.date))];
    setDates(uniqueDates);
    if (uniqueDates.length > 0) {
      const todaysDate = new Date().toISOString().split("T")[0];
      setSelectedDate(
        uniqueDates.includes(todaysDate) ? todaysDate : uniqueDates[0]
      );
      setListedStudents(
        attendance
          .filter((record) => record.date === selectedDate)
          .map((record) => ({
            id: record.id,
            name: record.name,
            checked: record.attended,
            student_id: record.student_id,
          }))
      );
    }
  }, [attendance]);

  const fetchStudents = useCallback(async (groupId: number) => {
    const students = await getStudentsByGroupId(groupId);
    setGroupStudents(students);
  }, []);

  useFocusEffect(
    useCallback(() => {
      createAttendanceTables();
      fetchAttendance(Number(group_id));
      fetchStudents(Number(group_id));
    }, [group_id, fetchAttendance, fetchStudents])
  );

  useEffect(() => {
    getDates();
  }, [attendance, getDates]);

  const handleCheck = (id: number) => {
    const updatedStudents = listedStudents.map((student) =>
      student.id === id ? { ...student, checked: !student.checked } : student
    );
    setListedStudents(updatedStudents);
  };

  const handleChangeDate = (date: string) => {
    setSelectedDate(date);
    setListedStudents(
      attendance
        .filter(
          (record) =>
            record.group_id === Number(group_id) && record.date === date
        )
        .map((record) => ({
          id: record.id,
          name: record.name,
          checked: record.attended,
          student_id: record.student_id,
        }))
    );
  };

  const handleSave = () => {
    listedStudents.forEach((student) => {
      updateAttendance(student.id, student.checked);
    });
    showToast("Saved Successfully");
    router.back();
  };

  const handleCreate = async () => {
    new Date().toISOString().split("T")[0];
    setIsModalVisible(true);
  };

  const handleConfirmCreate = async () => {
    setIsModalVisible(false);
    const todaysDate = new Date().toISOString().split("T")[0];
    groupStudents.forEach((student) => {
      addAttendance(todaysDate, Number(group_id), student.id, false);
    });
    fetchAttendance(Number(group_id));
    showToast("Created Successfully");
    router.back();
  };

  const handleCancelCreate = () => {
    setIsModalVisible(false);
  };

  const renderStudent = ({ item }: { item: any }) => {
    const student = groupStudents.find(
      (student) => student.id === item.student_id
    );
    const parentPhone = student?.parent_phone || "";
    const whatsAppMessage = `الطالب ${student?.name} لم يحضر الحصة اليوم
    بتاريخ ${selectedDate}`;

    return (
      <View style={styles.studentContainer}>
        <TouchableOpacity
          onPress={() => openWhatsApp(parentPhone, whatsAppMessage)}
        >
          {!item.checked && (
            <FontAwesome
              name="whatsapp"
              size={24}
              color={item.checked ? "gray" : "green"}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.studentName}>{student?.name}</Text>
        <Checkbox
          value={item.checked ? true : false}
          onValueChange={() => handleCheck(item.id)}
          color={item.checked ? "#000" : undefined}
        />
      </View>
    );
  };

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
      <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
        <Text style={styles.saveButtonText}>
          Create Today's Attendance Sheet
        </Text>
      </TouchableOpacity>

      <CustomModal
        isVisible={isModalVisible}
        message={`Are you sure you want to create attendance for ${groupStudents.length} students?`}
        onConfirm={handleConfirmCreate}
        onCancel={handleCancelCreate}
      />
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 120,
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
