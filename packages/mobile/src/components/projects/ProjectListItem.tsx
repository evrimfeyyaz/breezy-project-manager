import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Project } from "../../../types";

type ProjectListItemProps = {
  /** The project to display. */
  item: Project;
};

/**
 * A component that displays a project item in a list.
 */
const ProjectListItem = ({ item }: ProjectListItemProps) => {
  return (
    <Link href={`/projects/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>
            {item.name} - {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});

export default ProjectListItem;
