import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from 'features/counter/counterSlice';
import productReducer, { name as productName } from 'slices/product';

const rootReducer = combineReducers({
  counter: counterReducer,

  [productName]: productReducer,
});

export default rootReducer;
