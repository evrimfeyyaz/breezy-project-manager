import cors from "cors";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { initialProjects } from "./initial-data";
import { CreateProjectPayload, Project, UpdateProjectPayload } from "./types";

const ALLOWED_STATUSES: Project["status"][] = [
  "backlog",
  "todo",
  "in-progress",
  "completed",
];
const DEFAULT_STATUS: Project["status"] = "backlog";

const isValidStatus = (status: string): status is Project["status"] => {
  return ALLOWED_STATUSES.includes(status.toLowerCase() as Project["status"]);
};

const printInfo = (message: string, data: unknown) => {
  console.log(message);
  console.log(JSON.stringify(data, null, 2));
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory database
const projects: Project[] = [...initialProjects];

// GET /projects endpoint
app.get("/projects", (_req: Request, res: Response) => {
  printInfo("GET /projects", projects);

  res.json(projects);
});

// POST /projects endpoint
app.post("/projects", (req, res) => {
  printInfo("POST /projects", req.body);

  const {
    id,
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
    id: id ?? uuidv4(),
    name,
    status,
    assignee,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

// PUT /projects/:id endpoint
app.put("/projects/:id", (req, res) => {
  printInfo("PUT /projects/:id", req.body);

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
  res.status(200).json(updatedProject);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
