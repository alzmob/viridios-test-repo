import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {alertService} from '../alertService';
import config from '../../config';

export interface Country {
  id: string;
  name: string;
  code: string;
  continent: string;
  is_active: boolean;
  is_coffee_origin: boolean;
  slug: string;
  flag: string;
}

export interface State {
  id: string;
  name: string;
  code: string;
  slug: string;
  country: Country;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  city: string;
  profile_pic: any;
  company_details: string;
  user: string;
  country: Country;
  state: State;
}

export interface User {
  id?: string;
  email?: string;
  phone_number?: string;
  registered_as?: string;
  is_active?: boolean;
  is_phone_verified?: boolean;
  is_seller_verified?: boolean;
  stripe_account_status: string;
  free_shipping_threshold: number;
  total_earned_amount: number;
  stripe_dashboard_link: string;
  are_shipping_rules_created: boolean;
  // is_payouts_enabled: boolean;
  // is_charges_enabled: boolean;
  profile?: Profile;
}
export interface InitialState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  uidb64: string;
  token: string;
  user: User;
  countries: Country[];
  countryNames: string[];
  states: State[];
  stateNames: string[];
  error: string;
}

const initialState: InitialState = {
  loading: 'idle',
  uidb64: '',
  token: '',
  user: {},
  countries: [],
  countryNames: [],
  states: [],
  stateNames: [],
  error: '',
};

export const getCountryThunk = createAsyncThunk(
  'register/getCountryThunk',
  async (url: string) => {    
    const response = await axios.get(url);
    return response.data
  }
);

export const getStatesThunk = createAsyncThunk(
  'register/getStatesThunk',
  async (url: string) => {    
    const response = await axios.get(url);
    return response.data
  }
);

export const registerThunk = createAsyncThunk(
  'register/registerThunk',
  async (params: {password: string, password2: string, registered_as: string, first_name: string, last_name: string, company_name: string, country: string|undefined, state: string|undefined, city: string, company_details: string|null, profile_pic: any, phone_number: string|undefined, url: string}, {rejectWithValue}) => {
    
    const formData = new FormData();
    formData.append("password", params.password);
    formData.append("password2", params.password2);
    formData.append("phone_number", params.phone_number);
    formData.append("registered_as", params.registered_as);
    formData.append("first_name", params.first_name);
    formData.append("last_name", params.last_name);
    formData.append("company_name", params.company_name);
    formData.append("country", params.country);
    formData.append("state", params.state);
    formData.append("city", params.city);
    // formData.append("company_details", params.company_details);
    // formData.append("profile_pic", params.profile_pic);
    
    console.log('Form Data', formData);

    try {
      const response = await axios
        .post(params.url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          // transformRequest: formData => formData,
        });    
      console.log('Response', response.data);  
      return response.data;      
    } catch (err) {      
      return rejectWithValue(err.response.data);
    }
  },
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterState(state) {
      state = initialState;
    }
  },
  extraReducers: builder => {

    /**
     * Fetch countries
     */
    builder
      .addCase(getCountryThunk.pending, state => {
        console.log('Get Countries Pending');
      })
      .addCase(getCountryThunk.fulfilled, (state, action) => {
        state.countries = action.payload;
        let names: string[] = [];
        action.payload.map((item: Country) => {
          const name = item.name;
          names.push(name);
        });
        state.countryNames = names;
      })
      .addCase(getCountryThunk.rejected, (state, action) => {
        console.log('Get Countries Rejected');
      });

    /**
     * Fetch states
     */
    builder
      .addCase(getStatesThunk.pending, state => {
        console.log('Get States Pending');
      })
      .addCase(getStatesThunk.fulfilled, (state, action) => {
        state.states = action.payload;
        let names: string[] = [];
        action.payload.map((item: Country) => {
          const name = item.name;
          names.push(name);
        });
        state.stateNames = names;
      })
      .addCase(getStatesThunk.rejected, (state, action) => {
        console.log('Get States Rejected');
    });

    /**
     * Register User
     */
    builder
      .addCase(registerThunk.pending, state => {
        state.loading = 'pending';
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.uidb64 = action.payload.uidb64;
        state.token = action.payload.token;
        state.user = action.payload.user; 
        const setStorage = async () => {
          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify({
              uidb64: state.uidb64,
              token: state.token,
              user: state.user
            }),
          );
        };
        setStorage();
        state.loading = 'succeeded';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        console.log('Rejected Error Message: ', action.payload);
        state.loading = 'failed';
        alertService.alert('warning', action.payload.errors.non_field_errors[0], 'account');
      });
  },
});

export const {resetRegisterState} = registerSlice.actions;
export default registerSlice.reducer;
