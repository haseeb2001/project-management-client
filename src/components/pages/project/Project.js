import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCollabs } from '../../../store/collabSlice';
import { fetchProjects } from '../../../store/projectSlice';
import { fetchProjectTasks } from '../../../store/taskSlice';
import GravatarAvatar from '../../common/Gravatar';
import { AddCollabs } from './AddCollabs';
import AddTask from './AddTask';
import ProjectBoard from './Board';

export const Project = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    data: { collabs },
  } = useSelector((state) => state.collab);
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

  const memberCount = collabs?.reduce((accumulator, collab) => {
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
      <div className='container vh-100 w-100 position-relative bg-gray'>
        {/* <div className='position-absolute container-fluid h-100 bg-gray z-index-2 opacity-8'></div> */}
        <div className='d-flex justify-content-between align-items-center z-index-1'>
          <div className='d-flex m-3 fs-3'>
            Project Name: {currentProject?.projectId?.name}
          </div>
          <div className='d-flex align-items-center px-3 fs-5 mb-2 mt-3'>
            <div className='me-2'>
              {collabs?.map((member) =>
                member.projectId === projectId ? (
                  <GravatarAvatar
                    key={member?.userId?._id}
                    email={member?.userId?._id}
                    username={member?.userId?.username}
                    size={45}
                  />
                ) : (
                  ''
                )
              )}
            </div>
            <strong>
              {memberCount} <FontAwesomeIcon icon={faUser} />
            </strong>
            <div className='ms-2 pe-3 fs-3'>
            <Button
              className='fs-5 bg-black border-0'
              onClick={handleShowModal}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          </div>
        </div>
        <div className='d-flex justify-content-end align-items-end mb-4'>
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
