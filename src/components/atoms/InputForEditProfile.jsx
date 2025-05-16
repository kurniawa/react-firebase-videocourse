const InputForEditProfile = (({label, value, onChange, disabled}) => {
  return (
    <div className="relative group w-full">
        <label htmlFor="" className="absolute font-dm-sans font-[500] text-[14px] bg-white -top-3 left-2 px-1 text-[#333333AD] group-focus-within:text-[#3ECF4C]">{label}</label>
        <input type="text" value={value} onChange={onChange} disabled={disabled} className="rounded-[10px] border border-[#3A35411F] p-[12px] font-open-sans font-[400] text-[#222325] text-[16px] focus:border-[#3ECF4C] focus:outline-none focus:ring-0 w-full" />
    </div>
  )
})

export default InputForEditProfile;