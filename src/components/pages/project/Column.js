import React from 'react';

import { useDrop } from 'react-dnd';
import Task from './Task';

export const Column = ({ status, cards, moveCard }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item) => moveCard(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    type: 'card', // Specify the type of the drop target
  });

  return (
    <div className='flex flex-column items-center flex-grow-1 me-3'>
      <h4 className='mb-2 mt-2 align-items-center'>{status}</h4>
      <div
        ref={drop}
        className={`p-2 rounded-md flex-grow-1 h-100
        ${isOver ? 'bg-gray-100' : 'bg-white'}
        `}
      >
        {cards?.map((card) => (
          <Task key={card._id} id={card._id} task={card} />
        ))}
      </div>
    </div>
  );
};
