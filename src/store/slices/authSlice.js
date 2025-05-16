// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: null, // Awalnya tidak ada user yang login
  isAuthenticated: false, // Status autentikasi awal
  // Anda bisa menambahkan state lain terkait autentikasi di sini
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedInUser = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated berdasarkan keberadaan payload
    },
    clearUser: (state) => {
      state.loginUser = null;
      state.isAuthenticated = false;
      state.profileData = null;
      state.profileError = null;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.profileLoading = action.payload;
    },
    setProfileError: (state, action) => {
      state.profileError = action.payload;
    },
    // Anda bisa menambahkan reducer lain seperti untuk menyimpan token, error login, dll.
  },
});

// Export actions yang dihasilkan oleh createSlice
export const { setUser, clearUser, setProfileData, setProfileLoading, setProfileError } = authSlice.actions;

// Export reducer-nya
export default authSlice.reducer;