import fs from "fs";
import path from "path";
import { testData } from "./test-data";
import { ALLOWED_STATUSES, Project, ProjectStatus } from "./types";

const PROJECTS_DATA_PATH = path.join(__dirname, "..", "data", "projects.json");

/**
 * Prints the current state of the projects data and the operation log.
 * @param projects The current state of the projects data.
 * @param operationLogs The operation log.
 * @param displayMessage The message to print.
 */
export const printInfo = (
  projects: Project[],
  operationLogs: string[],
  displayMessage: string,
): void => {
  console.clear();
  console.log(displayMessage);
  console.log("\nCurrent projects:");
  console.table(projects);
  console.log("\nOperation Log:");
  operationLogs.forEach((log, index) => {
    console.log(`${index + 1}. ${log}`);
  });
};

/**
 * Checks if the given string is a valid project status.
 * @param status The string to check.
 */
export const isValidStatus = (status: string): status is ProjectStatus => {
  return ALLOWED_STATUSES.includes(status.toLowerCase() as ProjectStatus);
};

/**
 * Loads the projects data from the file system.
 * @returns The projects data.
 */
export const loadData = (): {
  loadedProjects: Project[];
} => {
  let loadedProjects: Project[] = [];

  try {
    if (!fs.existsSync(PROJECTS_DATA_PATH)) {
      fs.writeFileSync(PROJECTS_DATA_PATH, JSON.stringify(testData, null, 2));
      loadedProjects = testData;
      console.log("projects.json created and initialized with test data.");
    } else {
      const projectsData = fs.readFileSync(PROJECTS_DATA_PATH, "utf-8");
      loadedProjects = JSON.parse(projectsData);
    }
  } catch (error) {
    console.error("Error loading projects data:", error);
    loadedProjects = testData;
  }

  return { loadedProjects };
};

/**
 * Saves the projects data to the file system.
 * @param projectsToSave The projects data to save.
 */
export const saveData = (projectsToSave: Project[]): void => {
  try {
    fs.writeFileSync(
      PROJECTS_DATA_PATH,
      JSON.stringify(projectsToSave, null, 2),
    );
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
