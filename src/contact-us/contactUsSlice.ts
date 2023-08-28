import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {alertService} from '../alertService';
import config from '../../config';


interface ContactUsState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: ContactUsState = {
  loading: 'idle',  
};

export const contactUsThunk = createAsyncThunk(
  'contactUs/contactUsThunk',
  async (params: {email: string, first_name: string, last_name: string, company_name: string, phone_number: string, address: string, comments: string}) => {
    const response = await axios.post(config.CONTACTUS, {
      email: params.email,
      first_name: params.first_name,
      last_name: params.last_name,
      company_name: params.company_name,
      phone_number: params.phone_number,
      address: params.address,
      comments: params.comments
    });
    return response.data;
  },
);

export const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder
      .addCase(contactUsThunk.pending, state => {
        state.loading = 'pending';
      })
      .addCase(contactUsThunk.fulfilled, (state, action) => {
        console.log('Contact Us Payload', action.payload);        
        state.loading = 'succeeded';
        alertService.alert('success', 'The request has been sent successfully.');
      })
      .addCase(contactUsThunk.rejected, state => {
        state.loading = 'failed';
        alertService.alert('warning', 'wentWrong', 'account');
      });
  },
});

export default contactUsSlice.reducer;
