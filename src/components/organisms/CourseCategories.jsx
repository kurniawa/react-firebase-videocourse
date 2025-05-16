import { Link } from "react-router-dom"

export default function CourseCategories() {
    const course_categories = [
        {
            name: "Semua Kelas",
            active: true,
        },
        {
            name: "Pemasaran",
            active: false,
        },
        {
            name: "Desain",
            active: false,
        },
        {
            name: "Pengembangan Diri",
            active: false,
        },
        {
            name: "Bisnis",
            active: false,
        }
    ]
    return (
        <ul className="flex font-dm-sans text-[14px] font-[500] overflow-x-hidden whitespace-nowrap">
            {course_categories.map((course_category, index) => (
                <li key={index} className="py-[12px] pr-[36px] h-[60px] flex">
                    <Link to={"#"} className="flex flex-col justify-between">
                        <div className={`font-dm-sans text-[14px] font-[500] ${course_category.active ? 'text-[#F64920]' : 'text-[#333333AD]'} xl:text-[16px]`}>{course_category.name}</div>
                        {course_category.active && <div className="underline"></div>}
                    </Link>
                </li>
            ))}
        </ul>
    )
}