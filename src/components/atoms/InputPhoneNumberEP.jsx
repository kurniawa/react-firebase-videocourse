import InputForEditProfile from "./InputForEditProfile";

const InputPhoneNumberEP = ({label, countryCodeValue, onCountryCodeChange, phoneNumberValue, onPhoneNumberChange}) => {
    return (
        <div className="flex gap-[12px] w-full">
            <div className="flex rounded-md border border-[#3A35411F]">
                <select name="country-code" value={countryCodeValue} onChange={onCountryCodeChange} className="rounded-r-md px-[10px] py-[4px] min-w-[70px] h-[48px] text-[#222325]">
                    <option value="62">+62</option>
                </select>
            </div>
            <InputForEditProfile label={label} value={phoneNumberValue} onChange={onPhoneNumberChange} />
        </div>
    )
}


export default InputPhoneNumberEP;