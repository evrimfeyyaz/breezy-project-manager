import { Stack } from "expo-router";
import { ConnectivityStatus } from "../../components/ConnectivityStatus";
import { useConnectivity } from "../../services/connectivity-service";

export default function ProjectsLayout() {
  const { isBackendReachable } = useConnectivity();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Projects",
          headerLeft: () => <ConnectivityStatus isBackendReachable={isBackendReachable} />,
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Project Details" }} />
      <Stack.Screen name="create" options={{ title: "Create Project" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Project" }} />
    </Stack>
  );
}
