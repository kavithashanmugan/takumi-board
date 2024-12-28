import React, { useState } from "react";
import { Plus } from "lucide-react";
import Task from "./Task";
import Button from "../components/ui/Button";
import { Task as TaskType, TaskStatus } from "../types/index";
import { createTask } from "../api/taskApi";

interface SectionProps {
  sectionId: TaskStatus;
  name: string;
  tasks: TaskType[];
  onDragStart: (
    event: React.DragEvent<Element>,
    taskId: string,
    sourceSection: TaskStatus
  ) => void;
  onDrop: (
    event: React.DragEvent<HTMLDivElement>,
    destinationSection: TaskStatus
  ) => void;
  onAddTask: (sectionId: TaskStatus, task: TaskType) => void;
}

const Section: React.FC<SectionProps> = ({
  sectionId,
  name,
  tasks,
  onDragStart,
  onDrop,
  onAddTask,
}) => {
  console.log("tasks", tasks);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  const handleAddTaskClick = () => {
    setIsPopupOpen(true);
  };

  const handleCreateTask = async () => {
    try {
      const task: TaskType = {
        _id: "",
        boardId: "backend1",
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        status: sectionId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false,
      };

      const { _id, ...taskWithoutId } = task;
      const createdTask = await createTask(taskWithoutId);
      onAddTask(sectionId, createdTask);
      setNewTask({ title: "", description: "", assignedTo: "" });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const getBackgroundColor = () => {
    if (name.toLowerCase() === "to do") return "bg-[#db4437]";
    if (name.toLowerCase() === "in progress") return "bg-[#f0b317]";
    if (name.toLowerCase() === "done") return "bg-[#88c32c]";
    return "bg-gray-200";
  };

  return (
    <div
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 w-full sm:w-[300px] md:w-[280px] lg:w-[300px] xl:w-[320px]"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onDrop(event, sectionId)}
    >
      <div
        className={`flex items-center justify-between mb-4 p-2 rounded ${getBackgroundColor()}`}
      >
        <span>
          <h2 className="text-sm font-medium text-white">{name}</h2>
        </span>
        <span className="text-sm text-white">{tasks.length}</span>
      </div>
      <div className="space-y-3">
        <Button
          label="Add Task"
          icon={<Plus className="h-4 w-4" />}
          onClick={handleAddTaskClick}
          size="medium"
          variant="custom"
          className="w-full mt-4 py-2 px-4 text-sm text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center justify-center"
        />

        {tasks.map((task, index) => (
          <Task
            key={`${task._id}-${index}`}
            task={task}
            sectionId={sectionId}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-medium mb-4">Add Task</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Assigned To"
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
