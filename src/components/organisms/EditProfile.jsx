import { useEffect, useRef, useState } from "react";
import ButtonDashboard from "../atoms/ButtonDashboard";
import InputForEditProfile from "../atoms/InputForEditProfile";
import InputPhoneNumberEP from "../atoms/InputPhoneNumberEP";
import LineHorizontal from "../atoms/LineHorizontal";
import SelectForEditProfile from "../atoms/SelectForEditProfile";
import ButtonLime500 from "../atoms/ButtonLime500";
import Footer from "./Footer";
import InputPasswordEP from "../atoms/InputPasswordEP";
import ValidationFeedback from "../atoms/ValidationFeedback";
import LoadingSpinner from "../molecules/LoadingSpinner";

import { updateProfile, updateEmail } from 'firebase/auth';
import { doc, updateDoc, getFirestore, getDoc } from 'firebase/firestore';
import { auth } from '../../config/firebaseConfig'; // Pastikan path ini benar

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, fetchUserProfile2 } from "../../store/actions/authActions";

const EditProfile = ({type}) => {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const profileData = useSelector((state) => state.auth.profileData);
    const profileLoading = useSelector((state) => state.auth.profileLoading);
    const profileError = useSelector((state) => state.auth.profileError);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInUser && !profileData && !profileLoading && !profileError) {
            // Jika login dan data profil belum ada, fetch data
            dispatch(fetchUserProfile(loggedInUser.uid));
            dispatch(fetchUserProfile2(loggedInUser.uid));
        }
    }, [loggedInUser, profileData, profileError, profileError]);

    console.log("profileData:", profileData);


    let arrayButtonDashboard = [
        { active: type === "PROFILE", label: "Profil Saya" },
        { active: type === "MY-CLASS", label: "Kelas Saya" },
        { active: type === "MY-ORDER", label: "Pesanan Saya" }
    ];

    // State untuk mengelola nilai input
    const [fullName, setFullName] = useState(profileData?.fullName || "");
    const [email, setEmail] = useState(profileData?.email || "");
    const [gender, setGender] = useState(profileData?.gender || "");
    const [countryCode, setCountryCode] = useState(profileData?.countryCode || "");
    const [phoneNumber, setPhoneNumber] = useState(profileData?.phoneNumber || "");
    const [password, setPassword] = useState(profileData?.password || "");
    const [passwordConfirmation, setPasswordConfirmation] = useState(profileData?.password || "");
    const [profilePictureURL, setProfilePictureURL] = useState(profileData?.profilePictureURL || "");
    // const [profilePictureStoragePath, setProfilePictureStoragePath] = useState(profileData?.profilePictureStoragePath || "");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Ref untuk elemen file input foto profil
    const profilePictureURLRef = useRef(null);
    // const phoneNumberRef = useRef({}); // Tambahkan ref untuk countryCode

    useEffect(() => {
        // Set nilai state berdasarkan data loggedInUser saat komponen mount atau loggedInUser berubah
        if (profileData) {
            setFullName(profileData.fullName || "");
            setEmail(profileData.email || "");
            setGender(profileData.gender || "");
            setCountryCode(profileData.countryCode || "");
            setPhoneNumber(profileData.phoneNumber || "");
            setProfilePictureURL(profileData.profilePictureURL || "");
            // setProfilePictureStoragePath(profileData.profilePictureStoragePath || "");
        }
    }, [profileData]);

    // console.log("profileData:", profileData);

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'countryCode':
                setCountryCode(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'passwordConfirmation':
                setPasswordConfirmation(value);
                break;
            default:
                break;
        }
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const editedFullName = fullName; // Menggunakan state
        const editedEmail = email; // Menggunakan state
        const editedGender = gender; // Menggunakan state
        const editedCountryCode = countryCode; // Menggunakan state
        const editedPhoneNumber = phoneNumber; // Menggunakan state
        const editedPassword = password; // Menggunakan state
        const editedPasswordConfirmation = passwordConfirmation; // Menggunakan state
        const editedPhoneNumberFull = `${countryCode}${phoneNumber.replace(/^0+/, "")}`;

        if (!editedFullName || !editedEmail || !editedGender || !editedCountryCode || !editedPhoneNumber) {
            setError("Semua kolom wajib diisi!");
            setLoading(false);
            return;
        }

        if (editedPassword) {
            if (editedPassword.length < 8) {
                setError("Password minimal 8 karakter");
                setLoading(false);
                return;
            }
            if (editedPassword !== editedPasswordConfirmation) {
                setError("Password dan Konfirmasi Password tidak sama");
                setLoading(false);
                return;
            }
            // TODO: Implement update password using Firebase Auth
            console.log("Update password functionality needs to be implemented.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Format email tidak valid");
            setLoading(false);
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                // Update display name dan email di Firebase Authentication
                const updates = {};
                if (editedFullName !== user.displayName) {
                    updates.displayName = fullName;
                }
                if (editedEmail !== user.email) {
                    await updateEmail(user, email);
                    updates.email = email; // Optional: Update local state if needed
                }
                if (Object.keys(updates).length > 0) {
                    await updateProfile(user, updates);
                    console.log("Firebase Auth profile updated.");
                }

                // Update data profil lainnya di Firestore
                const userDocRef = doc(db, 'users', user.uid); // Asumsi koleksi 'users'
                await updateDoc(userDocRef, {
                    fullName: editedFullName,
                    gender: editedGender,
                    phoneNumber: editedPhoneNumber.replace(/^0+/, ""),
                    phoneNumberFull: editedPhoneNumberFull,
                    // Jangan update email dan displayName di sini karena sudah diupdate di Auth
                });
                console.log("Firestore profile updated.");

                setSuccess("Profil berhasil diperbarui!");
                setError(null);
            } else {
                setError("Pengguna tidak ditemukan. Silakan login kembali.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.message || "Terjadi kesalahan saat menyimpan profil.");
            // Handle specific Firebase errors (e.g., email already in use)
            if (error.code === 'auth/email-already-in-use') {
                setError("Email sudah digunakan oleh akun lain.");
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    const storage = getStorage();
    const db = getFirestore();

    const handleEditProfilePicture = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        if (!profilePictureURLRef.current?.files?.[0]) {
            alert("Pilih gambar terlebih dahulu!");
            setLoading(false);
            return;
        }

        const file = profilePictureURLRef.current.files[0];
        const user = auth.currentUser;

        if (!user) {
            setError("Pengguna tidak ditemukan. Silakan login kembali.");
            setLoading(false);
            return;
        }

        const uniqueFilename = `profile_pictures/${user.uid}_${Date.now()}`;
        const newFileRef = ref(storage, uniqueFilename);
        let previousProfilePictureStoragePath = null;

        try {
            // 1. Dapatkan informasi profil pengguna dari Firestore untuk mendapatkan publicId foto profil sebelumnya
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists() && docSnap.data()?.profilePictureStoragePath) {
                previousProfilePictureStoragePath = docSnap.data().profilePictureStoragePath;
                console.log("Path Storage foto profil sebelumnya:", previousProfilePictureStoragePath);
            }

            // 2. Upload foto profil yang baru
            const uploadTask = uploadBytesResumable(newFileRef, file);

            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        // Tambahkan logika UI untuk menampilkan progress jika diperlukan
                    },
                    (error) => {
                        console.error("Error uploading image:", error);
                        setError("Gagal mengunggah gambar!");
                        setLoading(false);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        setProfilePictureURL(downloadURL);

                        // 3. Update informasi foto profil di Firestore
                        await updateDoc(userDocRef, {
                            profilePictureURL: downloadURL,
                            profilePictureStoragePath: uniqueFilename // Simpan path Storage
                        });
                        console.log("Informasi foto profil diperbarui di Firestore.");

                        resolve();
                    }
                );
            });

            // 5. Hapus foto profil sebelumnya dari Storage jika ada dan berbeda dengan yang baru
            if (previousProfilePictureStoragePath && previousProfilePictureStoragePath !== uniqueFilename) {
                const previousFileRef = ref(storage, previousProfilePictureStoragePath);
                try {
                    await deleteObject(previousFileRef);
                    console.log("Foto profil sebelumnya berhasil dihapus:", previousProfilePictureStoragePath);
                } catch (deleteError) {
                    console.error("Gagal menghapus foto profil sebelumnya:", deleteError);
                    // Tidak perlu melempar error di sini karena ini bukan kegagalan utama
                    // Mungkin tambahkan notifikasi atau log ke pengguna/admin
                }
            }

            setSuccess("Foto profil berhasil diperbarui!");
            setError(null);
        } catch (error) {
            console.error("Error during upload or update:", error);
            setError("Gagal mengunggah dan memperbarui foto profil.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleEditProfile} className="relative flex flex-col gap-[24px] px-[20px] py-[28px] xl:py-[64px] xl:px-[120px] xl:flex-row xl:gap-[36px]">
                {loading && <LoadingSpinner />}
                <div className="w-full xl:w-auto">
                    <div>
                        <h1 className="font-poppins font-[600] text-[20px]">Ubah Profil</h1>
                        <h2 className="font-dm-sans font-[400] text-[16px] mt-[10px]">Ubah data diri Anda</h2>
                    </div>
                    <div className="mt-[24px] border border-[#3A35411F] rounded-[10px] p-[20px] bg-white xl:p-[24px]">
                        <div className="flex flex-col gap-[8px]">
                            {arrayButtonDashboard.map((item, index) => (
                                <ButtonDashboard key={index} active={item.active} label={item.label} />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="border border-[#3A35411F] rounded-[10px] bg-white p-[24px] flex flex-col gap-[24px] xl:grow xl:gap-[16px]">
                    <div className="flex gap-[14px]">
                        {/* Foto Profil */}
                        <div className="w-20">
                            {profilePictureURL ? <img src={profilePictureURL} alt="Profile" className="w-full h-20 rounded-[4px]" /> : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            }
                        </div>

                        <div>
                            <div className="font-poppins font-[600] text-[16px] text-[#222325]">{fullName}</div>
                            <div className="font-dm-sans font-[400] text-[16px] text-[#222325]">{email}</div>
                            <label htmlFor="change-profile-picture" className="font-poppins font-[700] text-[14px] text-[#F64920] hover:cursor-pointer">
                                Ganti Foto Profil
                            </label>
                            <input type="file" name="" id="change-profile-picture" className="hidden" ref={profilePictureURLRef} onChange={handleEditProfilePicture} accept="image/png, image/gif, image/jpeg" />
                        </div>
                    </div>

                    <LineHorizontal />

                    <div className="flex flex-col gap-[16px] mt-2">
                        <div className="flex gap-[16px] flex-col xl:flex-row xl:justify-stretch">
                            <InputForEditProfile label="Nama Lengkap" value={fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} disabled={false} />
                            <InputForEditProfile label="E-Mail" value={email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={true} />
                            <InputPhoneNumberEP
                                label="No. Hp"
                                countryCodeValue={countryCode}
                                onCountryCodeChange={(e) => handleInputChange('countryCode', e.target.value)}
                                phoneNumberValue={phoneNumber}
                                onPhoneNumberChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                        </div>
                        <div className="flex gap-[16px] flex-col justify-stretch xl:flex-row">
                            <SelectForEditProfile label="Jenis Kelamin" value={gender} onChange={(e) => handleInputChange('gender', e.target.value)} options={[{ value: "Female", label: "Wanita" }, { value: "Male", label: "Pria" }]} />
                            <InputPasswordEP label="Password" value={password} onChange={(e) => handleInputChange('password', e.target.value)} disable={true}/>
                            <InputPasswordEP label="Konfirmasi Password" value={passwordConfirmation} onChange={(e) => handleInputChange('passwordConfirmation', e.target.value)} disable={true}/>
                        </div>
                    </div>

                    {error && <ValidationFeedback type="error" message={error} />}
                    {success && <ValidationFeedback type="success" message={success} />}

                    <div className="flex justify-end">
                        <div className="w-full xl:w-[13%]">
                            <ButtonLime500 label="Simpan" type="submit" to={null} className=" w-full h-[34px] xl:h-[36px]" />
                        </div>
                    </div>
                </div>

            </form>

            <Footer />
        </div>
    );
}

export default EditProfile;