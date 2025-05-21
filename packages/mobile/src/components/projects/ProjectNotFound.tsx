import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * A component that displays a message when a project is not found.
 */
export default function ProjectNotFound() {
  return (
    <View style={styles.centered}>
      <Text>Project not found or ID is missing.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
});
