import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../../config';
import {alertService} from '../../alertService';

interface User {
  id?: string;
  email?: string;
  phone_number?: string;
  registered_as?: string;
  is_active?: boolean;
  is_phone_verified?: boolean;
  is_seller_verified?: boolean;
  profile?: any
}
export interface InitialState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  uidb64: string;
  token: string;
  user: User;
  error: string;
}

const initialState: InitialState = {
  loading: 'idle',
  uidb64: '',
  token: '',
  user: {},
  error: '',
};

export const joinusThunk = createAsyncThunk(
  'joinus/joinusThunk',
  async (params: {email: string}, {rejectWithValue}) => {
    const payload = {
      email: params.email,
    };
    const response = await axios.post(config.JOINUS, payload);
    return response.data;
    
  },
);

export const joinusSlice = createSlice({
  name: 'joinus',
  initialState,
  reducers: {
    resetIsJoinUsLoading(state) {
      state.loading = 'idle';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(joinusThunk.pending, state => {
        state.loading = 'pending';
      })
      .addCase(joinusThunk.fulfilled, (state, action) => {
        state.uidb64 = action.payload.uidb64;
        state.token = action.payload.token;
        state.user = action.payload.user; 
        state.loading = 'succeeded';
      })
      .addCase(joinusThunk.rejected, (state, action) => {
        state.loading = 'failed';
        alertService.alert('warning', 'emailExist', 'account');
      });
  },
});

export const {resetIsJoinUsLoading} = joinusSlice.actions;
export default joinusSlice.reducer;
