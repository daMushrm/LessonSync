import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Today" }}
      />
      <Tabs.Screen name="allGroups" options={{ title: "All Groups" }} />
      {/* <Tabs.Screen
        name="groups/addGroup"
        options={{  }}
      /> */}
    </Tabs>
  );
}
