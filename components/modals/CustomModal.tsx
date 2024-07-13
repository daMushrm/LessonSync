import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type CustomModalProps = {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const CustomModal = ({
  isVisible,
  message,
  onConfirm,
  onCancel,
}: CustomModalProps) => {
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
              Confirm
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
    backgroundColor: "black",
  },
  deleteButtonText: {
    color: "white",
  },
});

export default CustomModal;
