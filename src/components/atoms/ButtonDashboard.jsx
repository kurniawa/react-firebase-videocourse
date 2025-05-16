const ButtonDashboard = ({ active, label }) => {

    let classButton = "text-[#3A354161]";
    if (active) {
        classButton = "border border-[#FFBD3A] bg-[#FFF7D7CC] text-[#FFBD3A]";
    }
    return (
        <button type="button" className={`${classButton} p-[12px] flex gap-[12px] rounded-[4px] w-full hover:cursor-pointer`}>
            <div className="flex items-center justify-center size-[24px]">
                {label === "Profil Saya" &&
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                    </svg>
                }
                {label === "Kelas Saya" &&
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V2C16 0.9 15.1 0 14 0ZM2 2H7V10L4.5 8.5L2 10V2Z" fill="currentColor"/>
                    </svg>
                }

                {label === "Pesanan Saya" &&
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.21 6.99953L11.83 0.439531C11.64 0.159531 11.32 0.0195312 11 0.0195312C10.68 0.0195312 10.36 0.159531 10.17 0.449531L5.79 6.99953H1C0.45 6.99953 0 7.44953 0 7.99953C0 8.08953 0.00999996 8.17953 0.04 8.26953L2.58 17.5395C2.81 18.3795 3.58 18.9995 4.5 18.9995H17.5C18.42 18.9995 19.19 18.3795 19.43 17.5395L21.97 8.26953L22 7.99953C22 7.44953 21.55 6.99953 21 6.99953H16.21ZM8 6.99953L11 2.59953L14 6.99953H8ZM11 14.9995C9.9 14.9995 9 14.0995 9 12.9995C9 11.8995 9.9 10.9995 11 10.9995C12.1 10.9995 13 11.8995 13 12.9995C13 14.0995 12.1 14.9995 11 14.9995Z" fill="currentColor"/>
                    </svg>
                }
            </div>
            <span className="font-dm-sans font-[700] text-[18px]">{label}</span>
        </button>
    );
}

export default ButtonDashboard;