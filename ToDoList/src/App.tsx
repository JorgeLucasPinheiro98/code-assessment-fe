import React, { useState, useEffect } from 'react';
import type { Task } from './types';
import TaskList from './componentes/TaskList';
import './App.css';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Carrega as tarefas do localStorage ao iniciar
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');

  // Salva as tarefas no localStorage sempre que elas mudam
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskText.trim() !== '') {
      const newTodo: Task = {
        id: uuidv4(),
        text: newTaskText.trim(),
        completed: false,
      };
      setTasks([...tasks, newTodo]);
      setNewTaskText('');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditText = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="">
      <div className="todo-list-card">
        <div className="todo-list-header">
          <span className="icon">✔</span>
          <h1>Todo List</h1>
        </div>

        <div className="add-task-section">
          <input
            type="text"
            placeholder="Adicione uma tarefa a lista."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleAddTask}
            className="add-task-input"
          />
        </div>

        <TaskList
          title="Para fazer"
          tasks={pendingTasks}
          onToggleComplete={handleToggleComplete}
          onEditText={handleEditText}
        />

        <TaskList
          title="Concluído"
          tasks={completedTasks}
          onToggleComplete={handleToggleComplete}
          onEditText={handleEditText}
        />
      </div>
    </div>
  );
}

export default App;