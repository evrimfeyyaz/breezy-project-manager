import { syncState } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import { Link } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import ProjectListItem from "../../components/projects/ProjectListItem";
import { projects$ } from "../../state/projects-state";
import { Project } from "../../types";

const ProjectListScreen = () => {
  const projects = use$(() => projects$.peek() && Object.values(projects$.get()));

  const renderItem = useCallback(
    ({ item }: { item: Project }) => <ProjectListItem item={item} />,
    [],
  );

  useEffect(function syncWithBackend() {
    syncState(projects$).sync();
  });

  return (
    <View style={styles.container}>
      <FlatList data={projects} renderItem={renderItem} keyExtractor={(item) => item.id} />

      <Link href="/projects/create" asChild>
        <Button title="Create Project" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProjectListScreen;
