import { observablePersistSqlite } from "@legendapp/state/persist-plugins/expo-sqlite";
import { configureSynced } from "@legendapp/state/sync";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";
import Storage from "expo-sqlite/kv-store";

/**
 * Legend State's {@link https://legendapp.com/open-source/state/v3/sync/crud/ syncedCrud} with custom sync configuration.
 */
export const syncedBackend = configureSynced(syncedCrud, {
  persist: {
    name: "projects",
    plugin: observablePersistSqlite(Storage),
    retrySync: true,
  },
  retry: {
    infinite: true,
  },
  fieldCreatedAt: "createdAt",
  fieldUpdatedAt: "updatedAt",
  changesSince: "all",
  mode: "set",
});
