import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="groups/addGroup" options={{ title: "Add Group" }} />
      <Stack.Screen name="groups/showGroup" options={{ headerShown: false }} />
    </Stack>
  );
}
