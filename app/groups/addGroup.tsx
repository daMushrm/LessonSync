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
import { router } from "expo-router";
import { addGroup, createGroupTables } from "@/sqlite/groups";

const AddGroup = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Monday");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [amPm, setAmPm] = useState("AM");

  useEffect(() => {
    createGroupTables();
  }, []);

  const handleSaveGroup = async () => {
    if (!name.trim() || !day || !hours || !minutes || !amPm) {
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
    await addGroup(name, day, formattedTime);
    router.back();
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

      <TouchableOpacity style={styles.addButton} onPress={handleSaveGroup}>
        <Text style={styles.addButtonText}>Add Group</Text>
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
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
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

export default AddGroup;
