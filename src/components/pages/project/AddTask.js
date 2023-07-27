import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import Select from 'react-select';
import '../../css/Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../../../store/taskSlice';
import { taskSchema } from '../../../utils/yup/schemas';
import GravatarAvatar from '../../common/Gravatar';

const AddTask = ({ isOpen, onClose, projectId, task, create }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const {
    data: { collabs },
  } = useSelector((state) => state.collab);

  useEffect(() => {
    if (isOpen) {
      const projectMembers = collabs?.filter(
        (collab) => collab?.projectId === projectId
      );
      const userOptions = projectMembers?.map((user) => ({
        value: user?.userId?._id,
        label: (
          <div className='flex items-center'>
            <GravatarAvatar
              key={user?.userId?._id}
              email={user?.userId?._id}
              username={user?.userId?.username}
              size={40}
            />
            {user?.userId?.username}
          </div>
        ),
      }));
      setOptions(userOptions);
    }
  }, [collabs, projectId, task, create, isOpen]);

  const selectedUsers = task?.assigned_to?.map((assignedUserId) => {
    const selectedUser = options?.find((user) => user.value === assignedUserId?._id);
    return selectedUser || null;
  });

  const initialValues = {
    title: task?.title || '',
    priority: task?.priority || '',
    dueDate: task?.dueDate?.substring(0, 10) || '',
    description: task?.description || '',
    assigned_to: selectedUsers || [],
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} `}>
      <Button onClick={onClose} className='bg-white text-black border-0'>
        Close Sidebar
      </Button>

      {options?.length > 0 && (
        <>
          {console.log('opts:', options, options?.length)}
          <Formik
            initialValues={initialValues}
            validationSchema={taskSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const members = values?.assigned_to?.map((user) => user?.value);
              dispatch(
                create
                  ? createTask({
                      newData: {
                        ...values,
                        assigned_to: members,
                        projectId: projectId,
                      },
                    })
                  : updateTask({
                      id: task?._id,
                      newData: {
                        ...values,
                        assigned_to: members,
                        projectId: projectId,
                      },
                    })
              );

              setSubmitting(false);
              // resetForm();
              onClose();
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
              setFieldValue,
              dirty,
            }) => {
              return (
                <Form
                  className='d-flex flex-column gap-3 h-full w-100'
                  onSubmit={handleSubmit}
                >
                  <Form.Group className='margin-bottom-3' controlId='title'>
                    <Form.Label className='text-white mt-2'>Title</Form.Label>
                    <Form.Control
                      type='text'
                      name='title'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className='margin-bottom-3'
                    controlId='assigned_to'
                  >
                    <Form.Label className='text-white mt-2'>
                      Assignee(s)
                    </Form.Label>
                    <Select
                      options={options}
                      isMulti
                      placeholder='Collabs'
                      value={values.assigned_to}
                      onChange={(selectedOptions) =>
                        setFieldValue('assigned_to', selectedOptions)
                      }
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.assigned_to}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='margin-bottom-3' controlId='dueDate'>
                    <Form.Label className='text-white mt-2'>
                      Due Date
                    </Form.Label>
                    <Form.Control
                      type='date'
                      name='dueDate'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dueDate}
                      isInvalid={touched.dueDate && errors.dueDate}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.dueDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='margin-bottom-3' controlId='priority'>
                    <Form.Label className='text-white mt-2'>
                      Priority
                    </Form.Label>
                    <Form.Control
                      as='select'
                      name='priority'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.priority}
                      isInvalid={touched.priority && errors.priority}
                    >
                      <option>Task Priority</option>
                      <option value='1'>1 (Low)</option>
                      <option value='2'>2 (Low)</option>
                      <option value='3'>3(Mild)</option>
                      <option value='4'>4(Mild)</option>
                      <option value='5'>5(High)</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      {errors.priority}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    className='margin-bottom-3'
                    controlId='description'
                  >
                    <Form.Label className='text-white mt-2'>
                      Description
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={5}
                      name='description'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      isInvalid={touched.description && errors.description}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    disabled={!dirty || isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Add Task'}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
};

export default AddTask;
