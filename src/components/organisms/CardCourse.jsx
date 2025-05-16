import { Link } from "react-router-dom";

export default function CardCourse({courseName, instructorName, instructorRole, price, rating, instructorImageUrl, courseImageUrl}) {
    return (
        <Link to={"#"} className="p-[16px] border border-[#3A35411F] rounded-[10px] bg-white xl:p-[20px]">
            <div className="flex gap-[12px] items-center xl:grid xl:grid-cols-1 xl:gap-[16px]">
                <div className="xl:flex xl:justify-center">
                    <div className="size-[82px] xl:w-full xl:min-h-[193px] rounded-[10px]"
                        style={{ background: `url(${courseImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                </div>

                <div className="flex-grow-1 flex flex-col gap-[8px] xl:flex-none">
                    <h3 className="font-poppins font-[600] text-[#222325] text-[16px] xl:text-[18px]">{courseName}</h3>
                    <div className="flex gap-[8px] items-center w-full">
                        <div className="flex-none">
                            <img src={instructorImageUrl} alt="auditor-1"
                                className="size-[36px] rounded-[10px] xl:size-[40px]" />
                        </div>
                        <div className="flex-grow-1">
                            <div className="font-dm-sans font-[500] text-[14px] text-[#222325] xl:text-[16px]">{instructorName}</div>
                            <div className="font-dm-sans font-[400] text-[12px] text-[#333333AD] xl:text-[14px]">{instructorRole}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[8px] flex justify-between items-center xl:mt-[16px]">
                <div className="flex items-center gap-[8px]">
                    <div className="flex">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <path
                                d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                                fill="#FCE91B" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <path
                                d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                                fill="#FCE91B" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <mask id="mask0_10446_1089" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0"
                                y="0" width="18" height="18">
                                <path
                                    d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                                    fill="black" />
                            </mask>
                            <g mask="url(#mask0_10446_1089)">
                                <rect width="9" height="18" fill="#FCE91B" />
                                <rect x="9" width="9" height="18" fill="#3A3541" fillOpacity="0.12" />
                            </g>
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <path
                                d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                                fill="#3A3541" fillOpacity="0.12" />
                        </svg>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg" className="">
                            <path
                                d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
                                fill="#3A3541" fillOpacity="0.12" />
                        </svg>
                    </div>
                    <span className="font-dm-sans text-[12px] font-[500] text-[#333333AD] xl:text-[14px]">{rating} (86)</span>
                </div>
                <span className="font-poppins font-[600] text-[20px] text-[#3ECF4C] xl:text-[24px]">Rp {price}K</span>
            </div>
        </Link>
    )
}