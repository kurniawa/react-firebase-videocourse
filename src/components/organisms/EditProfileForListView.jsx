import { useEffect, useState } from "react";
import LoadingSpinner from "../molecules/LoadingSpinner";
import InputForEditProfile from "../atoms/InputForEditProfile";
import InputPhoneNumberEP from "../atoms/InputPhoneNumberEP";
import SelectForEditProfile from "../atoms/SelectForEditProfile";
import ValidationFeedback from "../atoms/ValidationFeedback";
import InputPasswordEP from "../atoms/InputPasswordEP";
import ButtonLime500 from "../atoms/ButtonLime500";

const EditProfileForListView = ({userData}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [fullName, setFullName] = useState(userData?.fullName || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [gender, setGender] = useState(userData?.gender || "");
    const [countryCode, setCountryCode] = useState(userData?.countryCode || "");
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
    const [password, setPassword] = useState(userData?.password || "");
    const [passwordConfirmation, setPasswordConfirmation] = useState(userData?.password || "");

    useEffect(() => {
        // Set nilai state berdasarkan data loggedInUser saat komponen mount atau loggedInUser berubah
        if (userData) {
            setFullName(userData.fullName || "");
            setEmail(userData.email || "");
            setGender(userData.gender || "");
            setCountryCode(userData.countryCode || "");
            setPhoneNumber(userData.phoneNumber || "");
            // setProfilePictureStoragePath(userData.profilePictureStoragePath || "");
        }
    }, [userData]);

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

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.");
        if (!confirmDelete) {
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const user = auth.currentUser;
            if (user) {
                // Hapus akun pengguna dari Firebase Authentication
                await deleteUser(user);
                console.log("Akun pengguna berhasil dihapus.");

                // Hapus data pengguna dari Firestore
                const userDocRef = doc(db, 'users', user.uid); // Asumsi koleksi 'users'
                await deleteDoc(userDocRef);
                console.log("Data pengguna berhasil dihapus dari Firestore.");

                setSuccess("Akun dan data berhasil dihapus.");
            } else {
                setError("Pengguna tidak ditemukan. Silakan login kembali.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError(error.message || "Terjadi kesalahan saat menghapus akun.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }

    return (
        <form onSubmit={handleEditProfile} className="relative flex flex-col gap-[24px] px-[20px] py-[28px] xl:py-[64px] xl:px-[120px] xl:flex-row xl:gap-[36px]">
            {loading && <LoadingSpinner />}
            <div className="border border-[#3A35411F] rounded-[10px] bg-white p-[24px] flex flex-col gap-[24px] xl:grow xl:gap-[16px]">
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
                    </div>
                </div>

                {error && <ValidationFeedback type="error" message={error} />}
                {success && <ValidationFeedback type="success" message={success} />}
            </div>
            <div className="flex justify-end gap-1">
                <ButtonLime500 label="Konfirmasi Edit" type="submit" to={null} className="w-full h-[34px] xl:h-[36px] hover:cursor-pointer px-3" />
                <button type="button" className="bg-red-400 text-white rounded-xl px-3 hover:cursor-pointer" onClick={handleDeleteUser}>Hapus</button>
            </div>
        </form>
    );
}

export default EditProfileForListView;