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