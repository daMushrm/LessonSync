import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { updateStudent, deleteStudent } from "@/sqlite/students";
import showToast from "@/components/showToast";
import { deleteAttendanceByStudentId } from "@/sqlite/attendance";
import { deleteFinanceByStudentId } from "@/sqlite/finance";
import CustomModal from "@/components/modals/CustomModal";

const EditStudent = () => {
  const {
    id: studentId,
    name: initialName,
    phone: initialPhone,
    parentPhone: initialParentPhone,
  } = useLocalSearchParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setId(studentId?.toString() || "");
    setName(initialName?.toString() || "");
    setPhone(initialPhone?.toString() || "");
    setParentPhone(initialParentPhone?.toString() || "");
  }, [initialName, initialPhone, initialParentPhone]);

  const handleSaveStudent = async () => {
    if (!name.trim() || !phone.trim() || !parentPhone.trim()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    try {
      await updateStudent(Number(id), name, phone, parentPhone);
      showToast("Saved Successfully");
      router.back();
    } catch (error) {
      console.error("Error updating student:", error);
      Alert.alert("Error", "There was a problem updating the student.");
    }
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(Number(id));
      await deleteAttendanceByStudentId(Number(id));
      await deleteFinanceByStudentId(Number(id));
      showToast("Deleted Successfully");
      router.replace("..");
    } catch (error) {
      console.error("Error deleting student:", error);
      Alert.alert("Error", "There was a problem deleting the student.");
    }
  };

  const confirmDelete = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Student Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter student's name"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Parent's Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={parentPhone}
        onChangeText={(text) => setParentPhone(text)}
        placeholder="Enter parent's phone number"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleSaveStudent}>
        <Text style={styles.addButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Delete Student</Text>
      </TouchableOpacity>

      <CustomModal
        isVisible={modalVisible}
        message="Are you sure you want to delete this student?"
        onConfirm={handleDeleteStudent}
        onCancel={() => setModalVisible(false)}
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 18,
  },
});

export default EditStudent;
