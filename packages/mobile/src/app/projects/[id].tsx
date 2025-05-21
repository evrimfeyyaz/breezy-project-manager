import { use$ } from "@legendapp/state/react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import ProjectDetails from "../../components/projects/ProjectDetails";
import { projects$ } from "../../state/projectsState";

export default function ProjectDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = use$(() => projects$[id].get());
  const navigation = useNavigation();

  const renderHeaderRight = () => (
    <Button
      onPress={() => {
        /* TODO: Implement edit functionality */
      }}
      title="Edit"
    />
  );

  useEffect(() => {
    if (!project) {
      return;
    }

    navigation.setOptions({
      title: project.name,
      headerRight: renderHeaderRight,
    });
  }, [project, navigation]);

  if (!project && projects$.isLoading.get()) {
    return <LoadingIndicator text="Loading project details..." />;
  }

  if (!project) {
    return (
      <View style={styles.centered}>
        <Text>Project not found or ID is missing.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProjectDetails project={project} />
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
});
