import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState } from '../../interfaces/IRedux';
import { IUser } from '../../interfaces/IUser';

const initialState: IAuthState = {
  userCredentials: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IUser>) => {
      if (!action.payload) return (state.userCredentials = undefined);

      const credentials = action.payload;
      state.userCredentials = credentials;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
