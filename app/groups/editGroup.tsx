import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [amPm, setAmPm] = useState("AM");

  useEffect(() => {
    setId(groupId?.toString() || "");
    setName(initialName?.toString() || "");
    setDay(initialDay?.toString() || "Monday");

    if (initialTime) {
      const [timePart, period] = (initialTime as string).split(" ");
      const [initHours, initMinutes] = timePart.split(":");
      setHours(initHours);
      setMinutes(initMinutes);
      setAmPm(period);
    }
  }, [initialName, initialDay, initialTime]);

  const handleSaveGroup = async () => {
    if (
      !name.trim() ||
      !day.trim() ||
      !hours.trim() ||
      !minutes.trim() ||
      !amPm.trim()
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    const hourNumber = parseInt(hours, 10);
    const minuteNumber = parseInt(minutes, 10);

    if (isNaN(hourNumber) || hourNumber < 1 || hourNumber > 12) {
      Alert.alert("Error", "Please enter a valid hour between 1 and 12.");
      return;
    }

    if (isNaN(minuteNumber) || minuteNumber < 0 || minuteNumber > 59) {
      Alert.alert("Error", "Please enter a valid minute between 0 and 59.");
      return;
    }

    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )} ${amPm}`;

    try {
      await updateGroup(Number(id), name, day, formattedTime);
      showToast("Saved Successfully");
      router.back();
    } catch (error) {
      console.error("Error updating group:", error);
      Alert.alert("Error", "There was a problem updating the group.");
    }
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
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          value={hours}
          onChangeText={(text) => setHours(text.replace(/[^0-9]/g, ""))}
          placeholder="HH"
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.timeInput}
          value={minutes}
          onChangeText={(text) => setMinutes(text.replace(/[^0-9]/g, ""))}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.amPm}>{amPm}</Text>
        <Picker
          selectedValue={amPm}
          style={styles.amPmPicker}
          onValueChange={(itemValue) => setAmPm(itemValue)}
        >
          <Picker.Item label="AM" value="AM" />
          <Picker.Item label="PM" value="PM" />
        </Picker>
      </View>

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
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  timeInput: {
    height: 40,
    width: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  colon: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  amPm: {
    marginLeft: 10,
    marginRight: -40,
  },
  amPmPicker: {
    height: 40,
    width: 80,
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
