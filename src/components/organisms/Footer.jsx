import LogoFacebook from "../atoms/LogoFacebook";
import LogoInstagram from "../atoms/LogoInstagram";
import LogoLinkedIn from "../atoms/LogoLinkedIn";
import LogoTwitter from "../atoms/LogoTwitter";
import LogoVideobelajar from "../atoms/LogoVideobelajar";
import SiteMap from "./SiteMap";

export default function Footer() {
    
    return (
        <footer className="border-t border-[#3A35411F] p-[20px] xl:py-[60px] xl:px-[120px] bg-white">
            <div className="flex flex-col gap-[16px] xl:flex-row xl:justify-between xl:gap-[0px]">
                {/* Alamat dan Kontak */}
                <section>
                    <LogoVideobelajar className="w-[170px] h-[36px] xl:w-[204px] xl:h-[56px]" />

                    <div className="mt-[16px]">
                        {/* Karena perbedaan font pada saat layar xl dengan layar mobile, jadi salah satu di hide */}
                        <p className="font-open-sans font-[700] text-[14px] xl:hidden">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
                        <p className="hidden font-dm-sans font-[700] text-[18px] xl:block">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
                        <p className="mt-[8px] font-open-sans font-[400] text-[14px] xl:hidden">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
                        <p className="mt-[12px] font-dm-sans font-[400] text-[16px] hidden xl:block">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
                        <p className="mt-[8px] font-open-sans font-[400] text-[14px] xl:hidden">+62-877-7123-1234</p>
                        <p className="mt-[12px] font-dm-sans font-[400] text-[16px] hidden xl:block">+62-877-7123-1234</p>
                    </div>
                </section>

                {/* Informasi Halaman */}
                <SiteMap />
            </div>

            <div className="mt-[16px] w-full h-[1px] border border-[#3A35411F] xl:mt-[63px]"></div>

            {/* Media Sosial */}
            <section className="mt-[16px] flex flex-col gap-[12px] xl:flex-row xl:justify-between xl:items-center">
                <div className="flex gap-[15px] xl:order-2">
                    <LogoLinkedIn width="35" height="35" />
                    <LogoFacebook width="35" height="35" />
                    <LogoInstagram width="35" height="35" />
                    <LogoTwitter width="35" height="35" />
                </div>

                <div className="font-dm-sans font-[500] text-[16px] text-[#333333AD] xl:order-1">@2023 Gerobak Sayur All Rights
                    Reserved.</div>
            </section>
        </footer>
    )
}