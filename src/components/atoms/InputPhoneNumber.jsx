import { forwardRef } from "react";

const InputPhoneNumber = forwardRef(
    ({label, required}, ref) => {
        return (
            <div>
                <label htmlFor="no-hp">
                    <span className="font-dm-sans font-[400] text-[14px] text-[#333333AD] xl:text-[16px]">{label}</span>
                    {required && <span className="ml-[4px] text-[#FF5C2B]">*</span>}
                </label>
                <div className="flex gap-[12px]">
                    <div className="flex rounded-md border border-[#3A35411F]">
                        <div className="flex items-center align-center px-[10px] py-[4px] bg-[#F4F5FA]">
                            <div className="flex flex-col w-[24px] h-[24px]">
                                <div className="w-full h-1/2 bg-[#E70011]"></div>
                                <div className="w-full h-1/2 bg-white"></div>
                            </div>
                        </div>
                        <select name="country-code" id="country-code" ref={(el) => (ref.current.countryCode = el)} className="rounded-r-md px-[10px] py-[4px] min-w-[70px] h-[48px] text-[#222325]">
                            <option value="62">+62</option>
                        </select>
                    </div>
        
                    <input id="no-hp" type="text" ref={(el) => (ref.current.phoneNumber = el)} className="rounded-md px-[10px] py-[4px] w-full h-[48px] border border-[#3A35411F]" />
                </div>
            </div>
        )
    }
)

export default InputPhoneNumber;