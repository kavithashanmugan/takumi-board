import React, { useState } from "react";
import Section from "./Section";
import { DataType, Task, TaskStatus } from "../types/index";

const initialData: DataType = {
  "todo": {
    id: "todo",
    name: "TO DO",
    tasks: [{
      id: "TAK-2",
      title: "create drag and drop",
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    }],
  },
  "in-progress": {
    id: "in-progress",
    name: "IN PROGRESS",
    tasks: [{
      id: "TAK-1",
      title: "finish project",
      status: "in-progress",
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: false,
    }],
  },
  "done": {
    id: "done",
    name: "DONE",
    tasks: [],
  },
};

const Board: React.FC = () => {
  const [data, setData] = useState<DataType>(initialData);

  const handleDragStart = (event: React.DragEvent<Element>, taskId: string, sourceSection: TaskStatus) => {
    event.dataTransfer.setData("taskId", taskId);
    event.dataTransfer.setData("sourceSection", sourceSection);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, destinationSection: TaskStatus) => {
    const taskId = event.dataTransfer.getData("taskId");
    const sourceSection = event.dataTransfer.getData("sourceSection") as TaskStatus;

    if (!taskId || !sourceSection || !destinationSection || sourceSection === destinationSection) return;

    const taskToMove = data[sourceSection].tasks.find((task: Task) => task.id === taskId);

    if (!taskToMove) return;

    setData((prevData: DataType) => {
      const sourceTasks = prevData[sourceSection].tasks.filter((task: Task) => task.id !== taskId);
      const destinationTasks = [
        ...prevData[destinationSection].tasks,
        { ...taskToMove, status: destinationSection, updatedAt: new Date() },
      ];

      return {
        ...prevData,
        [sourceSection]: { ...prevData[sourceSection], tasks: sourceTasks },
        [destinationSection]: { ...prevData[destinationSection], tasks: destinationTasks },
      };
    });
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
        />
      ))}
    </div>
  );
};

export default Board;

