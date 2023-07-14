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
    console.log(response);
    if (auth) Cookies.set('token', '');
  }
};

export const rejectStateHelper = (state) => {
  state.status = STATUSES.ERROR;
  state.errors = [{ msg: 'Something went wrong, please try again' }];
};

export const modifyStateHelper = (state, response) => {
  if (!response?.errors) {
    state.data = null;
  } else {
    state.status = STATUSES.ERROR;
    state.errors = response?.errors;
  }
};

export const fetchStateHelper = (state, response) => {
  if (!response?.errors) {
    state.data = response?.data;
    state.errors = []
    state.status = STATUSES.IDLE;
  } else {
    state.status = STATUSES.ERROR;
    state.data = [];
    state.errors = response?.errors;
  }
};
