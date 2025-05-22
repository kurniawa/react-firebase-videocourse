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

        // Reducers untuk operasi penghapusan user
        deleteUserStart: (state) => {
            state.loading = true; // Set loading menjadi true saat proses dimulai
            state.error = null; // Bersihkan error sebelumnya
        },
        deleteUserSuccess: (state, action) => {
            // Hapus user dari array berdasarkan UID yang diterima di payload
            state.users = state.users.filter(user => user.uid !== action.payload);
            state.loading = false; // Set loading menjadi false
            state.error = null; // Bersihkan error
        },
        deleteUserFailure: (state, action) => {
            state.loading = false; // Set loading menjadi false
            state.error = action.payload; // Simpan pesan error
        },

        // Reducers baru untuk operasi edit user
        editUserStart: (state) => {
            state.loading = true; // Set loading menjadi true saat proses edit dimulai
            state.error = null; // Bersihkan error sebelumnya
        },
        editUserSuccess: (state, action) => {
            // Temukan user yang diedit berdasarkan UID di payload
            const index = state.users.findIndex(user => user.uid === action.payload.uid);
            if (index !== -1) {
                // Perbarui data user di array
                state.users[index] = { ...state.users[index], ...action.payload };
            }
            state.loading = false; // Set loading menjadi false
            state.error = null; // Bersihkan error
        },
        editUserFailure: (state, action) => {
            state.loading = false; // Set loading menjadi false
            state.error = action.payload; // Simpan pesan error
        },
    },
});

export const {
    addUserStart,
    addUserSuccess,
    addUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure
} = userSlice.actions;
export default userSlice.reducer;

export const selectUsers = (state) => state.user.users;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
