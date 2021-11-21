import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityId,
} from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { BasketItemDto } from 'types/api';

export const name = 'basket';

const basketItemAdapter = createEntityAdapter<BasketItemDto>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (p) => p.productId!,
});

// Can create a set of memoized selectors based on the location of this entity state
export const basketItemSelector = basketItemAdapter.getSelectors<RootState>(
  (state) => state[name]
);

export const fetchBasket = createAsyncThunk(
  `${name}/fetchBasket`,
  async (_, thunkAPI) => {
    const { extra }: any = thunkAPI;
    const { api } = extra;

    const response = await api.Basket.get();

    return response;
  }
);

export const addBasketItem = createAsyncThunk(
  `${name}/addBasketItem`,
  async (
    {
      productId,
      quantity = 1,
    }: {
      productId: BasketItemDto['productId'] | EntityId;
      quantity: BasketItemDto['quantity'];
    },
    thunkAPI
  ) => {
    const { extra }: any = thunkAPI;
    const { api } = extra;

    const response = await api.Basket.addItem(productId, quantity);

    return response;
  }
);

export const removeBasketItem = createAsyncThunk(
  `${name}/removeBasketItem`,
  async (
    {
      productId,
      quantity = 1,
    }: {
      productId: BasketItemDto['productId'];
      quantity: BasketItemDto['quantity'];
    },
    thunkAPI
  ) => {
    const { extra }: any = thunkAPI;
    const { api } = extra;

    const response = await api.Basket.removeItem(productId, quantity);

    return response;
  }
);

const basketSlice = createSlice({
  name,
  initialState: basketItemAdapter.getInitialState({
    buyerId: '',
    fetchLoading: false,
    addLoading: false,
    removeLoading: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchBasket.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.buyerId = payload.buyerId;

      basketItemAdapter.upsertMany(state, payload.items);
    });

    builder.addCase(addBasketItem.pending, (state) => {
      state.addLoading = true;
    });

    builder.addCase(addBasketItem.fulfilled, (state, { payload }) => {
      state.addLoading = false;
      state.buyerId = payload.buyerId;

      basketItemAdapter.upsertMany(state, payload.items);
    });

    builder.addCase(removeBasketItem.pending, (state) => {
      state.removeLoading = true;
    });

    builder.addCase(removeBasketItem.fulfilled, (state, { payload }) => {
      state.removeLoading = false;
      state.buyerId = payload.buyerId;

      basketItemAdapter.upsertMany(state, payload.items);
    });
  },
});

export default basketSlice.reducer;
