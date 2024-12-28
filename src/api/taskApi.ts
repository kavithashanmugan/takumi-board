import axiosInstance from "./axiosInstance";
import { Task, TaskStatus } from "../types";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get("/");
  return response.data;
};

export const fetchTaskById = async (taskId: string): Promise<Task> => {
  const response = await axiosInstance.get(`/${taskId}`);
  return response.data;
};

export const createTask = async (task: Task): Promise<Task> => {
  const response = await axiosInstance.post("/", task);
  return response.data;
};

export const updateTask = async (taskId: string, updatedFields: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.put(`/${taskId}`, updatedFields);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/${taskId}`);
};

export const moveTask = async (taskId: string, status: TaskStatus): Promise<Task> => {
  const response = await axiosInstance.put(`/${taskId}/move`, { status });
  return response.data;
};
