import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';

const ContextMenu = () => {
  const { contextMenu, closeContextMenu, updateTodoStatus } = useContext(TodoContext);

  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.show) {
        closeContextMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu.show, closeContextMenu]);

  if (!contextMenu.show || !contextMenu.todo) return null;

  const getAvailableStatuses = (currentStatus) => {
    switch (currentStatus) {
      case 'new':
        return ['ongoing']; 
      case 'ongoing':
        return ['new', 'done']; 
      case 'done':
        return ['ongoing']; 
      default:
        return [];
    }
  };

  const statusLabels = {
    new: 'New',
    ongoing: 'Ongoing',
    done: 'Done'
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === 'done' && contextMenu.todo.status !== 'ongoing') {
      alert('Tasks can only be moved to Done from Ongoing');
      return;
    }
    
    updateTodoStatus(contextMenu.todo.id, newStatus);
    closeContextMenu();
  };

  return (
    <div 
      className="fixed bg-white shadow-lg rounded-md py-2 z-50 w-48"
      style={{ top: contextMenu.y, left: contextMenu.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 text-sm font-semibold border-b">Move to:</div>
      {getAvailableStatuses(contextMenu.todo.status).map(status => (
        <button
          key={status}
          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => handleStatusChange(status)}
        >
          {statusLabels[status]}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;