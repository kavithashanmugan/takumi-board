import { createTask, updateTask, deleteTask, moveTask } from "../api/taskApi";
import { Task, TaskStatus } from "../types";

const useTaskActions = (setTasks: React.Dispatch<React.SetStateAction<any>>) => {
  const addTask = async (sectionId: TaskStatus, task: Task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prevTasks: any) => ({
        ...prevTasks,
        [sectionId]: {
          ...prevTasks[sectionId],
          tasks: [...prevTasks[sectionId].tasks, newTask],
        },
      }));
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const editTask = async (taskId: string, updatedFields: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(taskId, updatedFields);
      setTasks((prevTasks: any) => {
        const section = updatedTask.status;
        const updatedTasks = prevTasks[section].tasks.map((task: Task) =>
          task.id === taskId ? updatedTask : task
        );

        return {
          ...prevTasks,
          [section]: { ...prevTasks[section], tasks: updatedTasks },
        };
      });
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const removeTask = async (taskId: string, sectionId: TaskStatus) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks: any) => ({
        ...prevTasks,
        [sectionId]: {
          ...prevTasks[sectionId],
          tasks: prevTasks[sectionId].tasks.filter((task: Task) => task.id !== taskId),
        },
      }));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const moveTaskToSection = async (taskId: string, destinationSection: TaskStatus) => {
    try {
      const movedTask = await moveTask(taskId, destinationSection);
      setTasks((prevTasks: any) => {
        const sourceSection = movedTask.status;
        const updatedSourceTasks = prevTasks[sourceSection].tasks.filter(
          (task: Task) => task.id !== taskId
        );

        const updatedDestinationTasks = [...prevTasks[destinationSection].tasks, movedTask];

        return {
          ...prevTasks,
          [sourceSection]: { ...prevTasks[sourceSection], tasks: updatedSourceTasks },
          [destinationSection]: { ...prevTasks[destinationSection], tasks: updatedDestinationTasks },
        };
      });
    } catch (err) {
      console.error("Failed to move task:", err);
    }
  };

  return { addTask, editTask, removeTask, moveTaskToSection };
};

export default useTaskActions;
