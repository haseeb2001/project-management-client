import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import axios from 'axios';
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

  console.log(collabs);

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
                (existingItem) => existingItem?.userId?._id === user._id
              )
          );
          const userOptions = filteredUsers.map((user) => ({
            value: user._id,
            label: user.username,
          }));

          setOptions(userOptions);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [collabs]);

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
      dispatch(createCollab({ newData: { collaboratorId: option.value, projectId } }))
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
