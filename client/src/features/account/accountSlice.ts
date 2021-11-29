import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';

import { UserDto } from 'types/api';

export const name = 'account';

const initialState: UserDto = {
  token: '',
  email: '',
  username: '',
};

export const registerUser = createAsyncThunk<{}, FieldValues>(
  `${name}/registerUser`,
  async (values, thunkAPI) => {
    const { extra } = thunkAPI;
    const { api } = extra as any;

    await api.Account.register(values);
  }
);

export const signInUser = createAsyncThunk<UserDto, FieldValues>(
  `${name}/signInUser`,
  async (values, thunkAPI) => {
    const { extra } = thunkAPI;
    const { api } = extra as any;

    const { data } = await api.Account.login(values);
    localStorage.setItem(name, JSON.stringify(data));

    return data;
  }
);

export const fetchCurrentUser = createAsyncThunk<UserDto>(
  `${name}/fetchCurrentUser`,
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const { api } = extra as any;

    try {
      const { data } = await api.Account.current();

      return data;
    } catch (error) {
      localStorage.removeItem(name);
      return rejectWithValue({ error: error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem(name)) return false;
    },
  }
);

const accountSlice = createSlice({
  name,
  initialState,
  reducers: {
    signOutUser: (state) => {
      state = initialState;
      localStorage.removeItem(name);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, { payload }) => {
        state.email = payload.email;
        state.token = payload.token;
        state.username = payload.username;
      }
    );

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state = initialState;
    });
  },
});

export default accountSlice.reducer;
export const { signOutUser } = accountSlice.actions;
