import cors from 'cors';
import express, { Request, Response } from 'express';
import { Project } from './types';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const projects: Project[] = [];

// GET /projects endpoint
app.get('/projects', (_req: Request, res: Response) => {
  res.json(projects);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
