import { combineReducers } from '@reduxjs/toolkit';

import productReducer, { name as productName } from 'slices/product';

const rootReducer = combineReducers({
  [productName]: productReducer,
});

export default rootReducer;
