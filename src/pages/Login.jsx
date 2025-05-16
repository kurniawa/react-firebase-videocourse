import { useNavigate } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import ValidationFeedback from "../components/atoms/ValidationFeedback";
import LoadingSpinner from "../components/molecules/LoadingSpinner";
// import { auth } from "../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { authStateChanged } from "../store/actions/authActions";
import { auth } from "../config/firebaseConfig";

function Login() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isAuthChecked, setIsAuthChecked] = useState(false); // State untuk menandakan bahwa pemeriksaan auth awal selesai

    useEffect(() => {
        // Memantau perubahan status autentikasi saat komponen App pertama kali mount
        const unsubscribe = dispatch(authStateChanged(() => setIsAuthChecked(true)));
    
        // Opsional: Fungsi cleanup untuk unsubscribe listener saat komponen unmount
        return () => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
      }, [dispatch]);
    
      useEffect(() => {
        // console.log("isAuthChecked:", isAuthChecked);
        // console.log("isAuthenticated:", isAuthenticated);
        if (isAuthChecked && isAuthenticated) {
            setError('Anda telah login. Anda akan dialihkan.');
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        }
      }, [isAuthChecked, isAuthenticated, navigate]);

    return (
        <MainLayout>
            <div>
                {error && (
                    <>
                        <div className="flex justify-center">
                            <ValidationFeedback type="error" message={error} />
                        </div>
                        <LoadingSpinner />
                    </>
                )}
            </div>
            <main className="px-[20px] py-[28px] flex justify-center xl:py-[64px] xl:px-[120px]">
                {!isAuthenticated && <LoginForm />} {/* Tampilkan LoginForm hanya jika belum login */}
            </main>
        </MainLayout>
    );
}

export default Login;