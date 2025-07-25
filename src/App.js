import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Column from './components/Column';
import ContextMenu from './components/ContextMenu';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Column status="new" title="New" />
          <Column status="ongoing" title="Ongoing" />
          <Column status="done" title="Done" />
        </div>
        
        <ContextMenu />
      </div>
    </TodoProvider>
  );
}

export default App;