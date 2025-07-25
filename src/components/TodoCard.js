import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import { format } from 'date-fns';

const TodoCard = ({ todo }) => {
  const { updateTodoStatus, setDueDate, showContextMenu } = useContext(TodoContext);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [newDueDate, setNewDueDate] = useState('');

  const handleContextMenu = (e) => {
    showContextMenu(e, todo);
  };

  const statusColors = {
    new: 'bg-blue-200 border-blue-500',
    ongoing: 'bg-orange-200 border-orange-500',
    done: 'bg-green-200 border-green-500'
  };

  const statusText = {
    new: 'New',
    ongoing: 'Ongoing',
    done: 'Done'
  };

  const handleDueDateChange = () => {
    if (newDueDate) {
      setDueDate(todo.id, new Date(newDueDate));
    }
    setIsEditingDueDate(false);
  };

  return (
    <div 
      className={`p-4 mb-3 rounded-lg border-l-4 ${statusColors[todo.status]} shadow-sm`}
      onContextMenu={handleContextMenu}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">{todo.title}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[todo.status]}`}>
          {statusText[todo.status]}
        </span>
        <div className="flex items-center gap-2">
          {/* 3-dot button for dropdown */}
          <button
            onClick={(e) => {
              // Prevent bubbling to parent div
              e.stopPropagation();
              showContextMenu(e, todo);
            }}
            className="ml-2 p-1 rounded hover:bg-gray-200"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
              <circle cx="4" cy="10" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
            </svg>
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{todo.description}</p>
      
      {todo.status === 'ongoing' && (
        <div className="mt-3">
          {isEditingDueDate ? (
            <div className="flex items-center">
              <input
                type="datetime-local"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="text-sm p-1 border rounded"
              />
              <button 
                onClick={handleDueDateChange}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Set
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm mt-1">
                Due: {todo.dueDate ? format(new Date(todo.dueDate), 'MMM dd, yyyy HH:mm') : 'Not set'}
                <button 
                  onClick={() => {
                    setNewDueDate(todo.dueDate ? format(new Date(todo.dueDate), "yyyy-MM-dd'T'HH:mm") : '');
                    setIsEditingDueDate(true);
                  }}
                  className="ml-2 text-blue-500 text-xs"
                >
                  Edit
                </button>
              </p>
              {todo.dueDate && new Date() > new Date(todo.dueDate) && (
                <p className="text-red-500 text-xs mt-1">⚠️ Overdue!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoCard;