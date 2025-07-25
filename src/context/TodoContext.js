import React, { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('kanban-todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    todo: null
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kanban-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: 'new',
      createdAt: new Date(),
      dueDate: null
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodoStatus = (id, newStatus) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        // Validate the transition
        if (newStatus === 'done' && todo.status !== 'ongoing') {
          alert('Tasks can only be moved to Done from Ongoing');
          return todo;
        }
        if (newStatus === 'ongoing' && todo.status === 'done') {
          alert('Tasks cannot go back to Ongoing from Done');
          return todo;
        }
        return { ...todo, status: newStatus };
      }
      return todo;
    }));
  };

  const setDueDate = (id, dueDate) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, dueDate } : todo
    ));
  };

  const showContextMenu = (e, todo) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      todo
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, show: false });
  };

  // Check for overdue tasks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const overdueTasks = todos.filter(todo => 
        todo.status === 'ongoing' && 
        todo.dueDate && 
        new Date(todo.dueDate).getTime() < now
      );
      
      if (overdueTasks.length > 0) {
        console.log('Overdue tasks:', overdueTasks);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodoStatus,
      setDueDate,
      contextMenu,
      showContextMenu,
      closeContextMenu
    }}>
      {children}
    </TodoContext.Provider>
  );
};