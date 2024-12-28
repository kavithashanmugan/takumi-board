export interface Task {
  _id?: string;
  title: string;
  boardId: "backend1",
  description?: string;
  assignedTo?: string;
  status: TaskStatus;
  createdAt?: Date | string; 
  updatedAt?: Date | string;
  dueDate?: string;
  isCompleted: boolean;
}

  
  export type TaskStatus = 'todo' | 'in-progress' | 'done';
  
  export interface SectionType {
    id: string;
    name: string;
    tasks: Task[];
  }
  
  export type DataType = {
    [key in TaskStatus]: SectionType;
  };
  
  