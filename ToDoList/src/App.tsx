import React, { useState } from 'react';
import './App.css'; // Vamos criar este arquivo para o CSS

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Nome da tarefa que está por fazer', completed: false },
    { id: 2, name: 'Segunda tarefa por fazer', completed: false },
    { id: 3, name: 'Exemplo-de-tarefa', completed: true },
    { id: 4, name: 'Segundo-exemplo-aleatório-de-nome-de-tarefa', completed: true },
    { id: 5, name: 'Mais-um-exemplo-de-tarefa-finalizada', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: any) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
      setTasks([...tasks, { id: newId, name: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id: any) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="app-container">
      <div className="todo-list-card">
        <div className="card-header">
          
          <h1>To-Do List</h1>
        </div>
        <div className="add-task-section">
          <input
            type="text"
            placeholder="Adicione uma tarefa a lista. Pressione Enter para salvar."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleAddTask}
          />
        </div>

        {pendingTasks.length > 0 && (
          <div className="tasks-section">
            <p className="section-title">Para fazer</p>
            {pendingTasks.map(task => (
              <div key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <span>{task.name}</span>
              </div>
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="tasks-section">
            <p className="section-title">Concluído</p>
            {completedTasks.map(task => (
              <div key={task.id} className="task-item completed">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <span>{task.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;