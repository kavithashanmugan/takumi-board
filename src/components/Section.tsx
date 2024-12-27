import React from "react";
import { Check, Plus } from 'lucide-react';
import Task from "./Task";
import { Task as TaskType, TaskStatus } from "../types/index";

interface SectionProps {
  sectionId: TaskStatus;
  name: string;
  tasks: TaskType[];
  onDragStart: (event: React.DragEvent<Element>, taskId: string, sourceSection: TaskStatus) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, destinationSection: TaskStatus) => void;
}

const Section: React.FC<SectionProps> = ({ sectionId, name, tasks, onDragStart, onDrop }) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 w-full sm:w-[300px] md:w-[280px] lg:w-[300px] xl:w-[320px]"
      onDragOver={handleDragOver}
      onDrop={(event) => onDrop(event, sectionId)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-700">{name}</h2>
          <span className="text-sm text-gray-500">{tasks.length}</span>
          {sectionId === 'done' && <Check className="h-4 w-4 text-green-500" />}
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            sectionId={sectionId} 
            onDragStart={onDragStart} 
          />
        ))}
      </div>
      <button
        className="w-full mt-4 py-2 px-4 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center justify-center"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </button>
    </div>
  );
};

export default Section;

