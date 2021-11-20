import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import api from 'app/api';
import reducer from 'app/storeReducer';

export const store = configureStore({
  reducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument: { api } },
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// hot module replacement for reducers
if (module.hot) {
  module.hot.accept('app/storeReducer', () => {
    const reducers = require('app/storeReducer').default;

    store.replaceReducer(reducers);
  });
}
