import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticted: false,
  sessionId: ''
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem('session_id');

      localStorage.setItem('acountId', action.payload.id);
    }
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
