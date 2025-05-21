import { use$ } from "@legendapp/state/react";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import ProjectForm from "../../components/projects/ProjectForm";
import { projects$ } from "../../state/projectsState";
import { Project } from "../../types";

export default function EditProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = use$(() => projects$[id].get());

  const handleSaveProject = (data: Partial<Project>) => {
    if (!data.name) {
      Alert.alert("Error", "Project name is required");
      return;
    }

    if (!data.status) {
      Alert.alert("Error", "Project status is required");
      return;
    }

    const updatedProjectData: Partial<Project> = {
      name: data.name,
      assignee: data.assignee,
      status: data.status,
    };

    projects$[id].assign(updatedProjectData);

    router.back();
  };

  if (!project) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ProjectForm
        initialData={project}
        onSubmit={handleSaveProject}
        submitButtonText="Update Project"
      />
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
