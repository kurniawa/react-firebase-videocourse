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
    password: userData.password,
    countryCode: userData.countryCode, // Pastikan ini tersedia
    phoneNumber: userData.phoneNumber,
    phoneNumberFull: userData.phoneNumberFull,
    role: userData.role,
    profilePictureURL: '',
    profilePictureStoragePath: '',
    createdAt: new Date(),
    updatedAt: new Date(),
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

// Endpoint untuk menghapus user berdasarkan UID
app.delete('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    // 1. Hapus user dari Firebase Authentication
    await authAdmin.deleteUser(uid);

    // 2. Hapus dokumen user dari Firestore
    await db.collection('users').doc(uid).delete();

    res.status(200).json({ message: `User dengan UID ${uid} berhasil dihapus.` });
  } catch (error) {
    console.error(`Error deleting user ${uid}:`, error);
    // Tangani error spesifik, misalnya jika user tidak ditemukan
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.status(500).json({ message: 'Gagal menghapus user.', error: error.message });
  }
});

// Endpoint untuk mengedit user berdasarkan UID
app.put('/api/users/:uid', async (req, res) => {
  const uid = req.params.uid;
  const updatedData = req.body; // Data yang dikirim dari frontend



  try {
    // 1. Validasi data yang diterima
    if (!updatedData || !updatedData.fullName || !updatedData.email || !updatedData.countryCode || !updatedData.phoneNumber) {
      return res.status(400).json({ message: 'Data tidak lengkap. Pastikan fullName dan email ada.' });
    }

    // 2. Validasi nomor telepon di Firestore
    // Validasi: Cek apakah phoneNumberFull yang baru sudah digunakan oleh user lain
    if (updatedData.phoneNumberFull) {
      const usersRef = db.collection('users');
      const phoneNumberQuery = await usersRef.where('phoneNumberFull', '==', updatedData.phoneNumberFull).get();

      if (!phoneNumberQuery.empty) {
        // Jika ditemukan user dengan phoneNumberFull yang sama
        let isConflict = false;
        phoneNumberQuery.forEach(doc => {
          // Pastikan UID dari user yang ditemukan BUKAN UID dari user yang sedang diedit
          if (doc.id !== uid) {
            isConflict = true;
          }
        });

        if (isConflict) {
          return res.status(400).json({ message: 'Nomor telepon sudah terdaftar untuk user lain.' });
        }
      }
    }

    // 3. Perbarui data di Firebase Authentication (jika ada perubahan email/displayName)
    const authUpdate = {};
    if (updatedData.email) authUpdate.email = updatedData.email;
    if (updatedData.fullName) authUpdate.displayName = updatedData.fullName;

    if (Object.keys(authUpdate).length > 0) {
      await authAdmin.updateUser(uid, authUpdate);
    }

    // 4. Perbarui data di Firestore (users collection)
    const userDocRef = db.collection('users').doc(uid);
    await userDocRef.update({
      fullName: updatedData.fullName,
      email: updatedData.email, // Pastikan email juga diperbarui di Firestore jika perlu
      gender: updatedData.gender,
      countryCode: updatedData.countryCode,
      phoneNumber: updatedData.phoneNumber,
      phoneNumberFull: updatedData.phoneNumberFull,
      // Jangan perbarui password atau role dari sini secara langsung tanpa validasi tambahan
      // profilePictureURL: updatedData.profilePictureURL, // Jika ingin memperbarui ini
      // profilePictureStoragePath: updatedData.profilePictureStoragePath, // Jika ingin memperbarui ini
    });

    res.status(200).json({ message: `User dengan UID ${uid} berhasil diperbarui.`, data: updatedData });
  } catch (error) {
    console.error(`Error updating user ${uid}:`, error);
    // Tangani error spesifik, misalnya jika user tidak ditemukan
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }
    res.status(500).json({ message: 'Gagal memperbarui user.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});