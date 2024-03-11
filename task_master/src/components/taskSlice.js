import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
};

const getToken = () => {
  const token = localStorage.getItem('token');
  console.log("Retrieved token:", token);
  return token;
};

const BASE_URL = 'http://localhost:3005/taskapi'

export const fetchTask = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = getToken();
  const response = await axios.get(`${BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return response.data;
});


export const addTask = createAsyncThunk('tasks/addTasks', async (task) => {
  const token = getToken()
  const response = await axios.post(`${BASE_URL}/tasks`, task, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
});


export const updateTask = createAsyncThunk('tasks/updateTasks', async ({_id, ...task}) => {
  const token = getToken();
  const response = await axios.put(`${BASE_URL}/tasks/${_id}`, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return  response.data;
});


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTask.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        state.tasks[index] = action.payload;
      })
  }
});

export default taskSlice.reducer;