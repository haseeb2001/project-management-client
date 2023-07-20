import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../constants/statuses';
import Cookies from 'js-cookie';
import { getCookie } from '../utils/cookie';
import { authStateHelper, rejectStateHelper } from '../utils/reduxStateHelper';
const initialState = {
  data: [],
  status: STATUSES.IDLE,
  authSuccess: false,
  errors: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.data = [];
      state.status = STATUSES.IDLE;
      state.authSuccess = false;
      state.errors = [];
      Cookies.set('token', '');
    },
    clearState(state) {
      state.data = [];
      state.status = STATUSES.IDLE;
      state.authSuccess = false;
      state.errors = [];
      Cookies.set('token', '');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.errors = [];
      })
      .addCase(login.fulfilled, (state, action) => {
        authStateHelper(state, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(signup.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signup.fulfilled, (state, action) => {
        authStateHelper(state, action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        authStateHelper(state, action.payload, false);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export const { logout, clearState } = userSlice.actions;
export default userSlice.reducer;

export const login = createAsyncThunk('user/login', async (creds) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  return await res.json();
});

export const signup = createAsyncThunk('user/signup', async (creds) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  return await res.json();
});

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const token = getCookie('token');
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/fetchUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
});
