import { combineReducers } from '@reduxjs/toolkit';

import productReducer, {
  name as productName,
} from 'features/product/productSlice';

import basketReducer, { name as basketName } from 'features/basket/basketSlice';
import accountReducer, {
  name as accountName,
} from 'features/account/accountSlice';

const rootReducer = combineReducers({
  [accountName]: accountReducer,
  [basketName]: basketReducer,
  [productName]: productReducer,
});

export default rootReducer;
