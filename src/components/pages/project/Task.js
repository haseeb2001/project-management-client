import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import GravatarAvatar from '../../common/Gravatar';
import AddTask from './AddTask';

const Task = ({ id, task }) => {
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const calculateTimeRemaining = () => {
    const currentDate = new Date();
    const dueDate = new Date(task?.dueDate);
    const timeDiff = dueDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  return (
    <>
      <div
        ref={drag}
        className={`bg-gradient-to-r from-blue-200 to-blue-300 p-2 m-2 rounded-md shadow ${
          isDragging ? 'opacity-50' : 'opacity-100'
        } hover:shadow-lg cursor-pointer transition`}
      >
        <Card onClick={handleOpenSidebar}>
          <Card.Body className='m-1'>
            <Card.Title>{task?.title}</Card.Title>
            <Card.Text>
              <div className='flex items-center mb-2'>
                <strong className='me-2'>Priority:</strong>{' '}
                <span
                  className={`${
                    task?.priority > 3
                      ? 'bg-danger text-white'
                      : task?.priority > 1
                      ? 'bg-warning text-black'
                      : 'bg-success text-white'
                  } p-2 py-1 rounded`}
                >
                  {task?.priority}
                </span>
              </div>

              <div className='flex items-center mb-2'>
                <strong className='me-2'>Created by:</strong>{' '}
                <GravatarAvatar
                  key={task?.userId?._id}
                  email={task?.userId?._id}
                  username={task?.userId?.username}
                  size={25}
                />
              </div>
              <div className='flex items-center'>
                <strong className='me-2'>Assigned to:</strong>{' '}
                {task?.assigned_to?.map((assignee) => (
                  <GravatarAvatar
                    key={assignee?._id}
                    email={assignee?._id}
                    username={assignee?.username}
                    size={25}
                  />
                ))}
              </div>
              <div className='flex items-center'>
                <strong className='me-1'>Due Date:</strong>{' '}
                {formatDate(task?.dueDate?.substring(0, 10))}
                <span className='text-sm text-gray-500 ml-1'>
          ({calculateTimeRemaining()} days remaining)
        </span>
              </div>
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

export default Task;
