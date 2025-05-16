import { useEffect } from "react";
import Navbar from "../components/organisms/Navbar";
import { useDispatch } from "react-redux";
import { authStateChanged } from "../store/actions/authActions";

export default function MainLayout({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = dispatch(authStateChanged());
        return () => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [dispatch]); // Hanya bergantung pada dispatch agar tidak re-run

    return (
        <div className="relateive min-h-screen flex flex-col">
            <Navbar />
            {children}
        </div>
    );
}