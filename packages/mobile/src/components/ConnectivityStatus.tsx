import { View } from "react-native";

type ConnectivityStatusProps = {
  isBackendReachable: boolean | null | undefined;
};

/**
 * Displays a small circle that is green if the backend is reachable, and red if it is not.
 */
export function ConnectivityStatus({ isBackendReachable }: ConnectivityStatusProps) {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: isBackendReachable ? "green" : "red",
        marginHorizontal: 10,
      }}
    />
  );
}
