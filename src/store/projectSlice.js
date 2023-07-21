import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import {
  modifyStateHelper,
  fetchStateHelper,
  rejectStateHelper,
} from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  errors: [],
};

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async () => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/projects/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async ({ newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    return await res.json();
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    return await res.json();
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async ({ id }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        return fetchStateHelper(state, action.payload, 'projects');
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createProject.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateProject.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(updateProject.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteProject.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default projectSlice.reducer;
