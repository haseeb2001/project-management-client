import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { projectStatuses, STATUSES } from '../../../constants/statuses';
import { updateTask } from '../../../store/taskSlice';
import { AppSpinner } from '../../common/AppSpinner';
import { Column } from './Column';

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const { data, status, errors } = useSelector((state) => state.task);

  if (status === STATUSES.LOADING) {
    return (
      <div className='flex justify-content-center'>
        <AppSpinner />
      </div>
    );
  }
  const moveCard = (id, newStatus) => {
    const taskIndex = data?.tasks?.findIndex((task) => task?._id === id);

    if (taskIndex !== -1 && data.tasks[taskIndex].status !== newStatus) {
      const updatedTask = { ...data.tasks[taskIndex], status: newStatus };

      const updatedTasks = [...data.tasks];
      updatedTasks[taskIndex] = updatedTask;

      console.log(id, newStatus);
      console.log(updatedTask);

      dispatch(updateTask({ newData: updatedTask, id }));
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {projectStatuses.map((status, index) => (
          <div className='flex items-center' key={index}>
            <div className='me-5 mb-3'>
              <Column
                key={index}
                status={status}
                cards={data?.tasks?.filter((task) => task.status === status)}
                moveCard={moveCard}
              />
            </div>
          </div>
        ))}
      </DndProvider>
    </>
  );
};

export default ProjectBoard;
