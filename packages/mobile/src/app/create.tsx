import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { projects$ } from "../state/projectsState";
import { Project, ProjectStatus } from "../types";

export default function CreateProjectScreen() {
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ProjectStatus>("backlog");

  const handleSaveProject = () => {
    if (!name.trim()) {
      Alert.alert("Validation Error", "Project name cannot be empty.");
      return;
    }

    if (!status) {
      Alert.alert("Validation Error", "Status cannot be empty.");
      return;
    }

    const newProjectData: Project = {
      id: randomUUID(),
      name: name.trim(),
      assignee: assignee,
      status,
      createdAt: null,
      updatedAt: null,
    };

    projects$[newProjectData.id].set(newProjectData);

    router.back();
  };

  const statusItems: { label: string; value: ProjectStatus }[] = [
    { label: "Backlog", value: "backlog" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Done", value: "completed" },
  ];

  const assigneeItems = [
    { label: "Alice", value: "Alice" },
    { label: "Bob", value: "Bob" },
    { label: "Charlie", value: "Charlie" },
    { label: "Diana", value: "Diana" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter project name"
      />

      <Text style={styles.label}>Assignee:</Text>
      <RNPickerSelect
        onValueChange={(value) => setAssignee(value)}
        items={assigneeItems}
        style={pickerSelectStyles}
        value={assignee}
        placeholder={{ label: "Select an assignee (optional)", value: undefined }}
      />

      <Text style={styles.label}>Status:</Text>
      <RNPickerSelect
        onValueChange={(value) => setStatus(value)}
        items={statusItems}
        style={pickerSelectStyles}
        value={status}
        placeholder={{ label: "Select a status", value: null }}
      />

      <Button title="Save Project" onPress={handleSaveProject} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputIOSContainer: {
    pointerEvents: "none",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});
