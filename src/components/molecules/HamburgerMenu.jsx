import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

export default function HamburgerMenu({className, options}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        setLoading(true);
        try {
          // Dispatch action logout yang akan menangani signOut dari Firebase dan membersihkan state Redux
          await dispatch(logout());
          // Setelah action logout selesai (berhasil), kita bisa langsung melakukan navigasi
          navigate("/login");
        } catch (error) {
          console.error("Gagal logout:", error);
          // Tampilkan pesan error kepada pengguna
        } finally {
          setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingSpinner />}

            <button className={className} onClick={() => setMenuOpen(!menuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                    stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-16 right-4 bg-white shadow-lg w-40 flex flex-col border border-[#3A35411F] z-10">
                {options.map((option, index) => {
                    if (option.label === "Log out") {
                        return (
                            <button key={index} onClick={handleLogout}
                                className={`px-[12px] py-[16px] text-gray-700 border-[#3A35411F] hover:bg-gray-100 text-left hover:cursor-pointer${(index == options.length - 1) ? '' : ' border-b'}`}>
                                {option.label}
                            </button>
                        )
                    }
                    return (
                        <Link
                        key={index}
                        to={option.path}
                        className={`px-[12px] py-[16px] text-gray-700 border-[#3A35411F] hover:bg-gray-100${(index == options.length - 1) ? '' : ' border-b'}`}
                        onClick={() => setMenuOpen(false)}
                        >
                        {option.label}
                        </Link>
                    )
                })}
                </div>
            )}
        </>
    )
} 