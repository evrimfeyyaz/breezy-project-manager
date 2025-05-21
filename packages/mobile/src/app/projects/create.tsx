import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import ProjectForm from "../../components/projects/ProjectForm";
import { projects$ } from "../../state/projectsState";
import { Project } from "../../types";

export default function CreateProjectScreen() {
  const handleSaveProject = (data: Partial<Project>) => {
    if (!data.name) {
      Alert.alert("Error", "Project name is required");
      return;
    }

    if (!data.status) {
      Alert.alert("Error", "Project status is required");
      return;
    }

    const newProjectData: Project = {
      id: randomUUID(),
      name: data.name,
      assignee: data.assignee,
      status: data.status,
      createdAt: null,
      updatedAt: null,
    };

    projects$[newProjectData.id].set(newProjectData);

    router.back();
  };

  return (
    <View style={styles.container}>
      <ProjectForm onSubmit={handleSaveProject} submitButtonText="Create Project" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
