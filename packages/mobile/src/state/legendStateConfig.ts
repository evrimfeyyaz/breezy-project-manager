import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { configureObservableSync } from "@legendapp/state/sync";

export function initializeLegendStatePersistence() {
  configureObservableSync({
    persist: {
      plugin: ObservablePersistMMKV,
      retrySync: true,
    },
    retry: {
      infinite: true,
    },
  });
}
