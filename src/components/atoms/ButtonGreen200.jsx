import { Link } from "react-router-dom"

export default function ButtonGreen200({type, label, to}) {
    return (
        <>
            {to ? (
                <Link to={to} className="rounded-[10px] w-full h-[34px] bg-[#E2FCD9CC] flex items-center justify-center">
                    <span className="font-dm-sans font-[700] text-[14px] xl:text-[16px] text-[#3ECF4C]">{label}</span>
                </Link>
            ) : (
                <button type={type} className="rounded-[10px] w-full h-[34px] bg-[#E2FCD9CC] hover:cursor-pointer">
                    <span className="font-dm-sans font-[700] text-[14px] xl:text-[16px] text-[#3ECF4C]">{label}</span>
                </button>
            )}
        </>
    )
}