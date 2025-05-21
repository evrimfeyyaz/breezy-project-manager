import { observable } from "@legendapp/state";
import { createProject, fetchProjects, updateProject } from "../services/projectApiService";
import { Project } from "../types";
import { syncedBackend } from "./syncedBackend";

export const projects$ = observable(
  syncedBackend<Project>({
    list: fetchProjects,
    create: async (projectData) => {
      return createProject({
        id: projectData.id,
        name: projectData.name,
        assignee: projectData.assignee,
        status: projectData.status,
        createdAt: null,
        updatedAt: null,
      });
    },
    update: async (projectData) => {
      return updateProject({
        id: projectData.id,
        name: projectData.name,
        assignee: projectData.assignee,
        status: projectData.status,
      });
    },
  }),
);
