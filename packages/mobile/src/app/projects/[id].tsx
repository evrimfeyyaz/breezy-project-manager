import { use$ } from "@legendapp/state/react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import ProjectDetails from "../../components/projects/ProjectDetails";
import ProjectNotFound from "../../components/projects/ProjectNotFound";
import { projects$ } from "../../state/projectsState";

export default function ProjectDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = use$(() => projects$[id].get());
  const navigation = useNavigation();

  const renderHeaderRight = useCallback(
    () => (
      <Button
        onPress={() => {
          router.push({
            pathname: "/projects/edit",
            params: { id },
          });
        }}
        title="Edit"
      />
    ),
    [id],
  );

  useEffect(
    function setHeader() {
      navigation.setOptions({
        title: project.name,
        headerRight: renderHeaderRight,
      });
    },
    [navigation, project.name, renderHeaderRight],
  );

  if (!project && projects$.isLoading.get()) {
    return <LoadingIndicator text="Loading project details..." />;
  }

  if (!project) {
    return <ProjectNotFound />;
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
});
