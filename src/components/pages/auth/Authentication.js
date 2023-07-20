import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

const Authentication = () => {
  const [authSwitch, setAuthSwitch] = useState(false);
  const handleButtonClick = () => {
    setAuthSwitch(!authSwitch);
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center container-fluid vh-100 w-100 position-relative'>
        <div className='position-absolute container-fluid h-100 bg-black z-index-2 opacity-8'></div>
        <div className='d-flex flex-row justify-content-center align-items-center z-index-3 w-50  rounded'>
          {authSwitch ? (
            <div className='d-flex w-100'>
              <div className='col-7 px-3 py-5 bg-white opacity-8'>
                <Register />
              </div>
              <div className='d-flex flex-column justify-content-center align-items-center col-5 bg-success bg-opacity-50'>
                <p className='text-center text-white fs-4 w-100'>
                  Already have an account?
                </p>
                <button
                  className='bg-success border border-0 rounded py-2 px-3 text-white bg-opacity-75'
                  onClick={handleButtonClick}
                >
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div className='d-flex w-100'>
              <div className='d-flex flex-column justify-content-center align-items-center col-5 bg-info bg-opacity-50'>
                <p className='text-center text-white fs-4 w-100 pt-2'>
                  Don't have an account?
                </p>
                <button
                  className='bg-info border border-0 rounded py-2 px-3 text-white bg-opacity-50'
                  onClick={handleButtonClick}
                >
                  Register
                </button>
              </div>
              <div className='col-7 px-3 py-5 bg-white opacity-8'>
                <Login />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
