import { useEffect, useState } from "react";
import LoadingSpinner from "../molecules/LoadingSpinner";
import InputForEditProfile from "../atoms/InputForEditProfile";
import InputPhoneNumberEP from "../atoms/InputPhoneNumberEP";
import SelectForEditProfile from "../atoms/SelectForEditProfile";
import ValidationFeedback from "../atoms/ValidationFeedback";
import InputPasswordEP from "../atoms/InputPasswordEP";
import ButtonLime500 from "../atoms/ButtonLime500";
import { deleteUser, editUser, fetchData } from "../../store/actions/dataActions";
import { useDispatch } from "react-redux";

const EditProfileForListView = ({ userData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [uid, setUID] = useState(userData?.uid || "");
    const [fullName, setFullName] = useState(userData?.fullName || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [gender, setGender] = useState(userData?.gender || "");
    const [countryCode, setCountryCode] = useState(userData?.countryCode || "");
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
    const [password, setPassword] = useState(userData?.password || "");
    const [passwordConfirmation, setPasswordConfirmation] = useState(userData?.password || "");

    const dispatch = useDispatch();

    useEffect(() => {
        // Set nilai state berdasarkan data loggedInUser saat komponen mount atau loggedInUser berubah
        if (userData) {
            setUID(userData.uid || "");
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

        const editedPhoneNumberFull = `${countryCode}${phoneNumber.replace(/^0+/, "")}`;

        if (!fullName || !email || !gender || !countryCode || !phoneNumber) {
            setError("Semua kolom wajib diisi!");
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Format email tidak valid");
            setLoading(false);
            return;
        }

        try {
            const editedUserData = {
                fullName,
                email,
                gender,
                countryCode,
                phoneNumber,
                phoneNumberFull: editedPhoneNumberFull,
            }

            await dispatch(editUser(uid, editedUserData));
            setSuccess("User berhasil diperbarui!");

            // Panggil ulang fetchData untuk memperbarui daftar user
            dispatch(fetchData('users'));
        } catch (err) {
            setError(err.message || "Gagal memperbarui user.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    const handleDeleteUser = async (uid) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.");
        if (!confirmDelete) {
            return;
        }

        try {
            await dispatch(deleteUser(uid));
            // Jika berhasil, state Redux akan otomatis terupdate dan UI akan refresh
            alert('User berhasil dihapus!'); // Gunakan modal kustom di produksi
            // Panggil ulang fetchData untuk memperbarui daftar user
            dispatch(fetchData('users'));
        } catch (err) {
            alert(`Gagal menghapus user: ${err.message}`); // Gunakan modal kustom di produksi
        } finally {
            setLoading(false);
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
                <button type="button" className="bg-red-400 text-white rounded-xl px-3 hover:cursor-pointer" onClick={() => handleDeleteUser(uid)}>Hapus</button>
            </div>
        </form>
    );
}

export default EditProfileForListView;