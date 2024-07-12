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
import { updateStudent } from "@/sqlite/students";

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
      Alert.alert("Success", "Student updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating student:", error);
      Alert.alert("Error", "There was a problem updating the student.");
    }

    router.back();
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
});

export default EditStudent;
