import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IReduxStore } from '../../interfaces/IRedux';
import { IUserToFrontEnd } from '../../interfaces/IUser';

export interface IAuthResponse {
  userCredentials: IUserToFrontEnd | undefined;
}

const initialState: IReduxStore['auth'] = {
  userCredentials: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IAuthResponse | undefined>) => {
      if (!action.payload) return (state.userCredentials = undefined);

      const authPayload = action.payload;
      state.userCredentials = authPayload.userCredentials;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
