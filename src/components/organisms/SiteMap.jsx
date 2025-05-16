import { useState } from "react"
import { Link } from "react-router-dom"


export default function SiteMap() {
    const [isExpanded, setIsExpanded] = useState(false)
    const [key, setKey] = useState(0)

    const toggleExpanded = (key) => {
        setIsExpanded(!isExpanded)
        setKey(key)
    }

    const sites = [
        {
            category: "Kategori", 
            child: [
                {label: 'Digital & Teknologi', path: "#"},
                {label: 'Pemasaran', path: "#"},
                {label: 'Manajemen Bisnis', path: "#"},
                {label: 'Pengembangan Diri', path: "#"},
                {label: 'Desain', path: "#"}
            ] 
        },
        { 
            category: "Perusahaan", 
            child: [
                {label: 'Tentang Kami', path: "#"},
                {label: 'FAQ', path: "#"},
                {label: 'Kebijakan Privasi', path: "#"},
                {label: 'Ketentuan Layanan', path: "#"},
                {label: 'Bantuan', path: "#"},
            ] 
        },
        { 
            category: "Komunitas",
            child: [
                {label: 'Tips Sukses', path: "#"},
                {label: 'Blog', path: "#"},
            ] 
        },
    ]

    return (
        <section>
            <ul className="flex flex-col gap-[12px] xl:flex-row xl:gap-[48px]">
                {sites.map((site, index) => (
                    <li key={index} className="relative">
                        <div className="flex justify-between xl:grid xl:grid-cols-1 xl:gap-[15px] xl:content-start">
                            <div className="font-open-sans text-[#222325] font-[700] text-[16px]">{site.category}</div>
                            <ul className="hidden font-dm-sans font-[500] text-[#333333AD] text-[16px] xl:grid xl:grid-cols-1 xl:gap-[15px]">
                                {site.child.map((child, index) => (
                                    <li key={index}><Link to={child.path}>{child.label}</Link></li>
                                ))}
                            </ul>
                            {isExpanded && key === index &&
                            <ul className="absolute -top-2 right-7 bg-white shadow-lg rounded-[10px] xl:hidden" style={{ boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.25)' }}>
                                {site.child.map((child, i) => (
                                    <li key={i}><Link to={child.path} className="relative z-10 block p-2 hover:bg-slate-100">{child.label}</Link></li>
                                ))}
                            </ul>
                            }
                            <button type="button" className="xl:hidden hover:cursor-pointer" onClick={() => toggleExpanded(index)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                                        fill="#3A3541" fillOpacity="0.54" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}