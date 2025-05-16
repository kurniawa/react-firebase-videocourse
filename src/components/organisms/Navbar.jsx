import HamburgerMenu from "../molecules/HamburgerMenu";
import LogoVideobelajar from "../atoms/LogoVideobelajar";
import NavbarMenu from "../molecules/NavbarMenu";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
    // const dispatch = useDispatch();
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const [isAuthChecked, setIsAuthChecked] = useState(false); // State untuk menandakan bahwa pemeriksaan auth awal selesai

    // useEffect(() => {
    //     // Memantau perubahan status autentikasi saat komponen App pertama kali mount
    //     const unsubscribe = dispatch(authStateChanged(() => setIsAuthChecked(true)));
    
    //     // Opsional: Fungsi cleanup untuk unsubscribe listener saat komponen unmount
    //     return () => {
    //         if (unsubscribe && typeof unsubscribe === 'function') {
    //             unsubscribe();
    //         }
    //     };
    //   }, [dispatch]);
    
    //   useEffect(() => {
    //     console.log("isAuthChecked:", isAuthChecked);
    //     console.log("isAuthenticated:", isAuthenticated);
    //     if (isAuthChecked && isAuthenticated) {
    //         setError('Anda telah login. Anda akan dialihkan.');
    //         setTimeout(() => {
    //             // navigate("/dashboard");
    //         }, 1500);
    //     }
    //   }, [isAuthChecked, isAuthenticated, navigate]);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // console.log("isAuthenticated:", isAuthenticated);

    let options = [
        { label: "Kategori", path: "/", className: "font-color-333333AD" },
        { label: "List View", path: "/list-view", className: "font-color-333333AD" },
        { label: "Login", path: "/login", className: "bg-[#3ECF4C] text-white" },
        { label: "Register", path: "/register", className: "border border-[#3ECF4C] text-[#3ECF4C]"},
    ];

    if (isAuthenticated) {
        options = [
            { label: "Kategori", path: "/", className: "font-color-333333AD" },
            { label: "List View", path: "/list-view", className: "font-color-333333AD" },
            { label: "Dashboard", path: "/dashboard", className: "bg-[#3ECF4C] text-white"},
            { label: "Log out", path: "/logout", className: "border border-[#3ECF4C] text-[#3ECF4C]"},
        ];
    }

    return (
      <nav className="flex bg-white h-[74px] py-[16px] px-[24px] justify-between items-center xl:gap-[36px] border-t border-b border-[#F1F1F1] shadow-lg shadow-[rgba(62,67,74,0.15)]">
        <div className="flex flex-grow-1 justify-between items-center">
            <LogoVideobelajar className="w-[145px] h-[23px] xl:w-[194px] xl:h-[31px]" />
        </div>

        <div className="hidden xl:flex xl:gap-[16px]">
            <NavbarMenu options={options} />
        </div>
        
        {/* Hamburger Menu untuk layar kecil */}

        <div className="xl:hidden">
          <HamburgerMenu className="w-[24px] h-[24px] text-[#4A505C]"
            options={options}>
          </HamburgerMenu>
        </div>
        {/* <div className="w-[24px] h-[24px] xl:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div> */}
    </nav>
    );
}
  