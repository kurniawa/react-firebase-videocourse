import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [], // Menyimpan daftar user
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addUserSuccess: (state, action) => {
            state.users.push(action.payload); // Tambah user baru ke state
            state.loading = false;
            state.error = null;
        },
        addUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addUserStart, addUserSuccess, addUserFailure } = userSlice.actions;
export default userSlice.reducer;

export const selectUsers = (state) => state.user.users;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
    