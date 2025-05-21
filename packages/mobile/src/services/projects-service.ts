import { Platform } from "react-native";
import { Project } from "../types";

export const API_BASE_URL =
  Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";
// export const API_BASE_URL = "http://172.20.10.2:3000"; // Replace this with your computer's local IP address if you'd like to test on a real device.

/**
 * Fetches all projects from the API.
 * @returns A list of projects.
 * @throws An error if the request fails.
 */
export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }

  return response.json() as Promise<Project[]>;
}

/**
 * Creates a new project.
 * @param projectData The data of the project to create.
 * @returns The created project.
 * @throws An error if the request fails.
 */
export async function createProject(projectData: Project): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create project: ${response.statusText}`);
  }

  return response.json() as Promise<Project>;
}

/**
 * Updates a project.
 * @param projectData The data of the project to update.
 * @returns The updated project.
 * @throws An error if the request fails.
 * @throws An error if the project ID is not provided.
 */
export async function updateProject(projectData: Partial<Project>): Promise<Project> {
  if (!projectData.id) {
    throw new Error("Project ID is required for update");
  }

  const response = await fetch(`${API_BASE_URL}/projects/${projectData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update project: ${response.statusText}`);
  }

  return response.json() as Promise<Project>;
}
