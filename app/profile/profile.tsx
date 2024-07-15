import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getName, updateName } from "@/sqlite/profile";
import showToast from "@/components/showToast";
import exportDb from "@/sqlite/backup/export";
import Toast from "react-native-toast-message";

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await getName();
      setUsername(storedName || "");
    };

    fetchName();
  }, []);

  const showInfoToast = (msg: string) => {
    Toast.show({
      type: "info",
      text1: msg,
      position: "top",
      text1Style: {
        fontSize: 18,
        fontWeight: "normal",
      },
    });
  };
  const handleSave = async () => {
    if (!username.trim()) {
      showInfoToast("Please add your name!");
      return;
    }

    await updateName(username);
    showToast("Name updated successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Your Display Name:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
          <Ionicons name="checkmark-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Button title="export data" onPress={exportDb} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "thin",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  iconButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#000",
  },
});

export default Profile;