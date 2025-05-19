// src/store/actions/dataActions.js
import { getData, postData } from '../../../services/api';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../slices/dataSlice';
import { addUserFailure, addUserStart, addUserSuccess } from '../slices/userSlice';

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