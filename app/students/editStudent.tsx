import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const EditStudent = () => {
  const {
    name: initialName,
    phone: initialPhone,
    parentPhone: initialParentPhone,
  } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState(initialName || "");
  const [phone, setPhone] = useState(initialPhone || "");
  const [parentPhone, setParentPhone] = useState(initialParentPhone || "");

  useEffect(() => {
    setName(initialName || "");
    setPhone(initialPhone || "");
    setParentPhone(initialParentPhone || "");
  }, [initialName, initialPhone, initialParentPhone]);

  const handleSaveStudent = () => {
    if (!name.trim() || !phone.trim() || !parentPhone.trim()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    // Handle saving the edited student data here
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Parent Phone:", parentPhone);
    // Add your logic to save the data to your backend or storage

    // Navigate back or to another screen
    router.push("/students"); // Adjust the path based on your routing setup
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
