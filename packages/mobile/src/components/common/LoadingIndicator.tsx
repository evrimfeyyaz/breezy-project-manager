import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingIndicatorProps = {
  /** The text to display below the loading indicator. */
  text?: string;
};

/**
 * A component that displays a loading indicator and a text message.
 */
export default function LoadingIndicator({ text = "Loading..." }: LoadingIndicatorProps) {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" accessibilityLabel="Loading content" />
      <Text style={styles.text}>{text}</Text>
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
  text: {
    marginTop: 8,
    fontSize: 16,
  },
});
