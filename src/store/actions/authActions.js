// src/store/actions/authActions.js
import { setUser, clearUser, setProfileData, setProfileLoading, setProfileError } from '../slices/authSlice';
// import { auth, /* tambahkan modul Firebase lain jika perlu */ } from '../../firebase';
import { auth, db } from '../../config/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { getData } from '../../../services/api';

// Action untuk mengatur user saat autentikasi berubah (misalnya saat login atau logout)
export const authStateChanged = (onAuthChecked) => (dispatch) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, you can fetch additional user data if needed
      // For this example, we'll just use the basic user info
      const loggedInUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // ... tambahkan properti user lain yang relevan
      };
      dispatch(setUser(loggedInUser));
    } else {
      // User is signed out
      dispatch(clearUser());
    }

    // Panggil callback setelah status awal diterima (baik login maupun logout)
    if (onAuthChecked) {
        onAuthChecked();
    }
  }, (error) => {
    console.error("Error during auth state change:", error);
    // Mungkin dispatch action untuk menyimpan error autentikasi
    if (onAuthChecked) {
      onAuthChecked();
    }
  });
};

// Action untuk melakukan login (contoh menggunakan email dan password)
export const loginWithEmailPassword = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const loggedInUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // ...
    };
    dispatch(setUser(loggedInUser));
    // Mungkin dispatch action lain seperti notifikasi sukses
  } catch (error) {
    console.error("Error during login:", error);
    // Mungkin dispatch action untuk menyimpan error login di state
  }
};

// Action untuk melakukan logout
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
    // Mungkin dispatch action lain seperti notifikasi logout
  } catch (error) {
    console.error("Error during logout:", error);
    // Mungkin dispatch action untuk menyimpan error logout di state
  }
};

export const fetchUserProfile = (uid) => async (dispatch) => {
    dispatch(setProfileLoading(true));
    dispatch(setProfileError(null));
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);
    
        if (docSnap.exists()) {
          const profileData = docSnap.data();

          // Konversi Timestamp ke format serializable (contoh: Unix timestamp dalam milidetik)
          if (profileData.updatedAt instanceof Timestamp) {
            profileData.updatedAt = profileData.updatedAt.toMillis();
          }
          if (profileData.createdAt instanceof Timestamp) {
            profileData.createdAt = profileData.createdAt.toMillis();
          }
    
          dispatch(setProfileData(profileData));
        } else {
            dispatch(setProfileError('Data profil pengguna tidak ditemukan.'));
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        dispatch(setProfileError('Gagal mengambil data profil.'));
    } finally {
        dispatch(setProfileLoading(false));
    }
  };

  export const fetchUserProfile2 = (uid) => async (dispatch) => {
  // dispatch(setProfileLoading(true));
  dispatch(setProfileError(null));
  try {
    const profile = await getData(uid); // Panggil fungsi API
    // dispatch(setProfileData(profile));
    console.log(profile);
  } catch (error) {
    dispatch(setProfileError(error.message));
  } finally {
    // dispatch(setProfileLoading(false));
  }
};