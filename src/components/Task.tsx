import React, { useState } from "react";
import { Task as TaskType, TaskStatus } from "../types/index";
import { Edit, Trash2 } from 'lucide-react';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Save task:", editedTask);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete task:", task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer"
        draggable
        onDragStart={(event) => onDragStart(event, task.id, sectionId)}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">{task.title}</span>
          <div className="flex gap-2">
            <button
              title="Edit Task"
              onClick={handleEditClick}
              className="p-0 hover:text-blue-600 focus:outline-none bg-white"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              className="text-red-500 hover:text-red-700 p-0 focus:outline-none bg-white"
              title="Delete Task"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">{task.id}</div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-2">Delete Task</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-1 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
