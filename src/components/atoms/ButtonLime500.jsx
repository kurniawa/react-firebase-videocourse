import { Link } from 'react-router-dom';

export default function ButtonLime500({type, label, to, className}) {
    return (
        <>
            {to ? (
                <Link to={to} className={`rounded-[10px] bg-[#3ECF4C] flex items-center justify-center${className}`}>
                    <span className="font-dm-sans font-[700] text-[14px] text-white xl:text-[16px]">{label}</span>
                </Link>
            ) : (
                <button type={type} className={`rounded-[10px] bg-[#3ECF4C] hover:cursor-pointer${className}`}>
                    <span className="font-dm-sans font-[700] text-[14px] text-white xl:text-[16px]">{label}</span>
                </button>
            )}
        </>
    )
}