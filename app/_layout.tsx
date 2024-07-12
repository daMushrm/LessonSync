import { Stack } from "expo-router";
import "expo-dev-client";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="groups/addGroup" options={{ title: "Add Group" }} />
        <Stack.Screen
          name="groups/showGroup"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="groups/editGroup"
          options={{ title: "Edit Group" }}
        />
        <Stack.Screen
          name="students/addStudent"
          options={{ title: "Add Student" }}
        />
        <Stack.Screen
          name="students/editStudent"
          options={{ title: "Edit Student" }}
        />
        <Stack.Screen
          name="attendance/showAttendance"
          options={{ title: "Attendance" }}
        />
        <Stack.Screen name="paying/showPaying" options={{ title: "Paying" }} />
      </Stack>
      <Toast />
    </>
  );
}
