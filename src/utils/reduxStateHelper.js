import { STATUSES } from '../constants/statuses';
import Cookies from 'js-cookie';

export const authStateHelper = (state, response, auth = true) => {
  if (!response?.errors) {
    state.data = response?.data;
    state.status = STATUSES.IDLE;
    state.authSuccess = true;
    if (auth) Cookies.set('token', response.data.token);
  } else {
    state.authSuccess = false;
    state.status = STATUSES.ERROR;
    state.errors = response?.errors;
    if (auth) Cookies.set('token', '');
  }
};

export const rejectStateHelper = (state) => {
  state.status = STATUSES.ERROR;
  state.errors = [{ msg: 'Something went wrong, please try again' }];
};

export const modifyStateHelper = (state, response) => {
  if (!response?.errors) {
    state.data = [];
  } else {
    state.status = STATUSES.ERROR;
    state.errors = response?.errors;
  }
};

export const updateStateHelper = (state, response, fieldName, stateName) => {
  if (!response?.errors) {
    const existingData = state.data[stateName] || [];
    const newData = response?.data?.[fieldName];
    const indexToUpdate = existingData.findIndex(
      (item) => item._id === newData?._id
    );
    const updatedData =
      indexToUpdate !== -1
        ? [
            ...existingData.slice(0, indexToUpdate),
            newData,
            ...existingData.slice(indexToUpdate + 1),
          ]
        : [...existingData, newData];
    const newState = {
      ...state,
      data: {
        ...state.data,
        [stateName]: updatedData,
      },
      errors: [],
      status: STATUSES.IDLE,
    };
    return newState;
  } else {
    return {
      ...state,
      data: [],
      errors: response?.errors,
      status: STATUSES.ERROR,
    };
  }
};

export const fetchStateHelper = (state, response, fieldName) => {
  if (!response?.errors) {
    const existingData = state.data[fieldName] || [];
    const newData = response?.data?.[fieldName] || [];

    const filteredData = newData.filter(
      (newItem) =>
        !existingData.some((existingItem) => existingItem._id === newItem._id)
    );

    const updatedData = existingData.concat(filteredData);
    const newState = {
      ...state,
      data: {
        ...state.data,
        [fieldName]: updatedData,
      },
      errors: [],
      status: STATUSES.IDLE,
    };
    return newState;
  } else {
    return {
      ...state,
      data: [],
      errors: response?.errors,
      status: STATUSES.ERROR,
    };
  }
};
