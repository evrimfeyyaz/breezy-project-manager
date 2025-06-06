export type ProjectStatus = "backlog" | "todo" | "in-progress" | "completed";

export type Project = {
  /** The unique identifier of the project */
  id: string;
  /** The name of the project */
  name: string;
  /** The status of the project */
  status: ProjectStatus;
  /** The name of the person assigned to the project, or null to remove the assignment */
  assignee?: string | null;
  /** The date and time the project was created in ISO 8601 format */
  createdAt: string | null;
  /** The date and time the project was last updated in ISO 8601 format */
  updatedAt: string | null;
};
