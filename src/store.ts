import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import devToolsEnhancer from 'remote-redux-devtools';
import onboardingReducer from './onboarding/onboardingSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import signInReducer from './sign-in/signInSlice';
// import joinusReducer from './sign-up/join-us/joinusSlice';
import registerReducer from './sign-up/registerSlice';
import homeReducer from './home/homeSlice';
import searchReducer from './search/searchSlice';
import cartReducer from './cart/cartSlice';
import filterReducer from './filters/filterSlice';

const rootReducer = combineReducers({
  // search: searchReducer,
  // onboarding: onboardingReducer,
  // cart: cartReducer,
  // filter: filterReducer,
  // signIn: signInReducer,
  // register: registerReducer,
  // joinUs: joinusReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'theme', 'filter'],
};

const middleware = [
  ...getDefaultMiddleware({
    // NOTE: Disabled since we use immer
    immutableCheck: false,
    serializableCheck: false,
  }),
];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  enhancers: [devToolsEnhancer({realtime: true, port: 8000})],
  devTools: false,
});

export const persistor = persistStore(store);
