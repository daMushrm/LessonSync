import { getGroupsByDay } from "@/sqlite/groups";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  const getTodaysGroups = async () => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    return await getGroupsByDay(today);
  };

  useEffect(() => {
    const fetchTodaysGroups = async () => {
      const todaysGroups = await getTodaysGroups();
      console.log(todaysGroups);
    };
    fetchTodaysGroups();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Index's Lessons</Text>
    </View>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
