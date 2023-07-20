import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../../store/projectSlice';
import { Project } from './Project';
import { ProjectForm } from './ProjectForm';
import { STATUSES } from '../../../constants/statuses';
import { AppSpinner } from '../../common/AppSpinner';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { data, status } = useSelector((state) => state.project);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  if (status === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  return (
    <div className='container mt-4'>
      <div className='page-header-row'>
        <h2>
          <FontAwesomeIcon icon={faPenToSquare} className='margin-right-5' />
          Projects:
        </h2>
        <Button
          variant='success'
          className='bg-color-green'
          onClick={handleShowModal}
        >
          + Add Project
        </Button>
      </div>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop='static'
      >
        <ProjectForm
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          create={true}
        />
      </Modal>
      <div className='d-flex flex-wrap justify-content-left'>
        {data?.projects?.map((project, index) => (
          <div className='flex items-center' key={index}>
            <div className='m-3'>
              <Project
                key={project?._id}
                name={project?.projectId?.name}
                projectId={project?.projectId?._id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
