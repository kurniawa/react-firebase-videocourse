import { auth } from "../src/config/firebaseConfig";

export const getData = async (endpoint) => {
  try {
    const token = await auth.currentUser?.getIdToken(); // Dapatkan token jika login
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`http://localhost:5174/api/${endpoint}`, {
      headers: headers,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Gagal mengambil data dari ${endpoint}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Fungsi untuk mengirim data (POST)
export const postData = async (endpoint, data) => {
  try {
    const token = await auth.currentUser?.getIdToken(); //ambil token
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}), //tambahkan authorization jika ada token
    };
    const response = await fetch(`http://localhost:5174/api/${endpoint}`, { // Sesuaikan dengan URL API Anda
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data), // Kirim data sebagai JSON
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal menambahkan data');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error adding data to ${endpoint}:`, error);
    throw error;
  }
};