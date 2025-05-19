const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 5174; // Pilih port yang sesuai

// Menggunakan file JSON kredensial (jangan di-commit ke repository publik)
const serviceAccount = require('./public/video-course-educational-firebase-adminsdk-fbsvc-7e99574ef4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'YOUR_FIREBASE_DATABASE_URL' // Jika Anda menggunakan Realtime Database
});

const db = admin.firestore(); // Dapatkan instance Firestore
const authAdmin = admin.auth(); // Dapatkan instance Auth Admin


// Middleware untuk mengizinkan CORS (jika frontend dan backend di domain berbeda)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Atau domain spesifik frontend Anda
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware untuk mengelola body permintaan JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend berjalan!");
});

// Endpoint untuk mendapatkan semua data pengguna dari Firebase Auth dan Firestore
app.get('/api/users', async (req, res) => {
  try {
    // 1. Ambil data pengguna dari Firebase Authentication
    const listUsersResult = await authAdmin.listUsers();
    const authUsers = listUsersResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      emailVerified: userRecord.emailVerified,
      disabled: userRecord.disabled,
    }));

    // 2. Ambil data pengguna dari Firestore (users collection)
    const usersCollectionRef = db.collection('users');
    const snapshot = await usersCollectionRef.get();
    const firestoreUsers = snapshot.docs.map(doc => {
        const data = doc.data();
        // Pastikan uid ada di data Firestore.
        return {
            uid: data.uid,
            fullName: data.fullName,
            email: data.email, // Duplikasi data, perlu penanganan jika email berbeda.
            gender: data.gender,
            countryCode: data.countryCode,
            phoneNumber: data.phoneNumber,
            phoneNumberFull: data.phoneNumberFull,
            // password tidak boleh dikembalikan.
            profilePictureURL: data.profilePictureURL,
            profilePictureStoragePath: data.profilePictureStoragePath,
            role: data.role
        }
    });

    // 3. Gabungkan data dari Auth dan Firestore
    const combinedUsers = authUsers.map(authUser => {
      // Cari data Firestore yang sesuai dengan uid dari pengguna Auth.
      const firestoreUser = firestoreUsers.find(user => user.uid === authUser.uid);
      // Gabungkan data Auth dan Firestore.  Utamakan data dari Firestore jika ada konflik.
      return {
        authUserData: authUser,
        firestoreUserData: firestoreUser
      };
    });
    //Mengirim response berupa array combinedUsers
    res.json(combinedUsers);
  } catch (error) {
    console.error('Error fetching users from Firebase Auth and Firestore:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengguna dari Firebase Auth dan Firestore' });
  }
});

// Endpoint untuk mendapatkan profil pengguna
app.get('/api/users/:userId/profile', async (req, res) => {
  const userId = req.params.userId;
  try {
    const userDocRef = db.collection('users').doc(userId);
    const docSnap = await userDocRef.get();

    if (docSnap.exists) {
      const userData = docSnap.data();
      res.json(userData);
    } else {
      res.status(404).json({ message: 'Profil pengguna tidak ditemukan di Firestore' });
    }
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
    res.status(500).json({ message: 'Gagal mengambil profil pengguna dari Firestore' });
  }
});

// MENAMBAH USER BARU DI AUTH DAN FIRESTORE
// Fungsi untuk membuat user di auth dan firestore
const createUserInAuthAndFirestore = async (userData) => {
  // 1. Buat user di Firebase Authentication
  const userCreationResult = await authAdmin.createUser({
    email: userData.email,
    password: userData.password,
    displayName: userData.fullName, //simpan nama lengkap
  });

  // 2. Simpan data user ke Firestore
  const userRef = db.collection('users').doc(userCreationResult.uid);
  await userRef.set({
    uid: userCreationResult.uid,
    fullName: userData.fullName,
    email: userData.email,
    gender: userData.gender,
    countryCode: userData.countryCode, // Pastikan ini tersedia
    phoneNumber: userData.phoneNumber,
    phoneNumberFull: userData.phoneNumberFull,
    role: userData.role,
    profilePictureURL: '',
    profilePictureStoragePath: '',
  });

  return { uid: userCreationResult.uid, ...userData };
};
// Endpoint untuk menambahkan user baru
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

    // 1. Validasi nomor telepon di Firestore
    const usersRef = db.collection('users');
    const phoneNumberQuery = await usersRef.where('phoneNumberFull', '==', userData.phoneNumberFull).get();
    if (!phoneNumberQuery.empty) {
      return res.status(400).json({ message: 'Nomor telepon sudah terdaftar.' });
    }

    // 2. Buat user di Auth dan Firestore
    const newUser = await createUserInAuthAndFirestore(userData);
    res.status(201).json({ message: 'User berhasil ditambahkan', data: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Gagal menambahkan user.', error: error.message });
  }
});

// Endpoint untuk mengedit pengguna
app.put('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    const { fullName, gender, countryCode, phoneNumber, phoneNumberFull, profilePictureURL, profilePictureStoragePath, role, email } = req.body;

        // Update data di Firebase Authentication jika email diubah
        if (email) {
          await authAdmin.updateUser(uid, { email });
        }

    // Update data di Firestore
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({
      fullName,
      gender,
      countryCode,
      phoneNumber,
      phoneNumberFull,
      profilePictureURL,
      profilePictureStoragePath,
      role,
    });

    res.json({ message: 'Pengguna berhasil diubah', userId: uid });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Gagal mengubah pengguna' });
  }
});

// Endpoint untuk menghapus pengguna
app.delete('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    // 1. Hapus dokumen dari Firestore
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.delete();

    // 2. Hapus pengguna dari Firebase Authentication
    await authAdmin.deleteUser(uid);

    res.json({ message: 'Pengguna berhasil dihapus', userId: uid });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Gagal menghapus pengguna' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});