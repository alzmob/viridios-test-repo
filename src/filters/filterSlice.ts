import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { Country, State } from '../sign-up/registerSlice';
import { Certification, Warehouse } from '../search/searchSlice';

export interface Filter {
    text: string;
    slug: string;
    isChecked: boolean;
}

interface NumberFilter {
    startValue: number;
    endValue: number;
}

export interface InitialState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';  
  origin: Filter[];
  type: Filter[];
  grade: Filter[];
  processing: Filter[];
  cert: Filter[];
  warehouse: Filter[];
  states: Filter[];
  reviews: Filter[];
  price: NumberFilter;
  moq: NumberFilter;
  filters: string;
  error: string;
  isFirst: boolean;
}

const initialState: InitialState = {
  loading: 'idle',  
  origin: [],
  cert: [],
  type: [],
  grade: [],
  processing: [],
  warehouse: [],
  states: [],
  reviews: [],
  filters: '',
  isFirst: false,
  price: {
    startValue: 0,
    endValue: 100
  },
  moq: {
    startValue: 0,
    endValue: 2000
  },
  error: '',
};

export const getCOCountryThunk = createAsyncThunk(
  'filter/getCountryThunk',
  async (url: string) => {    
    const response = await axios.get(url);
    return response.data
  }
);

export const getCertificationThunk = createAsyncThunk(
    'filter/getCertificationThunk',
    async (url: string) => {    
      const response = await axios.get(url);
      return response.data
    }
);

export const getWarehouseThunk = createAsyncThunk(
    'filter/getWarehouseThunk',
    async (url: string) => {    
      const response = await axios.get(url);
      return response.data
    }
);

export const getStatesThunk = createAsyncThunk(
    'filter/getStatesThunk',
    async (url: string) => {    
      const response = await axios.get(url);
      return response.data
    }
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addOriginToFilter(state, {payload}) {
        let filtered = state.origin.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.origin = filtered;
    },
    addTypeToFilter(state, {payload}) {
        let filtered = state.type.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.type = filtered;
    },
    addGradeToFilter(state, {payload}) {
        let filtered = state.grade.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.grade = filtered;
    },
    addProcessingToFilter(state, {payload}) {
        let filtered = state.processing.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.processing = filtered;
    },
    addCertToFilter(state, {payload}) {
        let filtered = state.cert.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.cert = filtered;
    },
    addWarehouseToFilter(state, {payload}) {
        let filtered = state.warehouse.map(item => item.text === payload.text ?
            {...item, isChecked: payload.isChecked} :
            item    
        );
        state.warehouse = filtered;
    },
    addPriceToFilter(state, {payload}) {
        state.price.startValue = payload.startPrice;
        state.price.endValue = payload.endPrice;
    },
    addMOQToFilter(state, {payload}) {
        state.moq.startValue = payload.startValue;
        state.moq.endValue = payload.endValue;
    },
    addStatesToFilter(state, {payload}) {
        let filtered = state.states.map(item => item.text === payload ?
            {...item, isChecked: true} :
            {...item, isChecked: false}    
        );
        state.states = filtered;
    },
    addOneOriginToFilter(state, {payload}) {
        let filtered = state.origin.map(item => item.text === payload ?
            {...item, isChecked: true} :
            {...item, isChecked: false}
        );
        state.origin = filtered;
    },
    addReviewToFilter(state, {payload}) {
        let filtered = state.reviews.map(item => item.text === payload.text ?
            {...item, isChecked: true} :
            {...item, isChecked: false}
        );
        state.reviews = filtered;
    },
    setInitialStoreData(state) {
        state.type = [
            {
                text: 'Arabica',
                slug: 'arabica',
                isChecked: false
            },
            {
                text: 'Robusta',
                slug: 'robusta',
                isChecked: false
            },
        ];
        state.grade = [
            {
                text: 'Grade 1',
                slug: '1',
                isChecked: false
            },
            {
                text: 'Grade 2',
                slug: '2',
                isChecked: false
            },
            {
                text: 'Grade 3',
                slug: '3',
                isChecked: false
            },
            {
                text: 'Grade 4',
                slug: '4',
                isChecked: false
            },
            {
                text: 'Grade 5',
                slug: '5',
                isChecked: false
            },
            {
                text: 'Grade 6',
                slug: '6',
                isChecked: false
            },
            {
                text: 'Grade 7',
                slug: '7',
                isChecked: false
            },
            {
                text: 'Grade 8',
                slug: '8',
                isChecked: false
            },
            {
                text: 'Grade 9',
                slug: '9',
                isChecked: false
            },
        ];
        state.processing = [
            {
                text: 'Commercial Washed',
                slug: 'commercial-washed',
                isChecked: false
            },
            {
                text: 'Commercial Unwashed',
                slug: 'commercial-unwashed',
                isChecked: false
            },
            {
                text: 'Specialty Washed',
                slug: 'spcialty-washed',
                isChecked: false
            },
            {
                text: 'Specialty Unwashed',
                slug: 'specialty-unwashed',
                isChecked: false
            },
        ];
        state.reviews = [
            {
                text: '4',
                slug: '4',
                isChecked: false
            },
            {
                text: '3',
                slug: '3',
                isChecked: false
            },
            {
                text: '2',
                slug: '2',
                isChecked: false
            },
            {
                text: '1',
                slug: '1',
                isChecked: false
            },
        ];
        state.price = {
            startValue: 0,
            endValue: 100
        };
        state.moq = {
            startValue: 0,
            endValue: 2000
        };
    },
    setFilters(state, {payload}) {
        state.filters = payload;
    },
    setIsFirst(state) {
        state.isFirst = true;
    },
    resetAllFilterData(state) {
        let resetOrigin = state.origin.map(item => item.isChecked === true ?
            {...item, isChecked: false} :
            item    
        );
        state.origin = resetOrigin;
        let resetWarehouse = state.warehouse.map(item => item.isChecked === true ?
            {...item, isChecked: false} :
            item    
        );
        state.warehouse = resetWarehouse;
        let resetStates = state.states.map(item => item.isChecked === true ?
            {...item, isChecked: false} :
            item    
        );
        state.states = resetStates;
        let resetCert = state.cert.map(item => item.isChecked === true ?
            {...item, isChecked: false} :
            item    
        );
        state.cert = resetCert;
        state.type = [
            {
                text: 'Arabica',
                slug: 'arabica',
                isChecked: false
            },
            {
                text: 'Robusta',
                slug: 'robusta',
                isChecked: false
            },
        ];
        state.grade = [
            {
                text: 'Grade 1',
                slug: '1',
                isChecked: false
            },
            {
                text: 'Grade 2',
                slug: '2',
                isChecked: false
            },
            {
                text: 'Grade 3',
                slug: '3',
                isChecked: false
            },
            {
                text: 'Grade 4',
                slug: '4',
                isChecked: false
            },
            {
                text: 'Grade 5',
                slug: '5',
                isChecked: false
            },
            {
                text: 'Grade 6',
                slug: '6',
                isChecked: false
            },
            {
                text: 'Grade 7',
                slug: '7',
                isChecked: false
            },
            {
                text: 'Grade 8',
                slug: '8',
                isChecked: false
            },
            {
                text: 'Grade 9',
                slug: '9',
                isChecked: false
            },
        ];
        state.processing = [
            {
                text: 'Commercial Washed',
                slug: 'commercial-washed',
                isChecked: false
            },
            {
                text: 'Commercial Unwashed',
                slug: 'commercial-unwashed',
                isChecked: false
            },
            {
                text: 'Specialty Washed',
                slug: 'spcialty-washed',
                isChecked: false
            },
            {
                text: 'Specialty Unwashed',
                slug: 'specialty-unwashed',
                isChecked: false
            },
        ];
        state.reviews = [
            {
                text: '4',
                slug: '4',
                isChecked: false
            },
            {
                text: '3',
                slug: '3',
                isChecked: false
            },
            {
                text: '2',
                slug: '2',
                isChecked: false
            },
            {
                text: '1',
                slug: '1',
                isChecked: false
            },
        ];
        state.price = {
            startValue: 0,
            endValue: 100
        };
        state.moq = {
            startValue: 0,
            endValue: 2000
        };
        state.filters = '';
    }
  },
  extraReducers: builder => {

    /**
     * Fetch Coffee Origin Countries
     */
    builder
        .addCase(getCOCountryThunk.pending, state => {
            console.log('Coffee Origin Countries Pending');
            state.loading = 'pending';
        })
        .addCase(getCOCountryThunk.fulfilled, (state, action) => {
            let aryOrigin: Filter[] = [];
            action.payload.map((item: Country) => {
                const element: Filter = {
                    text: item.name,
                    slug: item.slug,
                    isChecked: false
                }
                aryOrigin.push(element);
            });
            state.origin = aryOrigin;  
            state.loading = 'succeeded';      
        })
        .addCase(getCOCountryThunk.rejected, (state, action) => {
            console.log('Coffee Origin Countries Rejected');
            state.loading = 'failed';
        });  

    /**
     * Fetch Certification
     */
    builder
        .addCase(getCertificationThunk.pending, state => {
            console.log('Coffee Certification Pending');
        })
        .addCase(getCertificationThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            let aryCert: Filter[] = [];
            action.payload.map((item: Certification) => {
                const element: Filter = {
                    text: item.name,
                    slug: item.slug,
                    isChecked: false
                }
                aryCert.push(element);
            });
            state.cert = aryCert;        
        })
        .addCase(getCertificationThunk.rejected, (state, action) => {
            console.log('Coffee Certification Rejected');
        });

    /**
     * Fetch Warehouse
     */
    builder
    .addCase(getWarehouseThunk.pending, state => {
        console.log('Coffee Warehouse Pending');
    })
    .addCase(getWarehouseThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        let aryWarehouse: Filter[] = [];
        action.payload.map((item: Warehouse) => {
            const element: Filter = {
                text: item.name,
                slug: item.slug,
                isChecked: false
            }
            aryWarehouse.push(element);
        });
        state.warehouse = aryWarehouse;        
    })
    .addCase(getWarehouseThunk.rejected, (state, action) => {
        console.log('Coffee Warehouse Rejected');
    });

    /**
     * Fetch States
     */
    builder
    .addCase(getStatesThunk.pending, state => {
        console.log('Coffee Shipping States Pending');
    })
    .addCase(getStatesThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        let aryStates: Filter[] = [];
        action.payload.map((item: State) => {
            const element: Filter = {
                text: item.name,
                slug: item.slug,
                isChecked: false
            }
            aryStates.push(element);
        });
        state.states = aryStates;        
    })
    .addCase(getStatesThunk.rejected, (state, action) => {
        console.log('Coffee Shipping States Rejected');
    });
  },
});

export const {addOriginToFilter, addTypeToFilter, addGradeToFilter, addProcessingToFilter, setInitialStoreData, addCertToFilter, addWarehouseToFilter, addPriceToFilter, addMOQToFilter, addStatesToFilter, resetAllFilterData, setFilters, setIsFirst, addOneOriginToFilter, addReviewToFilter} = filterSlice.actions;
export default filterSlice.reducer;
