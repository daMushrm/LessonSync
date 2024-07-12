import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type StudentModalProps = {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const StudentModal = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
}: StudentModalProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={onConfirm}
          >
            <Text style={[styles.buttonText, styles.deleteButtonText]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  message: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  deleteButtonText: {
    color: "white",
  },
});

export default StudentModal;
