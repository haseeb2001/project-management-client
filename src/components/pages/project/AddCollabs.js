import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import md5 from 'md5';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCollab } from '../../../store/collabSlice';

const UserDropdown = ({ field, form, projectId }) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(field.name, selectedOptions);
  };
  const {
    data: { collabs },
  } = useSelector((state) => state.collab);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth/all')
      .then((response) => {
        if (response.data?.type === 'success') {
          const users = response.data?.data?.users || [];
          const filteredUsers = users.filter(
            (user) =>
              !collabs.some(
                (existingItem) =>
                  existingItem?.userId?._id === user._id &&
                  existingItem?.projectId === projectId
              )
          );
          const userOptions = filteredUsers.map((user) => ({
            value: user._id,
            label: (
              <div className='flex items-center'>
                <img
                  src={`https://www.gravatar.com/avatar/${md5(
                    user._id
                  )}?d=identicon&s=40`} // Adjust 's' parameter to control size
                  alt='Avatar'
                  className='w-6 h-6 rounded-full me-3' // Adjust width and height here
                />
                {user.username}
              </div>
            ),
          }));

          setOptions(userOptions);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [collabs, projectId]);

  return (
    <Select
      options={options}
      isMulti
      placeholder='Collabs'
      onChange={handleChange}
      value={field.value}
    />
  );
};

const initialValues = {
  selectedOptions: [],
};

export const AddCollabs = ({ handleCloseModal, projectId }) => {
  const dispatch = useDispatch();
  const handleSubmit = ({ selectedOptions }) => {
    selectedOptions.map((option) =>
      dispatch(
        createCollab({ newData: { collaboratorId: option.value, projectId } })
      )
    );
  };

  return (
    <>
      <Modal.Header>Add Members</Modal.Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ dirty, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div>
                <label>Users</label>
                <Field
                  name='selectedOptions'
                  component={UserDropdown}
                  projectId={projectId}
                />
              </div>
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
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};
