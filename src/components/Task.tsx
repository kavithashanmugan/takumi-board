import React, { useState } from "react";
import { Task as TaskType, TaskStatus } from "../types/index";
import { Edit, Trash2 } from "lucide-react";

interface TaskProps {
  task: TaskType;
  sectionId: TaskStatus;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceColumn: TaskStatus
  ) => void;
}

const Task: React.FC<TaskProps> = ({ task, sectionId, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically update the task in your state or backend
    console.log("Save task:", editedTask);
    setIsEditing(false);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200"
        draggable
        onDragStart={(event) => onDragStart(event, task.id, sectionId)}
      >
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900">{task.title}</div>
          <button
            className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2"
            onClick={handleEditClick}
            title="Edit Task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">{task.id}</div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Edit Task</h2>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <div className="flex justify-end gap-1">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
