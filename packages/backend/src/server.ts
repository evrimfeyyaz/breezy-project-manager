import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "./types";
import { isValidStatus, loadData, printInfo, saveData } from "./utils";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let projects: Project[] = [];
const operationLogs: string[] = [];

// Load initial data
const initialData = loadData();
projects = initialData.loadedProjects;

// Initial log and save
const initialMessage = "Server started";
if (!operationLogs.includes(initialMessage)) {
  operationLogs.push(initialMessage);
}
saveData(projects);
printInfo(projects, operationLogs, initialMessage);

// GET /projects endpoint
app.get("/projects", (_req: Request, res: Response) => {
  const message = "GET /projects: Displaying all projects";
  printInfo(projects, operationLogs, message);
  res.json(projects);
});

const DEFAULT_STATUS: Project["status"] = "backlog";

// POST /projects endpoint
app.post("/projects", (req, res) => {
  const {
    name,
    assignee,
    status: rawStatus,
  } = req.body as CreateProjectPayload;

  if (!name) {
    res.status(400).json({ message: "Project name is required." });
    return;
  }

  let status: Project["status"] = DEFAULT_STATUS;
  if (rawStatus && isValidStatus(rawStatus)) {
    status = rawStatus.toLowerCase() as Project["status"];
  } else if (rawStatus) {
    console.warn(
      `Invalid status provided: ${rawStatus}. Defaulting to '${DEFAULT_STATUS}'.`,
    );
  }

  const newProject: Project = {
    id: uuidv4(),
    name,
    status,
    assignee,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.push(newProject);
  const message = `POST /projects: Added project "${newProject.name}" (ID: ${newProject.id})`;
  operationLogs.push(message);
  saveData(projects);
  printInfo(projects, operationLogs, message);
  res.status(201).json(newProject);
});

// PUT /projects/:id endpoint
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    assignee,
    status: rawStatus,
  } = req.body as UpdateProjectPayload;
  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    res.status(404).json({ message: "Project not found." });
    return;
  }

  const originalProject = projects[projectIndex];
  let newStatus = originalProject.status;

  if (rawStatus && isValidStatus(rawStatus)) {
    newStatus = rawStatus.toLowerCase() as Project["status"];
  } else if (rawStatus) {
    console.warn(
      `Invalid status provided for update: ${rawStatus}. Status not changed.`,
    );
  }

  const shouldRemoveAssignee = assignee === null;
  const updatedProject: Project = {
    ...originalProject,
    name: name ?? originalProject.name,
    assignee: shouldRemoveAssignee
      ? undefined
      : (assignee ?? originalProject.assignee),
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  projects[projectIndex] = updatedProject;
  const message = `PUT /projects/:id: Updated project "${updatedProject.name}" (ID: ${updatedProject.id})`;
  operationLogs.push(message);
  saveData(projects);
  printInfo(projects, operationLogs, message);
  res.status(200).json(updatedProject);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
