import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Product } from 'types/api';
import { ProductParams } from 'types/product';

export const name = 'product';

interface ProductState {
  filters: {
    brands: string[];
    types: string[];
  };
  params: ProductParams;
}

const productAdapter = createEntityAdapter<Product>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (p) => p.id!,
});

// Can create a set of memoized selectors based on the location of this entity state
export const productSelectors = productAdapter.getSelectors<RootState>(
  (state) => state[name]
);

function createAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', productParams.pageNumber.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);

  if (productParams.searchTerm)
    params.append('searchTerm', productParams.searchTerm);
  if (productParams.brands)
    params.append('brands', productParams.brands.toString());
  if (productParams.types)
    params.append('types', productParams.types.toString());

  return params;
}

// fetch products, if needed by multiple slices, pop up to shared thunk file
export const fetchProducts = createAsyncThunk(
  `${name}/fetchProducts`,
  async (_, thunkAPI) => {
    const { extra, getState }: any = thunkAPI;
    const { api } = extra;

    const state = getState();
    const params = createAxiosParams(state[name].params);

    const response = await api.Catalog.list(params);

    return response;
  }
);

// fetch product by id

export const fetchProductById = createAsyncThunk(
  `${name}/fetchProductById`,
  async (productId: Product['id'] | string, thunkAPI) => {
    const { extra }: any = thunkAPI;
    const { api } = extra;

    const response = await api.Catalog.details(productId);

    return response;
  }
);

export const fetchProductFilters = createAsyncThunk(
  `${name}/fetchFilters`,
  async (_, thunkAPI) => {
    const { extra }: any = thunkAPI;
    const { api } = extra;

    const response = await api.Catalog.fetchFilters();

    return response;
  }
);

const initialParams = {
  pageNumber: 1,
  pageSize: 6,
  orderBy: 'name',
};

const productSlice = createSlice({
  name,
  initialState: productAdapter.getInitialState<ProductState>({
    filters: { brands: [], types: [] },
    params: initialParams,
  }),
  reducers: {
    setProductParams: (state, { payload }) => {
      state.params = { ...state.params, ...payload };
    },
    resetProductParams: (state) => {
      state.params = initialParams;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
      productAdapter.upsertMany(state, payload);
    });

    builder.addCase(fetchProductById.fulfilled, (state, { payload }) => {
      productAdapter.upsertOne(state, payload);
    });

    builder.addCase(fetchProductFilters.fulfilled, (state, { payload }) => {
      state.filters = payload;
    });
  },
});

export default productSlice.reducer;
export const { setProductParams, resetProductParams } = productSlice.actions;
