import { useNavigate } from "react-router-dom";
import EditProfile from "../components/organisms/EditProfile";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import ValidationFeedbackWithSpinner from "../components/molecules/ValidationFeedbackWithSpinner";
import { useDispatch, useSelector } from "react-redux";
import { authStateChanged, fetchUserProfile } from "../store/actions/authActions";

function Dashboard({type}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isAuthChecked, setIsAuthChecked] = useState(true); // State untuk menandakan bahwa pemeriksaan auth awal selesai
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const [loading, setLoading] = useState(true); // Loading awal saat memeriksa status auth
    const [error, setError] = useState(null); // Error jika ada saat memuat data profil

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
    if (!isAuthChecked && isAuthenticated) {
        setError('Anda harus login untuk mengakses halaman ini.');
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    }
    }, [isAuthChecked, isAuthenticated, navigate]);

    // if (loading) {
    //     return <div>Loading authentication status...</div>;
    // }

    // if (profileLoading) {
    //     return <div>Loading profile data...</div>;
    // }

    // if (profileError) {
    //     return <div>Error loading profile: {profileError}</div>;
    // }

    return (
        <MainLayout>
            <main>
                {error && <ValidationFeedbackWithSpinner type="error" message={error} />}
                {isAuthenticated && <EditProfile type={type} />}
            </main>
        </MainLayout>
    );
}

export default Dashboard;
