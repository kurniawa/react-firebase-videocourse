import { Link, useNavigate } from "react-router-dom";
import InputPhoneNumber from "../atoms/InputPhoneNumber.jsx";
import InputPassword from "../atoms/InputPassword.jsx";
import InputWithLabel from "../atoms/InputWithLabel.jsx";
import SelectWithLabel from "../atoms/SelectWithLabel.jsx";
import ButtonGoogle from "../atoms/ButtonGoogle.jsx";
import ButtonLime500 from "../atoms/ButtonLime500.jsx";
import ButtonGreen200 from "../atoms/ButtonGreen200.jsx";
import LineHorizontalWithLabel from "../atoms/LineHorizontalWithLabel.jsx";
import { useRef, useState } from "react";
import LoadingSpinner from "../molecules/LoadingSpinner.jsx";
import ValidationFeedback from "../atoms/ValidationFeedback.jsx";

// Import Firebase Auth dan Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig.js";

export default function RegisterForm() {

    // console.log(auth, db);
    
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const genderRef = useRef(null);
    const phoneNumberRef = useRef({});
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

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
        
        try {
            // Cek apakah nomor telepon sudah terdaftar di Firestore
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("phoneNumberFull", "==", phoneNumberFull));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setError("Nomor telepon sudah terdaftar");
                setLoading(false);
                return;
            }

            // 1. Buat user dengan email dan password menggunakan Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Simpan data pengguna tambahan ke Firestore
            const usersCollectionRef = collection(db, "users");
            await setDoc(doc(usersCollectionRef, user.uid), {
                uid: user.uid,
                fullName,
                email,
                password,
                gender,
                countryCode,
                phoneNumber: phoneNumberTrimmedFrontZero,
                phoneNumberFull,
                role: "USER",
                profilePictureURL: "", // Inisialisasi path gambar profil
                profilePictureStoragePath: "", // Inisialisasi path gambar profil
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            setSuccess("Pendaftaran berhasil! Silakan login.");

            // Setelah registrasi berhasil, lakukan sign out
            await auth.signOut();

            setTimeout(() => {
                navigate("/login");
                setLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Error during registration:", error);
            let errorMessage = "Terjadi kesalahan saat mendaftar.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email sudah terdaftar.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Format email tidak valid.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password terlalu lemah.";
            }
            setError(errorMessage);
        } finally {
            setTimeout(() => {
                setLoading(false);
                
            }, 1500);
        }

    };

    return (
        <form onSubmit={handleRegister} className="relative rounded-sm bg-white p-[20px] xl:w-[590px] border border-[#F1F1F1]">
            {loading && <LoadingSpinner />}
            <div className="text-center">
                <h1 className="font-poppins text-[24px] font-[600] text-[#222325] xl:text-[32px]">Pendaftaran Akun</h1>
                <p className="mt-[10px] font-dm-sans text-[14px] font-[400] text-[#333333AD] xl:text-[16px]">Yuk, daftarkan akunmu sekarang juga!</p>
            </div>

            

            <div className="mt-[20px] flex flex-col gap-[12px]">
                <InputWithLabel type="text" id="nama-lengkap" name="Nama Lengkap" required={true} ref={fullNameRef} />
                <InputWithLabel type="email" id="e-mail" name="E-Mail" required={true} ref={emailRef} />
                <SelectWithLabel type="select" id="jenis-kelamin" name="Jenis Kelamin" options={[{value:"Female", label:"Wanita"}, {value:"Male", label:"Pria"}]} required={true} ref={genderRef} />
                <InputPhoneNumber label="No. HP" required={true} ref={phoneNumberRef} />
                <InputPassword id="kata-sandi" name="Kata Sandi" required={true} ref={passwordRef} />
                <InputPassword id="konfirmasi-kata-sandi" name="Konfirmasi Kata Sandi" required={true} ref={passwordConfirmationRef} />

                <div className="flex justify-end">
                    <Link to={'#'} className="font-dm-sans font-[400] text-[14px] text-[#333333AD] xl:text-[16px]">Lupa Password?</Link>
                </div>
            </div>

            {error && <ValidationFeedback type="error" message={error} />}
            {success && <ValidationFeedback type="success" message={success} />}

            <div className="space-y-[16px] mt-[20px] xl:mt-[24px]">
                <ButtonLime500 type="submit" label="Daftar" to={null} className=" w-full h-[34px] xl:h-[42px]" />
                <ButtonGreen200 type="button" label="Masuk" to='/login' />
            </div>

            <div className="mt-[20px] xl:mt-[24px]">
                <LineHorizontalWithLabel label="atau" />
            </div>
    
            <div className="mt-[20px] xl:mt-[24px]">
                <ButtonGoogle type="button" label="Daftar dengan Google" />
            </div>

        </form>
    )
}