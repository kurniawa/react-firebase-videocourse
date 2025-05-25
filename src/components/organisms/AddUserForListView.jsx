import InputPhoneNumber from "../atoms/InputPhoneNumber.jsx";
import InputPassword from "../atoms/InputPassword.jsx";
import InputWithLabel from "../atoms/InputWithLabel.jsx";
import SelectWithLabel from "../atoms/SelectWithLabel.jsx";
import ButtonLime500 from "../atoms/ButtonLime500.jsx";
import { useRef, useState } from "react";
import LoadingSpinner from "../molecules/LoadingSpinner.jsx";
import ValidationFeedback from "../atoms/ValidationFeedback.jsx";
import { useDispatch } from "react-redux";
import { addUser, fetchData } from "../../store/actions/dataActions.js";

export default function AddUserForListView() {
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const genderRef = useRef('Female');
    const phoneNumberRef = useRef({});
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        // console.log("Full Name:", fullNameRef.current?.value);
        // console.log("Email:", emailRef.current?.value);
        // console.log("Gender:", genderRef.current?.value);
        // console.log("Country Code:", phoneNumberRef.current?.countryCode.value);
        // console.log("Phone Number:", phoneNumberRef.current?.phoneNumber.value);
        // console.log("Password:", passwordRef.current?.value);
        // console.log("Password Confirmation:", passwordConfirmationRef.current?.value);

        // Mengambil data dari input
        const fullName = fullNameRef.current?.value?.trim() || "";
        const email = emailRef.current?.value?.trim() || "";
        const gender = genderRef.current?.value?.trim() || "";
        const countryCode = phoneNumberRef.current?.countryCode.value?.trim() || "";
        const phoneNumber = phoneNumberRef.current?.phoneNumber.value?.trim() || "";
        const password = passwordRef.current?.value; // Jangan trim password
        const passwordConfirmation = passwordConfirmationRef.current?.value; // Jangan trim password
        let phoneNumberFull = "";

        // console.log(password?.length);
        // return;
        // Validation
        if (!fullName || !email || !gender || !countryCode || !phoneNumber || !password || !passwordConfirmation) {
            console.log(fullName, email, gender, countryCode, phoneNumber, password, passwordConfirmation);
            setError("Semua kolom wajib diisi!");
            setLoading(false);
            return;
        }
        
        if (password?.length < 8) {
            setError("Password minimal 8 karakter");
            setLoading(false);
            return;
        }

        if (password !== passwordConfirmation) {
            setError("Password dan Konfirmasi Password tidak sama");
            setLoading(false);
            return;
        }

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Format email tidak valid");
            setLoading(false);
            return;
        }

        // Validasi nomor telepon
        let phoneNumberTrimmedFrontZero = "";
        // Hilangkan angka 0 di depan nomor telepon
        phoneNumberTrimmedFrontZero = phoneNumber.replace(/^0+/, "");

        phoneNumberFull = `${countryCode}${phoneNumberTrimmedFrontZero}`;
        
        // Buat objek data user
        const userData = {
            fullName,
            email,
            gender,
            countryCode,
            phoneNumber,
            phoneNumberFull,
            password,
            role: 'user', // Atur peran default
        };
        
        try {
            // Dispatch action addUser
            await dispatch(addUser(userData));
            setSuccess("User berhasil ditambahkan.");
            setLoading(false);
            // Reset form
            fullNameRef.current.value = '';
            emailRef.current.value = '';
            genderRef.current.value = 'Female';
            phoneNumberRef.current.value = '';
            passwordRef.current.value = '';
            passwordConfirmationRef.current.value = '';
            // navigate('/users');

            // Setelah user berhasil ditambahkan, panggil ulang fetchData untuk memperbarui daftar user
            dispatch(fetchData('users'));
        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat menambahkan user.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="relative rounded-sm bg-white p-[20px] xl:w-[590px] border border-[#F1F1F1]">
            {loading && <LoadingSpinner />}
            <div className="text-center">
                <h1 className="font-poppins text-[24px] font-[600] text-[#222325] xl:text-[32px]">Tambah User Baru</h1>
            </div>

            <div className="mt-[20px] flex flex-col gap-[12px]">
                <InputWithLabel type="text" id="nama-lengkap" name="Nama Lengkap" required={true} ref={fullNameRef} />
                <InputWithLabel type="email" id="e-mail" name="E-Mail" required={true} ref={emailRef} />
                <SelectWithLabel type="select" id="jenis-kelamin" name="Jenis Kelamin" options={[{value:"Female", label:"Wanita"}, {value:"Male", label:"Pria"}]} required={true} ref={genderRef} />
                <InputPhoneNumber label="No. HP" required={true} ref={phoneNumberRef} />
                <InputPassword id="kata-sandi" name="Kata Sandi" required={true} ref={passwordRef} />
                <InputPassword id="konfirmasi-kata-sandi" name="Konfirmasi Kata Sandi" required={true} ref={passwordConfirmationRef} />
            </div>

            {error && <ValidationFeedback type="error" message={error} />}
            {success && <ValidationFeedback type="success" message={success} />}

            <div className="space-y-[16px] mt-[20px] xl:mt-[24px]">
                <ButtonLime500 type="submit" label="Tambah User" to={null} className=" w-full h-[34px] xl:h-[42px]" />
            </div>

        </form>
    )
}