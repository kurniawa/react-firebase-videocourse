import { useState } from "react";

const InputPasswordEP = ({ label, value, onChange, disable }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <div className="relative group">
                <label className="absolute -top-3 left-2 bg-white px-1 group-focus-within:text-[#3ECF4C]">
                    <span className="font-dm-sans font-[400] text-[14px] font-color-333333AD xl:text-[16px]">
                        {label}
                    </span>
                </label>
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    disabled={disable}
                    className="rounded-md px-[10px] py-[4px] w-full h-[48px] border border-[#3A35411F] focus:border-[#3ECF4C] focus:outline-none focus:ring-0"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="size-[24px] text-slate-300 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                >
                    {showPassword ? (
                        <svg
                            viewBox="0 0 22 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-full"
                        >
                            <path
                                d="M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 10.3261 15.4732 11.5979 14.5355 12.5355C13.5979 13.4732 12.3261 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 7.67392 6.52678 6.40215 7.46447 5.46447C8.40215 4.52678 9.67392 4 11 4ZM11 2C5 2 0.73 5.11 0 9C0.73 12.89 5 16 11 16C17 16 21.27 12.89 22 9C21.27 5.11 17 2 11 2ZM11 12C11.7956 12 12.5587 11.6839 13.1213 11.1213C13.6839 10.5587 14 9.79565 14 9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6C10.2044 6 9.44129 6.31607 8.87868 6.87868C8.31607 7.44129 8 8.20435 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12Z"
                                fill="#3A3541"
                                fillOpacity="0.38"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 22 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-full"
                        >
                            <path
                                d="M10.83 6L14 9.16V9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6H10.83ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z"
                                fill="#3A3541"
                                fillOpacity="0.38"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}

export default InputPasswordEP;
