import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Projects" }} />
      <Stack.Screen name="[id]" options={{ title: "Project Details" }} />
      <Stack.Screen name="create" options={{ title: "Create Project" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Project" }} />
    </Stack>
  );
}
