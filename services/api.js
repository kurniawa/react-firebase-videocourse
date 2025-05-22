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

// Fungsi untuk menghapus data (DELETE) dari API
export const deleteData = async (endpoint, id) => {
  try {
    // Dapatkan token ID pengguna saat ini jika ada
    const token = await auth.currentUser?.getIdToken();
    // Siapkan header, termasuk Authorization
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    // Lakukan panggilan fetch dengan metode DELETE
    const response = await fetch(`http://localhost:5174/api/${endpoint}/${id}`, { // Sesuaikan URL dasar API Anda
      method: 'DELETE',
      headers: headers,
    });

    // Periksa apakah respons OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal menghapus data');
    }

    // Jika respons berhasil dan tidak ada body yang diharapkan (misalnya status 200 OK atau 204 No Content)
    // Anda bisa mengembalikan pesan sukses atau status
    return { success: true, message: `Data dengan ID ${id} berhasil dihapus.` };
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}/${id}:`, error);
    throw error;
  }
};

// Fungsi untuk memperbarui data (PUT) ke API
export const putData = async (endpoint, id, data) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const response = await fetch(`http://localhost:5174/api/${endpoint}/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal memperbarui data');
    }

    const responseData = await response.json();
    return responseData; // Mengembalikan respons dari server (misalnya data yang diperbarui)
  } catch (error) {
    console.error(`Error updating data at ${endpoint}/${id}:`, error);
    throw error;
  }
};