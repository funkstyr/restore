import { combineReducers } from '@reduxjs/toolkit';

import productReducer, {
  name as productName,
} from 'features/product/productSlice';

import basketReducer, { name as basketName } from 'features/basket/basketSlice';

const rootReducer = combineReducers({
  [basketName]: basketReducer,
  [productName]: productReducer,
});

export default rootReducer;
