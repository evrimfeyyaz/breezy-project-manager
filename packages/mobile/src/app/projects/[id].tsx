import { use$ } from "@legendapp/state/react"; // Import useObservable
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { projects$ } from "../../state/projectsState"; // Import projects$

export default function ProjectDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = use$(() => projects$[id].get());

  if (!project && projects$.isLoading.get()) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading project details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: project ? project.name : "Project Details",
          headerRight: () => (
            <Button
              onPress={() => {
                /* TODO: Implement edit functionality */
              }}
              title="Edit"
            />
          ),
        }}
      />
      {project ? (
        <>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{project.id}</Text>
          <Text style={styles.label}>Assignee:</Text>
          <Text style={styles.value}>{project.assignee}</Text>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{project.status}</Text>
        </>
      ) : (
        <Text>Project not found or ID is missing.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
});
