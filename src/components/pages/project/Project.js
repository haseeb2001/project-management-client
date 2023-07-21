import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCollabs } from '../../../store/collabSlice';
import { fetchProjects } from '../../../store/projectSlice';
import { fetchProjectTasks } from '../../../store/taskSlice';
import { AddCollabs } from './AddCollabs';
import AddTask from './AddTask';
import ProjectBoard from './Board';

export const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useSelector((state) => state.collab);
  const { data: project } = useSelector((state) => state.project);
  const { data: tasks } = useSelector((state) => state.task);
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchCollabs({ projectId }));
    dispatch(fetchProjectTasks({ projectId }));
  }, [dispatch, projectId]);

  const memberCount = data?.collabs?.reduce((accumulator, collab) => {
    if (collab?.projectId === projectId) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const currentProject = project?.projects?.find(
    (projectItem) => projectItem.projectId?._id === projectId
  );

  return (
    <>
      <div className='container bg-gray'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex p-3 fs-3'>
            Project Name: {currentProject?.projectId?.name}
          </div>
          <div className='d-flex align-items-center px-3 fs-5'>
            <strong>
              {memberCount} <FontAwesomeIcon icon={faUser} />
            </strong>
          </div>
        </div>
        <div className='d-flex justify-content-end align-items-end mb-4'>
          <div className='d-flex pe-3 fs-3'>
            <Button
              className='fs-5 bg-black border-0'
              onClick={handleShowModal}
            >
              AddMembers
            </Button>
          </div>
          <div className='d-flex pe-3 fs-3'>
            <Button
              className='fs-5 bg-black border-0'
              onClick={handleOpenSidebar}
            >
              AddTasks
            </Button>
          </div>
        </div>
        <div className='d-flex justify-content-left ms-5 ps-3'>
          <ProjectBoard />
        </div>
        <Modal
          show={showModal}
          onHide={() => handleCloseModal()}
          backdrop='static'
        >
          <AddCollabs
            showModal={handleShowModal}
            handleCloseModal={handleCloseModal}
            projectId={projectId}
          />
        </Modal>
        <div>
          <AddTask
            isOpen={isSidebarOpen}
            onClose={handleCloseSidebar}
            projectId={projectId}
            create={true}
          />
        </div>
      </div>
    </>
  );
};
