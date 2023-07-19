import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import AddTask from './AddTask';

export const Task = ({ id, task }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    type: 'card',
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        ref={drag}
        className={`bg-gray-200 p-2 m-1 rounded-md ${
          isDragging ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <Card onClick={handleOpenSidebar}>
          <Card.Body>
            <Card.Title>{task?.title}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              <strong>Priority: {task?.priority}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <AddTask
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        projectId={task?.projectId?._id}
        task={task}
        create={false}
      />
    </>
  );
};
