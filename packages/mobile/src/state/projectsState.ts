import { observable, Observable } from "@legendapp/state";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "../services/projectApiService";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "../types";

export type ProjectsState = Record<string, Project>;

export const projects$: Observable<ProjectsState> = observable(
  syncedCrud<Project>({
    list: fetchProjects,
    create: async (projectData: CreateProjectPayload) => {
      return createProject({
        name: projectData.name,
        assignee: projectData.assignee,
        status: projectData.status,
      });
    },
    update: async (projectData: UpdateProjectPayload) => {
      return updateProject({
        id: projectData.id,
        name: projectData.name,
        assignee: projectData.assignee,
        status: projectData.status,
      });
    },
    delete: async (item: { id: string }) => {
      return deleteProject(item.id);
    },
    persist: {
      name: "projects",
    },
    mode: "assign",
  }),
);
