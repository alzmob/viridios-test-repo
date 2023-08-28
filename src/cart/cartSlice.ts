import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
import {alertService} from '../alertService';
import { Address } from '../delivery-address/addressSlice';
import { Product } from '../search/searchSlice';

interface InitialState {
  // synced: Product[];
  cartItems: Product[];
  // cartTotalQuantity: number;
  cartTotalAmmount: number;
  isCreatedCart: boolean;
  isFromCart: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'; 
  billing_address:  Address;
  shipping_address: Address;
}

const initialState: InitialState = {
  // synced: [],
  cartItems: [],
  // cartTotalQuantity: 0,
  cartTotalAmmount: 0,
  isCreatedCart: false,
  isFromCart: false,
  loading: 'idle',
  billing_address: {},
  shipping_address: {},
};

export const createCartThunk = createAsyncThunk(
  'cart/createCartThunk',
  async (params: {products: any[], token: string}) => {
    console.log('Params', params);
    const payload = {
      products: params.products
    }
    console.log('Payload =====>', payload);    
    const response = await axios.post(config.CART, payload, {
      headers: {
        'Authorization': `Bearer ${params.token}`
      }
    });
    return response.data;
    
  },
);

export const getCartThunk = createAsyncThunk(
  'cart/getCartThunk',
  async (token: string) => {    
    const response = await axios.get(config.CART, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
    
  },
);

export const addToCartThunk = createAsyncThunk(
  'cart/addToCartThunk',
  async (params: {token: string, url: string, quantity?: number, is_sample?: boolean}) => {    
    const payload = params.quantity ? {quantity: params.quantity} : {is_sample: true};
    const response = await axios.post(params.url,  payload, {
      headers: {
        'Authorization': `Bearer ${params.token}`
      }
    });
    return response.data;
    
  },
);

export const removeItemFromCartThunk = createAsyncThunk(
  'cart/removeItemFromCartThunk',
  async (params: {token: string, url: string}) => {    
    const response = await axios.delete(params.url, {
      headers: {
        'Authorization': `Bearer ${params.token}`
      }
    });
    return response.data;
    
  },
);

const getQuantitiesA = (product: any) => { // create a list for quantity dropdown
  let moq = parseFloat(product.minimum_order_qty);
  let qua = [moq];
  let max = parseFloat(product.available_qty);
  let index = 1
  while (moq < max) {
      moq += index * 132;
      if (moq < max) {
          qua.push(moq);
      }          
  }    
  return qua;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetIsLoading(state) {
      state.loading = 'idle';
    },
    addToCart(state, {payload}) {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === payload.id,
      );
      console.log('Item Index', itemIndex);
      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].is_sample) { // You can't add both free sample and actual product to the cart. If you've requested a sample before adding an actual product, the old item will be removed from the cart when you add an actual product. Vice versa.
          state.cartItems[itemIndex] = payload;
        } else {
          state.cartItems[itemIndex].cartQuantity += payload.cartQuantity;

          // add customized quantity to quantities array when updating cart
          const lastQuantity = state.cartItems[itemIndex].cartQuantity;
          if (state.cartItems[itemIndex].originalQuantitiesCount === state.cartItems[itemIndex].quantities.length) {
            state.cartItems[itemIndex].quantities.push(lastQuantity);
          } else {
            state.cartItems[itemIndex].quantities[state.cartItems[itemIndex].quantities.length - 1] = lastQuantity;
          }        
        }        

        console.log('Update Cart Items', state.cartItems[itemIndex]);
        alertService.alert('success', 'updateQuantity', 'products');
      } else {
        const tempProduct = payload;
        state.cartItems.push(tempProduct);
        console.log('Add Cart Items', state.cartItems);
        alertService.alert('success', 'addedToCart', 'products');
      }  

      const setStorage = async () => {
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(state.cartItems),
        );
      };
      setStorage();
    },
    addFreeSampleToCart(state, {payload}) {   
      const itemIndex = state.cartItems.findIndex(
        item => item.id === payload.id,
      );
      if (itemIndex >= 0) { // You can't add both free sample and actual product to the cart. If you've added actual product before requesting a sample, the old item will be removed from the cart when you request the sample. Vice versa.
        state.cartItems[itemIndex] = payload;
      } else {
        let tempProduct = payload;
        state.cartItems.push(tempProduct);
        console.log('Add Cart Items', state.cartItems);
        alertService.alert('success', 'addedToCart', 'products');
      }   
      
    },
    updateCartItem(state, {payload}) {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === payload.id,
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity = payload.cartQuantity;
      }
    },
    removeFromCart(state, {payload}) {
      alertService.alert('success', 'removeFromCart', 'products');
      const nextCartItems = state.cartItems.filter(item => item.id !== payload);
      console.log('Remaining cart items', nextCartItems);
      state.cartItems = nextCartItems;

      const setStorage = async () => {
        await AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(state.cartItems),
        );
      };
      setStorage();
    },
    getTotals(state) {
      if (state.cartItems.length !== 0) {
        let {total} = state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const {price_per_lb, cartQuantity, sample_price} = cartItem;
            let itemTotal: number = 0
            if (cartQuantity === 0) {
              if (parseFloat(sample_price) !== 0.0) {
                itemTotal += parseFloat(sample_price);
              }
            } else {
              itemTotal = parseFloat(price_per_lb) * cartQuantity;
            }
  
            cartTotal.total += itemTotal;
  
            return cartTotal;
          },
          {
            total: 0
          },
        );
        state.cartTotalAmmount = total;        
      }
    },
    setIsFromCart(state) {
      state.isFromCart = true;
    },
    reSetIsFromCart(state) {
      state.isFromCart = false;
    }
    // clearCart(state) {
    //   state.cartItems = [];
    //   state.cartTotalQuantity = 0;
    //   state.cartTotalAmmount = 0;
    //   const setStorage = async () => {
    //     await AsyncStorage.setItem(
    //       'cartItems',
    //       JSON.stringify(state.cartItems),
    //     );
    //   };
    //   setStorage();
    // },
  },
  extraReducers: builder => {

    /**
     * Fetch cart
     */
     builder
     .addCase(getCartThunk.pending, state => {
       console.log('Get Cart Pending');
     })
     .addCase(getCartThunk.fulfilled, (state, action) => {
       state.billing_address = action.payload.billing_address;
       state.shipping_address = action.payload.shipping_address;
       if (Object.keys(action.payload).length !== 0) {
        if (action.payload.products.length !== 0) {
          let cartItems = action.payload.products.map(item => {
            let product: Product = {};
            product = item.product;
            product.cartId = item.id;
            product.is_sample = item.is_sample;
            product.quantities = getQuantitiesA(item.product);
            
            // To add a special quantity to the end of quantity list
            const index = product.quantities.findIndex(element => element === item.quantity);
            if (index < 0) {
              product.quantities.push(item.quantity);
              
            }
            if (item.is_sample === false) {
              product.cartQuantity = item.quantity;
            } else {
              product.cartQuantity = 0;
            }
            return product;
          });
          state.isCreatedCart = true;
          state.cartItems = cartItems;
        } 
       } else {
        state.cartItems = [];
       }       
       
     })
     .addCase(getCartThunk.rejected, (state, action) => {
       console.log('Get Cart Rejected');
     });

    /**
     * Remove item from cart
     */
      builder
      .addCase(removeItemFromCartThunk.pending, state => {
        console.log('Remove Cart Pending');
      })
      .addCase(removeItemFromCartThunk.fulfilled, (state, action) => {
        console.log('Remove Cart Success');        
      })
      .addCase(removeItemFromCartThunk.rejected, (state, action) => {
        console.log('Remove Cart Rejected');

      });

    /**
     * Create cart
     */
      builder
      .addCase(createCartThunk.pending, state => {
        state.loading = 'pending';
        console.log('Create Cart Pending');
      })
      .addCase(createCartThunk.fulfilled, (state, action) => {
        console.log('Create Cart Success');
        state.loading = 'succeeded';
        state.isCreatedCart = true;        
      })
      .addCase(createCartThunk.rejected, (state, action) => {
        console.log('Create Cart Rejected');
        state.loading = 'failed';
      });
    
    /**
     * Add to Cart
     */
      builder
      .addCase(addToCartThunk.pending, state => {
        console.log('Add To Cart Pending');
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        console.log('Add To Cart Success');  
        console.log('Cart Products', action.payload.products);
        let product: Product = {};
        const item = action.payload.products[0];
        product = item.product;
        product.cartId = item.id;
        product.is_sample = item.is_sample;
        
        product.quantities = getQuantitiesA(item.product);
        
        // To add a special quantity to the end of quantity list
        const index = product.quantities.findIndex(element => element === item.quantity);
        if (index < 0) {
          product.quantities.push(item.quantity);
          
        }

        if (item.is_sample === false) {
          product.cartQuantity = item.quantity;
        }        
        const i = state.cartItems.findIndex(element => element.id === product.id);
        if (i >= 0) { // check if the sample product is in the cart
          state.cartItems[i] = product;
        } else {
          state.cartItems.push(product);
        }
            
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        console.log('Add To Cart Rejected');

      });
  }
});

export const {
  addToCart,
  removeFromCart,
  getTotals,
  addFreeSampleToCart,
  updateCartItem,
  setIsFromCart,
  reSetIsFromCart,
  resetIsLoading
  // clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
