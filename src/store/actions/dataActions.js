// src/store/actions/dataActions.js
import { deleteData, getData, postData, putData } from '../../../services/api';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../slices/dataSlice';
import {
  addUserFailure,
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  editUserStart,
  editUserSuccess,
  editUserFailure
} from '../slices/userSlice';

export const fetchData = (endpoint) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await getData(endpoint);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const addUser = (userData) => async (dispatch) => {
  dispatch(addUserStart());
  try {
    // Panggil API untuk menambahkan user
    const response = await postData('users', userData); // Endpoint 'users'
    // Asumsikan backend mengembalikan data user yang ditambahkan
    dispatch(addUserSuccess(response.data)); // Dispatch action success
  } catch (error) {
    dispatch(addUserFailure(error.message));
    throw error; // Penting untuk melempar error agar ditangkap di komponen
  }
};

// Action Creator untuk menghapus user
export const deleteUser = (uid) => async (dispatch) => {
  dispatch(deleteUserStart()); // Dispatch action untuk menandai proses penghapusan dimulai
  try {
    // Panggil fungsi deleteData dari services/api untuk menghapus user di backend
    await deleteData('users', uid); // 'users' adalah endpoint, uid adalah ID user yang akan dihapus
    dispatch(deleteUserSuccess(uid)); // Dispatch action success dengan UID user yang berhasil dihapus
  } catch (error) {
    // Tangani error jika penghapusan user gagal
    dispatch(deleteUserFailure(error.message)); // Dispatch action failure dengan pesan error
    throw error; // Penting untuk melempar error agar dapat ditangkap di komponen yang memanggil
  }
};

// Action Creator baru untuk mengedit user
export const editUser = (uid, updatedUserData) => async (dispatch) => {
  dispatch(editUserStart()); // Dispatch action untuk menandai proses edit dimulai
  try {
    // Panggil fungsi putData dari services/api untuk mengirim data yang diperbarui ke backend
    const response = await putData('users', uid, updatedUserData); // 'users' endpoint, uid, dan data
    dispatch(editUserSuccess({ uid, ...response.data })); // Dispatch success dengan UID dan data yang diperbarui
  } catch (error) {
    // Tangani error jika pengeditan user gagal
    dispatch(editUserFailure(error.message)); // Dispatch failure dengan pesan error
    throw error; // Lempar error agar dapat ditangkap di komponen
  }
};