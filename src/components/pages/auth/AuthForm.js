import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthSchema, RegisterScehma } from '../../../utils/yup/schemas';
import { login, signup } from '../../../store/userSlice';

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();

  const onSubmit = (creds, { setSubmitting, resetForm }) => {
    type === 'LOGIN' ? dispatch(login(creds)) : dispatch(signup(creds));
    setSubmitting(false);
    resetForm();
  };
  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
      }}
      validationSchema={type === 'LOGIN' ? AuthSchema : RegisterScehma}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form className='d-flex flex-column gap-3 h-full w-100'>
            {type === 'LOGIN' ? (
              <div>
                <ErrorMessage
                  name='email'
                  className='text-danger'
                  component='div'
                />
                <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
                  <FontAwesomeIcon icon={faUser} />
                  <Field
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='border border-0 bg-transparent w-100 mx-2 input'
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <ErrorMessage
                    name='email'
                    className='text-danger'
                    component='div'
                  />
                  <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <Field
                      type='email'
                      name='email'
                      placeholder='Email'
                      className='border border-0 bg-transparent w-100 mx-2 input'
                    />
                  </div>
                </div>
                <div>
                  <ErrorMessage
                    name='username'
                    className='text-danger'
                    component='div'
                  />
                  <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
                    <FontAwesomeIcon icon={faUser} />
                    <Field
                      type='text'
                      name='username'
                      placeholder='Username'
                      className='border border-0 bg-transparent w-100 mx-2 input'
                    />
                  </div>
                </div>
              </>
            )}
            <ErrorMessage
              name='password'
              className='text-danger'
              component='div'
            />

            <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
              <FontAwesomeIcon icon={faLock} />
              <Field
                type='password'
                name='password'
                placeholder='Password'
                className='border border-0 bg-transparent w-100 mx-2 input'
              />
            </div>

            <div className='d-flex justify-content-center w-100'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`${
                  type === 'LOGIN' ? 'bg-info' : 'bg-success'
                } text-white rounded border border-0 py-2 px-5 w-100 mt-2`}
              >
                {type}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForm;
