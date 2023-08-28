import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {alertService} from '../alertService';
import { Country } from '../sign-up/registerSlice';


export interface InitialState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';  
  countries: Country[];
  error: string;
}

const initialState: InitialState = {
  loading: 'idle',  
  countries: [],
  error: '',
};

export const getCOCountryThunk = createAsyncThunk(
  'home/getCountryThunk',
  async (url: string) => {    
    const response = await axios.get(url);
    return response.data
  }
);


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {

    /**
     * Fetch Coffee Origin Countries
     */
    builder
      .addCase(getCOCountryThunk.pending, state => {
        console.log('Coffee Origin Countries Pending');
      })
      .addCase(getCOCountryThunk.fulfilled, (state, action) => {
        state.countries = action.payload;        
      })
      .addCase(getCOCountryThunk.rejected, (state, action) => {
        console.log('Coffee Origin Countries Rejected');
      });
    
  },
});

export default homeSlice.reducer;
