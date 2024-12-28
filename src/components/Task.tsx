import React, { useState } from "react";
import { Task as TaskType, TaskStatus } from "../types/index";
import { Edit, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import { updateTask, deleteTask } from "../api/taskApi";

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
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedTask = await updateTask(task._id || "", {
        title: editedTask.title,
        description: editedTask.description,
        assignedTo: editedTask.assignedTo,
        dueDate: editedTask.dueDate,
        isCompleted: editedTask.isCompleted,
      });
      setEditedTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteTask(task._id || "");
      setIsDeleteModalOpen(false);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setDeleting(false);
    }
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({ ...editedTask, dueDate: e.target.value });
  };

  const formatDate = (date?: Date | string): string => {
    return date ? new Date(date).toLocaleString() : "N/A";
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer"
        draggable
        onDragStart={(event) => onDragStart(event, task._id || "", sectionId)}
        onDoubleClick={() => setShowDetails(true)}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900 text-left">
            {task.title}
          </span>
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
        <div className="flex text-xs text-gray-500 mt-1">
          {task._id || "N/A"}
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Task Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✖
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <strong>Title:</strong> {task.title}
              </div>
              <div>
                <strong>Description:</strong> {task.description || "N/A"}
              </div>
              <div>
                <strong>Completion Status:</strong>{" "}
                {task.isCompleted ? "Completed" : "Not Completed"}
              </div>
              <div>
                <strong>Created At:</strong> {formatDate(task.createdAt)}
              </div>
              <div>
                <strong>Updated At:</strong> {formatDate(task.updatedAt)}
              </div>
              <div>
                <strong>Assigned To:</strong> {task.assignedTo || "N/A"}
              </div>
              <div>
                <strong>Task ID:</strong> {task._id || "N/A"}
              </div>
              <div>
                <strong>Due Date:</strong>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={task.dueDate || ""}
                  onChange={handleDueDateChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="Close"
                onClick={() => setShowDetails(false)}
                variant="secondary"
                size="small"
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-medium mb-2">
              Delete Task {task.title}?
            </h2>
            <p className="text-sm text-gray-700">
              You are about to permanently delete this task. This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                label="Cancel"
                onClick={() => setIsDeleteModalOpen(false)}
                variant="secondary"
                size="medium"
              />
              <Button
                label={deleting ? "Deleting..." : "Delete"}
                onClick={handleDeleteConfirm}
                variant="danger"
                size="medium"
                disabled={deleting}
              />
            </div>
          </div>
        </div>
      )}

{isEditing && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Edit Task</h2>
        <button
          onClick={() => setIsEditing(false)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Title</label>
          <input
            type="text"
            placeholder="Task title"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1  text-left">Description</label>
          <textarea
            placeholder="Task description"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Assigned To</label>
          <input
            type="text"
            placeholder="Assignee name"
            value={editedTask.assignedTo}
            onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button
          label="Save"
          onClick={handleSave}
          variant="success"
          size="medium"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-half"
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Task;
