import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {alertService} from '../alertService';
import config from '../../config';

interface User {
  uidb64: string;
  token: string;
  action: string;
}


interface SignInUser {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  errorMessage?: string;
  loggedUser: User;
}

const initialState: SignInUser = {
  loading: 'idle',
  loggedUser: {
    uidb64: '',
    token: '',
    action: '',
  }
};

export const signInThunk = createAsyncThunk(
  'signIn/signInthunk',
  async (data: {email: string; password: string}, {rejectWithValue}) => {
    try {
      const response = await axios.post(config.LOGIN, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    
  },
);

export const forgotPasswordThunk = createAsyncThunk(
  'signIn/forgotPasswordThunk',
  async (data: {email: string; redirect_uri: string}, {rejectWithValue}) => {
    try {
      const response = await axios.post(config.LOGIN, {
        email: data.email,
        redirect_uri: data.redirect_uri,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);



export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    resetIsLoading(state) {
      state.loading = 'idle';
      console.log(state.loading);
    }
  },
  extraReducers: builder => {
    /**
    * Email Sign In
    */
    builder
      .addCase(signInThunk.pending, state => {
        state.loading = 'pending';
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        console.log('SignIn Payload', action.payload);
        state.loggedUser = {
          uidb64: action.payload.uidb64,
          token: action.payload.token,
          action: action.payload.action,
        };  
        state.loading = 'succeeded';
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = 'failed';
        console.log('SignIn Error', action.payload);
        alertService.alert('warning', action.payload.errors.non_field_errors[0], 'account');
      });

    /**
    * Email Sign In
    */
    builder
      .addCase(forgotPasswordThunk.pending, state => {
        state.loading = 'pending';
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        console.log('forgotpass Payload', action.payload);
        state.loading = 'succeeded';
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = 'failed';
        console.log('forgotpass Error', action.payload);
        alertService.alert('warning', action.payload.errors.email[0], 'account');
      });

    
  },
});

export const {resetIsLoading} = signInSlice.actions;
export default signInSlice.reducer;
