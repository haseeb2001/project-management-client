import React from 'react';
import AuthForm from './AuthForm';

export const Register = () => {
  return (
    <div className='d-flex flex-column justify-content-center w-100 p-3'>
      <p className='text-center fs-2 mb-5 text-success'>Register </p>
      <AuthForm type={'REGISTER'} />
    </div>
  );
};
