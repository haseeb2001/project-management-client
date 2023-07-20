import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from '../../../store/projectSlice';

export const ProjectForm = ({ project, handleCloseModal, create }) => {
  const dispatch = useDispatch();

  const resetProjects = () => {
    dispatch(fetchProjects());
  };

  const handleCreateProject = async (values) => {
    await dispatch(
      createProject({
        newData: values,
      })
    );
    resetProjects();
  };

  const handleUpdateProject = async (values) => {
    await dispatch(
      updateProject({
        id: project?._id,
        newData: { values },
      })
    );
    resetProjects();
  };

  const handleDeleteProject = async () => {
    await dispatch(deleteProject({ id: project?._id }));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Project</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: project?.name || '',
        }}
        // validationSchema={BudgetSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (create) {
            handleCreateProject(values);
          } else {
            handleUpdateProject(values);
          }
          setSubmitting(false);
          handleCloseModal();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {/* <Form.Group className='margin-bottom-3' controlId='categoryTitle'>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  as='select'
                  name='categoryTitle'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryTitle}
                  isInvalid={touched.categoryTitle && errors.categoryTitle}
                >
                  <option value={values.categoryTitle || ''}>
                    {values.categoryTitle || 'Select a category title'}
                  </option>
                  {data?.categories
                    ?.filter(
                      (category) => category.title !== values.categoryTitle
                    )
                    .map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  {errors.categoryTitle}
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group className='margin-bottom-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={!dirty || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              {!create && (
                <Button
                  variant='danger'
                  disabled={isSubmitting}
                  onClick={handleDeleteProject}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};
