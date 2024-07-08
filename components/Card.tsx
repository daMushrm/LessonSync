import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  text: string;
  onPress?: () => void;
}

const Card = ({ text, onPress }: CardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginVertical: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Card;
