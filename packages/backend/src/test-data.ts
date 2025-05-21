import { Project } from "./types";

export const testData: Project[] = [
  {
    id: "project-1",
    name: "First Project",
    status: "backlog",
    assignee: "John Doe",
    createdAt: "2023-01-15T10:00:00.000Z",
    updatedAt: "2023-01-20T12:30:00.000Z",
  },
  {
    id: "project-2",
    name: "Second Project",
    status: "in-progress",
    assignee: "Jane Smith",
    createdAt: "2023-02-10T08:00:00.000Z",
    updatedAt: "2023-03-01T16:45:00.000Z",
  },
  {
    id: "project-3",
    name: "Third Project",
    status: "completed",
    createdAt: "2023-03-05T14:15:00.000Z",
    updatedAt: "2023-03-10T09:00:00.000Z",
  },
];
