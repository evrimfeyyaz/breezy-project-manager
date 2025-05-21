import { Project } from "./types";

export const initialProjects: Project[] = [
  {
    id: "752340f7-f5d4-4f81-b19f-910e02a1b6a1",
    name: "Project Alpha",
    status: "in-progress",
    assignee: "Alice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "752340f7-f5d4-4f81-b19f-910e02a1b6a2",
    name: "Project Beta 3",
    status: "backlog",
    assignee: "Bob",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "752340f7-f5d4-4f81-b19f-910e02a1b6a3",
    name: "Project Gamma",
    status: "todo",
    assignee: "Charlie",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
