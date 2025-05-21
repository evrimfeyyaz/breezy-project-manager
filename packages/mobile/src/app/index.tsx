import { use$ } from "@legendapp/state/react";
import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { projects$ } from "../state/projectsState";
import { Project } from "../types";

const ProjectListScreen = () => {
  const projects = use$(() => Object.values(projects$.get()));

  const renderItem = ({ item }: { item: Project }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={projects} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <Button title="Create Project" onPress={() => console.log("Create Project pressed")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});

export default ProjectListScreen;
