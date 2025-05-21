import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Project, ProjectStatus } from "../../types";
import SelectInput from "../common/SelectInput";

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

type ProjectFormProps = {
  /** The initial data to prefill the form with */
  initialData?: Partial<Project>;
  /** The function to call when the form is submitted */
  onSubmit: (data: Partial<Project>) => void;
  /** The text to display on the submit button */
  submitButtonText?: string;
};

/**
 * A form for creating and updating projects.
 */
export default function ProjectForm({
  initialData,
  onSubmit,
  submitButtonText = "Save Project",
}: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [assignee, setAssignee] = useState<string | undefined>(initialData?.assignee);
  const [status, setStatus] = useState<ProjectStatus | undefined>(initialData?.status || "backlog");

  useEffect(() => {
    setName(initialData?.name || "");
    setAssignee(initialData?.assignee);
    setStatus(initialData?.status || "backlog");
  }, [initialData]);

  const handleSave = () => {
    onSubmit({
      name: name.trim(),
      assignee,
      status,
    });
  };

  return (
    <View>
      <Text style={formStyles.label}>Project Name:</Text>
      <TextInput
        style={formStyles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter project name"
      />

      <Text style={formStyles.label}>Assignee:</Text>
      <SelectInput
        onValueChange={(value) => setAssignee(value)}
        items={assigneeItems}
        value={assignee}
        placeholder={{ label: "Select an assignee (optional)", value: undefined }}
      />

      <Text style={formStyles.label}>Status:</Text>
      <SelectInput
        onValueChange={(value) => setStatus(value)}
        items={statusItems}
        value={status}
        placeholder={{ label: "Select a status", value: undefined }}
      />

      <Button title={submitButtonText} onPress={handleSave} />
    </View>
  );
}

const formStyles = StyleSheet.create({
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
