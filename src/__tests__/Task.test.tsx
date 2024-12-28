import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Task from '../components/Task';

jest.mock('../api/taskApi', () => ({
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('Task Component', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'This is a test task',
    boardId: 'backend1' as const,
    status: 'todo' as const,
    assignedTo: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
    isCompleted: false,
  };

  const mockOnDragStart = jest.fn();

  it('renders task title', () => {
    render(<Task task={mockTask} sectionId="todo" onDragStart={mockOnDragStart} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', () => {
    render(<Task task={mockTask} sectionId="todo" onDragStart={mockOnDragStart} />);
    fireEvent.click(screen.getByTitle('Edit Task'));
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });

  it('opens delete confirmation modal when delete button is clicked', () => {
    render(<Task task={mockTask} sectionId="todo" onDragStart={mockOnDragStart} />);
    fireEvent.click(screen.getByTitle('Delete Task'));
    expect(screen.getByText('Delete Task Test Task?')).toBeInTheDocument();
  });

  it('calls onDragStart when task is dragged', () => {
    render(<Task task={mockTask} sectionId="todo" onDragStart={mockOnDragStart} />);
    fireEvent.dragStart(screen.getByText('Test Task'));
    expect(mockOnDragStart).toHaveBeenCalledWith(expect.anything(), '1', 'todo');
  });
});

