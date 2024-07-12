import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GroupCard = ({ group }: any) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => router.push("/groups/showGroup?group_id=" + group.id)}
  >
    <Text style={styles.cardTitle}>{group.name}</Text>
    <View style={styles.cardTimeContainer}>
      <Feather name="clock" size={16} color="gray" />
      <Text style={styles.cardTime}>
        {group.day}, {group.time}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTime: {
    marginLeft: 8,
    color: "gray",
  },
});

export default GroupCard;
