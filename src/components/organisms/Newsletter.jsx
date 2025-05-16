export default function Newsletter() {
    return (
        <div className="flex justify-center items-center h-[400px] w-full rounded-sm px-[20px]" style={{
            boxShadow: '0px 12px 45px -10px rgba(0, 59, 222, 0.2)',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(src/assets/images/newsletter.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden'
        }}>
            <div>
                <div className="text-center">
                    <span className="font-dm-sans text-[16px] font-[500] text-white text-center xl:text-[18px]">NEWSLETTER</span>
                </div>
                <div className="mt-[4px] text-center">
                    <h1 className="font-poppins font-[600] text-[24px] text-white xl:text[32px]">Mau Belajar Lebih Banyak?</h1>
                    <p className="font-dm-sans font-[400] text-[14px] text-white mt-[10px] xl:text-[16px]">Daftarkan dirimu untuk
                        mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com
                    </p>
                </div>

                <div className="mt-[40px] flex flex-col gap-[16px] xl:flex-row xl:gap-[20px] xl:py-[8px] xl:pl-[32px] xl:pr-[8px] xl:bg-white xl:rounded-[10px]">
                    <input type="email" className="py-[10px] w-full rounded-[10px] font-dm-sans font-[400] text-[14px] text-[#333333AD] bg-white text-center xl:text-[16px] xl:text-left xl:p-0 xl:rounded-none" placeholder="Masukkan Emailmu" />
                    <button className="py-[10px] w-full rounded-[10px] font-dm-sans text-[14px] font-[700] text-white bg-[#FFBD3A] xl:w-auto xl:px-[26px] xl:text-[16px] hover:cursor-pointer">Subscribe</button>
                </div>
            </div>
        </div>
    )
}