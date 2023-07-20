import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import {
  modifyStateHelper,
  fetchStateHelper,
  rejectStateHelper,
  updateStateHelper,
} from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  errors: [],
};

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
  const token = getCookie('token');
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
});

export const fetchProjectTasks = createAsyncThunk(
  'task/fetchProjectTasks',
  async ({ projectId }) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/tasks/project/${projectId}`,
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

export const createTask = createAsyncThunk(
  'task/createTask',
  async ({ newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/`, {
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

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async ({ id, newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, {
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

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async ({ id }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return fetchStateHelper(state, action.payload, 'tasks');
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(fetchProjectTasks.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        return fetchStateHelper(state, action.payload, 'tasks');
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createTask.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        return updateStateHelper(state, action.payload, 'task', 'tasks');
      })
      .addCase(createTask.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateTask.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        return updateStateHelper(state, action.payload, 'task', 'tasks')
      })
      .addCase(updateTask.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default taskSlice.reducer;
