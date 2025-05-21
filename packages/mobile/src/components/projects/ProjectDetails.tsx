import React from "react";
import { StyleSheet, Text } from "react-native";
import { Project } from "../../types";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <>
      <Text style={styles.title}>{project.name}</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{project.id}</Text>
      <Text style={styles.label}>Assignee:</Text>
      <Text style={styles.value}>{project.assignee ?? "Not assigned"}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{project.status}</Text>
    </>
  );
}

const styles = StyleSheet.create({
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
