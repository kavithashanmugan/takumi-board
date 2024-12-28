
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../components/Board';
import { jest } from '@jest/globals';

jest.mock('../api/taskApi', () => ({
  fetchTasks: jest.fn(),
  updateTask: jest.fn(),
}));

describe('Board Component', () => {
  const mockTasks = [
    { _id: '1', title: 'Task 1', status: 'todo' },
    { _id: '2', title: 'Task 2', status: 'in-progress' },
    { _id: '3', title: 'Task 3', status: 'done' },
  ];

  beforeEach(() => {
    require('../api/taskApi').fetchTasks.mockResolvedValue(mockTasks);
  });

  it('renders loading state initially', () => {
    render(<Board />);
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  it('renders sections after tasks are loaded', async () => {
    await act(async () => {
      render(<Board />);
    });

    expect(screen.getByText('TO DO')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('DONE')).toBeInTheDocument();
  });

  it('renders tasks in correct sections', async () => {
    await act(async () => {
      render(<Board />);
    });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('handles errors when fetching tasks fails', async () => {
    require('../api/taskApi').fetchTasks.mockRejectedValue(new Error('Failed to fetch'));

    await act(async () => {
      render(<Board />);
    });

    expect(screen.getByText('Failed to load tasks. Please try again later.')).toBeInTheDocument();
  });
});

