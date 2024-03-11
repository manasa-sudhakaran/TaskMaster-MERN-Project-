  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';

  const initialState = {
    projects: [],
    status: 'idle',
    error: null
  };

  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Retrieved token:", token);
    return token;
  };

  const BASE_URL = 'http://localhost:3005'
  export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/projectapi/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  });

  export const addProject = createAsyncThunk('/projects', async ( project) => {
    const token = getToken()
    const response = await axios.post(`${BASE_URL}/projectapi/projects`, project, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  });


  export const updateProject = createAsyncThunk('projects/updateProject', async ({id, ...project}) => {
    const token = getToken();
    const response = await axios.put(`${BASE_URL}/projectapi/projects/${id}`, project, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return  response.data;
  });


  export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
    const token = getToken();
    await axios.delete(`http://localhost:3005/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return id;
  });

  const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchProjects.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.projects = action.payload;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addProject.fulfilled, (state, action) => {
          state.projects.push(action.payload);
        })
        .addCase(updateProject.fulfilled, (state, action) => {
          const index = state.projects.findIndex(project => project._id === action.payload._id);
          state.projects[index] = action.payload;
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
          state.projects = state.projects.filter(project => project._id !== action.payload);
        });
    }
  });

  export default projectSlice.reducer;