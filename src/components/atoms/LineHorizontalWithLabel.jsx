export default function LineHorizontalWithLabel({label}) {
    return (
        <div className="flex justify-center items-center gap-[10px]">
            <div className="flex-grow-1 h-[1px] bg-[#F1F1F1]"></div>
            <span className="font-dm-sans font-[400] text-[14px] xl:text-[16px] text-[#4A505C]">{label}</span>
            <div className="flex-grow-1 h-[1px] bg-[#F1F1F1]"></div>
        </div>
    )
    
}