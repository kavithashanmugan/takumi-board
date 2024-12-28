import { useState, useEffect } from "react";
import { fetchTasks } from "../api/taskApi";
import { Task } from "../types";
import { DataType } from "../types";

const useTasks = () => {
  const [tasks, setTasks] = useState<DataType>({
    "todo": { id: "todo", name: "TO DO", tasks: [] },
    "in-progress": { id: "in-progress", name: "IN PROGRESS", tasks: [] },
    "done": { id: "done", name: "DONE", tasks: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const allTasks = await fetchTasks();
        console.log("allllllll",allTasks)
        const groupedTasks: DataType = {
          "todo": { id: "todo", name: "TO DO", tasks: [] },
          "in-progress": { id: "in-progress", name: "IN PROGRESS", tasks: [] },
          "done": { id: "done", name: "DONE", tasks: [] },
        };
        allTasks.forEach((task: Task) => {
          groupedTasks[task.status as keyof DataType].tasks.push(task);
          groupedTasks[task.status].tasks.push(task);
        });

        setTasks(groupedTasks);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return { tasks, loading, error, setTasks };
};

export default useTasks;
