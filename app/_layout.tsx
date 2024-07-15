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
        <Stack.Screen
          name="finance/showFinance"
          options={{ title: "Finance" }}
        />
        <Stack.Screen
          name="performance/showPerformance"
          options={{ title: "Performance" }}
        />
        <Stack.Screen name="profile/profile" options={{ title: "Profile" }} />
        <Stack.Screen
          name="profile/developer"
          options={{ title: "Developer" }}
        />
      </Stack>
      <Toast />
    </>
  );
}
