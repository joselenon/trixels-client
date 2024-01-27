import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IReduxStore } from '../../interfaces/IRedux';
import { IUser } from '../../interfaces/IUser';

const initialState: IReduxStore['auth'] = {
  userCredentials: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IUser | undefined>) => {
      if (!action.payload) return (state.userCredentials = undefined);

      const credentials = action.payload;
      state.userCredentials = credentials;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
