export interface Task {
    id: string;
    title: string;
    description?: string;
    assignedTo?: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
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
  
  