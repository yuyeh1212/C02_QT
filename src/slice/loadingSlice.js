import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload; // `action.payload` 為 `true` 或 `false`
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
