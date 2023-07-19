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

export const fetchCollabs = createAsyncThunk(
  'collab/fetchCollabs',
  async ({ projectId }) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/projects/${projectId}/collabs`,
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

export const createCollab = createAsyncThunk(
  'collab/createCollab',
  async ({ newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/collab/`, {
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

export const deleteCollab = createAsyncThunk(
  'collab/deleteCollab',
  async ({ id }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/collab/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

const collabSlice = createSlice({
  name: 'collab',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollabs.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCollabs.fulfilled, (state, action) => {
        return fetchStateHelper(state, action.payload, 'collabs');
      })
      .addCase(fetchCollabs.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createCollab.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createCollab.fulfilled, (state, action) => {
        return updateStateHelper(state, action.payload, 'collab', 'collabs');
      })
      .addCase(createCollab.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteCollab.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteCollab.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteCollab.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default collabSlice.reducer;
