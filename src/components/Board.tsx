import React, { useEffect, useState } from "react";
import Section from "./Section";
import { fetchTasks, updateTask } from "../api/taskApi";
import { DataType, Task, TaskStatus } from "../types/index";

const Board: React.FC = () => {
  const [data, setData] = useState<DataType>({
    "todo": { id: "todo", name: "TO DO", tasks: [] },
    "in-progress": { id: "in-progress", name: "IN PROGRESS", tasks: [] },
    "done": { id: "done", name: "DONE", tasks: [] },
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks: Task[] = await fetchTasks();
  
        const standardizedTasks = tasks.map((task) => ({
          ...task,
          id: task._id,
        }));
  
        const groupedTasks: DataType = {
          "todo": { id: "todo", name: "TO DO", tasks: [] },
          "in-progress": { id: "in-progress", name: "IN PROGRESS", tasks: [] },
          "done": { id: "done", name: "DONE", tasks: [] },
        };
  
        standardizedTasks.forEach((task) => {
          groupedTasks[task.status]?.tasks.push(task);
        });
  
        setData(groupedTasks);
        console.log("Tasks loaded:", groupedTasks);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks. Please try again later.");
        setLoading(false);
      }
    };
  
    loadTasks();
  
    const intervalId = setInterval(() => {
      loadTasks();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  const handleDragStart = (
    event: React.DragEvent<Element>,
    taskId: string,
    sourceSection: TaskStatus
  ) => {
    event.dataTransfer.setData("taskId", taskId);
    console.log("this is taskid", taskId);
    event.dataTransfer.setData("sourceSection", sourceSection);
    console.log("Drag Start - Task ID:", taskId, "Source Section:", sourceSection);
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    destinationSection: TaskStatus
  ) => {
    const taskId = event.dataTransfer.getData("taskId");
    const sourceSection = event.dataTransfer.getData("sourceSection") as TaskStatus;
    console.log("Drop - Task ID:", taskId, "Destination Section:", destinationSection);

    if (!taskId || !sourceSection || sourceSection === destinationSection) return;

    const taskToMove = data[sourceSection].tasks.find(
      (task: Task) => task._id === taskId
    );

    if (!taskToMove) return;

    try {
      const updatedTask = await updateTask(taskId, { status: destinationSection });

      setData((prevData: DataType) => {
        const sourceTasks = prevData[sourceSection].tasks.filter(
          (task: Task) => task._id !== taskId
        );
        const destinationTasks = [...prevData[destinationSection].tasks, updatedTask];

        return {
          ...prevData,
          [sourceSection]: { ...prevData[sourceSection], tasks: sourceTasks },
          [destinationSection]: { ...prevData[destinationSection], tasks: destinationTasks },
        };
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleAddTask = (sectionId: TaskStatus, task: Task) => {
    setData((prevData) => ({
      ...prevData,
      [sectionId]: {
        ...prevData[sectionId],
        tasks: [...prevData[sectionId].tasks, task],
      },
    }));
  };

  if (loading) {
    return <div className="text-center mt-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {(Object.keys(data) as TaskStatus[]).map((sectionId) => (
        <Section
          key={sectionId}
          sectionId={sectionId}
          name={data[sectionId].name}
          tasks={data[sectionId].tasks}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onAddTask={handleAddTask}
          onUpdateTask={() => {}}
          onDeleteTask={() => {}}
        />
      ))}
    </div>
  );
};

export default Board;
