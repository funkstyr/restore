import { combineReducers } from '@reduxjs/toolkit';

import productReducer, {
  name as productName,
} from 'features/product/productSlice';

const rootReducer = combineReducers({
  [productName]: productReducer,
});

export default rootReducer;
