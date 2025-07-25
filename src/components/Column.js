import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoCard from './TodoCard';

const Column = ({ status, title }) => {
  const { todos, addTodo } = useContext(TodoContext);
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const filteredTodos = todos.filter(todo => todo.status === status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleInput.trim()) {
      addTodo(titleInput, descriptionInput);
      setTitleInput('');
      setDescriptionInput('');
      setShowForm(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex-1 min-w-[300px]">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {status === 'new' && (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + Add Task
        </button>
      )}
      
      {status === 'done' && (
        <p className="text-sm text-gray-500 mb-4 italic">
          * Tasks can only be moved here from Ongoing
        </p>
      )}
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 bg-white p-3 rounded shadow">
          <input
            type="text"
            placeholder="Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            rows="3"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Column;