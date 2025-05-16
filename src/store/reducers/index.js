// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import dataReducer from '../slices/dataSlice'; // Import dataReducer

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer, // Tambahkan dataReducer
  // ... reducer lainnya
});

export default rootReducer;