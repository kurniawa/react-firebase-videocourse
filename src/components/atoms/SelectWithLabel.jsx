import { forwardRef } from "react"

const SelectWithLabel = forwardRef(({id, name, options, required}, ref) => {
    return (
        <div>
            <label htmlFor={id}>
                <span className="font-dm-sans font-[400] text-[14px] font-color-333333AD xl:text-[16px]">{name}</span>
                {required && <span className="ml-[4px] text-[#FF5C2B]">*</span>}
            </label>
            <select id="jenis-kelamin" ref={ref} className="rounded-md px-[10px] py-[4px] w-full h-[48px] border border-[#3A35411F] text-[#222325]">
                {options.map((option, index) => (<option value={option.value} key={index}>{option.label}</option>))}
            </select>
        </div>
    )
})

export default SelectWithLabel;