import React from 'react';

import { useDrop } from 'react-dnd';
import { Task } from './Task';

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
    <>
      <h4 className='mb-2'>{status}</h4>
      <div
        ref={drop}
        className={`flex flex-col w-full items-center p-4 rounded-md
        ${isOver ? 'bg-gray-100' : cards?.length > 0 ? 'bg-white' : 'bg-black'}
        `}
      >
        {cards?.map((card) => (
          <Task key={card._id} id={card._id} task={card} />
        ))}
      </div>
    </>
  );
};
