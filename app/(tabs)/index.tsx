import { StyleSheet, Text, View } from "react-native";

const Today = () => {
  return (
    <View style={styles.container}>
      <Text>Today's Lessons</Text>
    </View>
  );
};
export default Today;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
