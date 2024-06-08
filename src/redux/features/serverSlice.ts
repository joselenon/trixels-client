import { createSlice } from '@reduxjs/toolkit';

interface IServerState {
  isOn: boolean;
}

const initialState: IServerState = {
  isOn: false,
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerStatus: (state, action) => {
      state.isOn = action.payload;
    },
  },
});

export const { setServerStatus } = serverSlice.actions;
export default serverSlice.reducer;
