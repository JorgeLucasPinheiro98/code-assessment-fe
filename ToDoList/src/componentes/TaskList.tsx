import React from 'react';
import type { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditText: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onToggleComplete, onEditText }) => {
  return (
    <div className="task-list-section">
      <h3>{title}</h3>
      {tasks.length === 0 ? (
        <p className="no-tasks">Nenhuma tarefa aqui.</p>
      ) : (
        <div className="task-items-container">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEditText={onEditText}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;