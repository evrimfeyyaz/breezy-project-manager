import { useNetInfoInstance } from "@react-native-community/netinfo";
import { API_BASE_URL } from "./projects-service";

const isPaused = false;
const config = {
  reachabilityUrl: API_BASE_URL,
  reachabilityTest: async (response: { status: number }) =>
    response.status >= 200 && response.status < 500,
  reachabilityLongTimeout: 10 * 1000, // 10s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
  reachabilityShouldRun: () => true,
  shouldFetchWiFiSSID: true,
  useNativeReachability: false,
};

/**
 * Returns the connectivity status of the device.
 */
export function useConnectivity() {
  const { netInfo } = useNetInfoInstance(isPaused, config);
  const { isInternetReachable: isBackendReachable } = netInfo;

  return { isBackendReachable };
}
