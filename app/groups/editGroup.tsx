import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { deleteGroup, updateGroup } from "@/sqlite/groups";
import showToast from "@/components/showToast";
import { deleteStudentsByGroupId } from "@/sqlite/students";
import { deleteAttendanceByGroupId } from "@/sqlite/attendance";
import { deleteFinanceByGroupId } from "@/sqlite/finance";

const EditGroup = () => {
  const {
    id: groupId,
    name: initialName,
    day: initialDay,
    time: initialTime,
  } = useLocalSearchParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("12:00 PM"); // Initialize with a default time format
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    setId(groupId?.toString() || "");
    setName(initialName?.toString() || "");
    setDay(initialDay?.toString() || "Monday");
    setTime(initialTime?.toString() || "12:00 PM"); // Set initial time format
  }, [initialName, initialDay, initialTime]);

  const handleSaveGroup = async () => {
    if (!name.trim() || !day.trim() || !time.trim()) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    try {
      await updateGroup(Number(id), name, day, time);
      showToast("Saved Successfully");
      router.back();
    } catch (error) {
      console.error("Error updating group:", error);
      Alert.alert("Error", "There was a problem updating the group.");
    }
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime: any) => {
    // Format the selected time as needed (e.g., "10:12 PM")
    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setTime(formattedTime);
    hideTimePicker();
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(Number(id));
      await deleteStudentsByGroupId(Number(id));
      await deleteAttendanceByGroupId(Number(id));
      await deleteFinanceByGroupId(Number(id));
      showToast("Deleted Successfully");
      router.replace("/");
    } catch (error) {
      console.error("Error deleting group:", error);
      Alert.alert("Error", "There was a problem deleting the group.");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this Group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: handleDeleteGroup,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter group name"
      />

      <Text style={styles.label}>Day:</Text>
      <Picker style={styles.picker} selectedValue={day} onValueChange={setDay}>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>

      <Text style={styles.label}>Time:</Text>
      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text>{time}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveGroup}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
        <Text style={styles.deleteButtonText}>Delete Group</Text>
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
    justifyContent: "center",
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
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
    borderBottomColor: "red",
  },
  deleteButtonText: {
    color: "red",
    fontSize: 18,
  },
});

export default EditGroup;
