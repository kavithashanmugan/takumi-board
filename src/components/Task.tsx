import React, { useState } from "react";
import { Task as TaskType, TaskStatus } from "../types/index";
import { Edit, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { updateTask, deleteTask } from "../api/taskApi";

interface TaskProps {
  task: TaskType;
  sectionId: TaskStatus;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceColumn: TaskStatus
  ) => void;
  onUpdateTask: (updatedTask: TaskType) => void;
  onDeleteTask: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, sectionId, onDragStart, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      onUpdateTask(updatedTask);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await deleteTask(task._id || "");
      setIsDeleteModalOpen(false);
      onDeleteTask(task._id || ""); 
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

  const formatDueDate = (date?: Date | string): string => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";
    return parsedDate.toISOString().split("T")[0];
  };
  

  return (
    <div>
      <div
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-pointer"
        draggable
        onDragStart={(event) => onDragStart(event, task._id || "", sectionId)}
        onDoubleClick={() => setShowDetails(true)}
      >
        <div className="flex justify-between text-left">
          <span className="text-sm font-medium text-gray-900">{task.title}</span>
          <div className="flex gap-2">
            <button
              title="Edit Task"
              onClick={() => setIsEditing(true)}
              className="hover:text-blue-600 focus:outline-none"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              title="Delete Task"
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-left">{task.assignedTo ?? "Unassigned"}</div>
      </div>

      {showDetails && (
        <Modal onClose={() => setShowDetails(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Task Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <strong className="text-gray-600 text-md">Title</strong>
                <span className="text-gray-800">{task.title}</span>
              </div>

              <div className="flex justify-between items-start border-b pb-2">
                <strong className="text-gray-600 text-md">Description</strong>
                <p className="text-gray-800">{task.description || "N/A"}</p>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <strong className="text-gray-600 text-md">Status</strong>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    task.isCompleted
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.isCompleted ? "Completed" : "Not Completed"}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <strong className="text-gray-600 text-md">Created At</strong>
                <span className="text-gray-800 text-left">{formatDate(task.createdAt)}</span>
              </div>

              <div className="flex justify-between  border-b pb-2">
                <strong className="text-gray-600 text-md">Updated At</strong>
                <span className="text-gray-800">{formatDate(task.updatedAt)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <strong className="text-gray-600 text-md">Assigned To</strong>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-800">{task.assignedTo || "N/A"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <strong className="text-gray-600 text-md">Due Date</strong>
                <span className="text-gray-800">{formatDate(task.dueDate)}</span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                label="Close"
                onClick={() => setShowDetails(false)}
                variant="secondary"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
              />
            </div>
          </div>
        </Modal>
      )}

      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <h2 className="font-bold text-2xl">Edit Task</h2>
          <div className="space-y-3 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Title
              </label>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Description
              </label>
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    description: e.target.value,
                  })
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Assigned To
              </label>
              <input
                type="text"
                value={editedTask.assignedTo}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    assignedTo: e.target.value,
                  })
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Due Date
              </label>
              <input
                type="date"
                value={formatDueDate(editedTask.dueDate)}
                onChange={handleDueDateChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              label="Save Changes"
              onClick={handleSave}
              variant="success"
            />
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
          <p className="text-sm text-gray-700 mt-2">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              label="Cancel"
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            />
            <Button
              label={deleting ? "Deleting..." : "Delete"}
              onClick={handleDeleteConfirm}
              variant="danger"
              disabled={deleting}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Task;
