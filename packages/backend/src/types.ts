export const ALLOWED_STATUSES = [
  "backlog",
  "todo",
  "in-progress",
  "completed",
] as const;

export type ProjectStatus = (typeof ALLOWED_STATUSES)[number];

export interface Project {
  /** The unique identifier of the project */
  id: string;
  /** The name of the project */
  name: string;
  /** The status of the project */
  status: ProjectStatus;
  /** The name of the person assigned to the project */
  assignee?: string;
  /** The date and time the project was created in ISO 8601 format */
  createdAt: string;
  /** The date and time the project was last updated in ISO 8601 format */
  updatedAt: string;
}

export interface CreateProjectPayload {
  /** The unique identifier of the project */
  id?: string;
  /** The name of the project */
  name?: string;
  /** The name of the person assigned to the project */
  assignee?: string;
  /** The status of the project */
  status?: string;
}

export interface UpdateProjectPayload {
  /** The updated name of the project, leave blank to keep the original name */
  name?: string;
  /** The updated name of the person assigned to the project, leave blank to keep the original assignment, or null to remove the assignment */
  assignee?: string | null;
  /** The updated status of the project, leave blank to keep the original status */
  status?: string;
}
