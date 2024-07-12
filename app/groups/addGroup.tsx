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
import { router } from "expo-router";
import { addGroup, createGroupTables } from "@/sqlite/groups";

const AddGroup = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    createGroupTables();
  }, []);

  const handleSaveGroup = async () => {
    if (!name.trim() || !day || !time) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    await addGroup(name, day, time.toLocaleTimeString());
    router.push("/allGroups?refresh=true");
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime: any) => {
    setTime(selectedTime);
    hideTimePicker();
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
        <Text>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

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
    justifyContent: "center",
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
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

export default AddGroup;
