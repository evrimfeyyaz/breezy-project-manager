export interface Project {
  id: string;
  name: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'completed';
  /** The name of the person assigned to the project */
  assignee?: string;
  createdAt: string;
  updatedAt: string;
} 