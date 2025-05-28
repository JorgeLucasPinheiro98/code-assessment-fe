import React, { useState } from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditText: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEditText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditBlur = () => {
    onEditText(task.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditBlur();
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          onBlur={handleEditBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{task.text}</span>
      )}
    </div>
  );
};

export default TaskItem;