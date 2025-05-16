// src/store/actions/dataActions.js
import { getData } from '../../../services/api';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../slices/dataSlice';

export const fetchData = (endpoint) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = await getData(endpoint);
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};