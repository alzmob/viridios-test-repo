import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { string } from "yup";
import { alertService } from "../alertService";
import { Country, User, State } from "../sign-up/registerSlice";

export interface CoffeeOrigin {
    id: string;
    name: string;
    slug: string;
    country: Country;
}

export interface CoffeeGrade {
    id: string;
    name: string;
    slug: string;
}

export interface Warehouse {
    id: string;
    name: string;
    street: string;
    city: string;
    apartment: string;
    zip_code: string;
    is_approved: boolean;
    is_created_by_admin: boolean;
    slug: string;
    state: State;
    created_by: string;
}

export interface Certification {
    id: string;
    name: string;
    url: string;
    slug: string;
}

export interface Image {
    id: string;
    is_thumbnail: boolean;
    image: string;
}

export interface Faq {
    id: string;
    question: string;
    answer: string;
}

export interface Tag {
    id: string;
    title: string;
}

export interface Review {
    id: number;
    rating: number;
    comments: string;
    created_at: string;
    order: number;
    product: number;
    customer: User;
}

export interface ReviewCount {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
}

export interface Product {
    id: string;
    title: string;
    coffee_type: string;
    coffee_form: string;
    coffee_grade: CoffeeGrade;
    coffee_processing: string;
    offer_sample: boolean;
    sample_price: string;
    sample_weight: string;
    packaging_type: string;
    packaging_unit: string;
    lbs_per_package: number;
    price_per_lb: string;
    status: string;
    creation_step: string;
    rejection_reason: string;
    minimum_order_qty: string;
    available_qty: string;
    details: string;
    slug: string;
    created_at: string;
    updated_at: string;
    sold_by: User;
    coffee_origin: CoffeeOrigin;
    warehouse: Warehouse;
    certifications: Certification[];
    images: Image[];
    faqs: Faq[];
    tags: Tag[];
    reviews: Review[];
    reviews_count: ReviewCount;
    orders_count: number;
    cartQuantity: number;
    quantities: number[];
    originalQuantitiesCount: number;
    cartId: number;
    is_sample: boolean;
}

interface InitialState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    products: Product[];
    error: string;
}

const initialState: InitialState = {
    loading: 'idle',
    products: [],
    error: '',
}

export const getProductsThunk = createAsyncThunk(
    'search/getProductsThunk',
    async (url: string) => {    
      const response = await axios.get(url);
      return response.data
    }
  );

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetState(state) {
            state.loading = 'idle';
            state.products = [];
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProductsThunk.pending, state => {
            state.loading = 'pending';
        })
        .addCase(getProductsThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.products = action.payload.results;                 
            state.loading = 'succeeded'; 
        })
        .addCase(getProductsThunk.rejected, (state, action) => {
            console.warn('SEARCH PRODUCTS ERROR', action.error);
            state.loading = 'failed';            
            alertService.alert('warning', 'wentWrong', 'account');
        });
    },
});

export const {resetState} = searchSlice.actions;
export default searchSlice.reducer;