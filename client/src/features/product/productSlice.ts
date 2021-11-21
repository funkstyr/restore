import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Product } from 'types/api';

export const name = 'product';

const productAdapter = createEntityAdapter<Product>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (p) => p.id!,
});

// Can create a set of memoized selectors based on the location of this entity state
export const productSelectors = productAdapter.getSelectors<RootState>(
  (state) => state[name]
);

// fetch products, if needed by multiple slices, pop up to shared thunk file
export const fetchProducts = createAsyncThunk(
  `${name}/fetchProducts`,
  async (_, thunkAPI) => {
    const { extra }: any = thunkAPI;
    const { agent } = extra;

    const response = await agent.Catalog.list();

    return response;
  }
);

// fetch product by id

export const fetchProductById = createAsyncThunk(
  `${name}/fetchProductById`,
  async (productId: Product['id'] | string, thunkAPI) => {
    const { extra }: any = thunkAPI;
    const { agent } = extra;

    const response = await agent.Catalog.details(productId);

    return response;
  }
);

const productSlice = createSlice({
  name,
  initialState: productAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      productAdapter.upsertMany(state, payload);
    });

    builder.addCase(fetchProductById.fulfilled, (state, { payload }) => {
      productAdapter.upsertOne(state, payload);
    });
  },
});

export default productSlice.reducer;
