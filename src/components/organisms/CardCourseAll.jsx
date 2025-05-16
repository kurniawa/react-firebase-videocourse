import CardCourse from "./CardCourse"

export default function CardCourseAll() {
    const courseData = [
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-1.jpg',
            instructorImageUrl: '/images/auditor-1.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-2.jpg',
            instructorImageUrl: '/images/auditor-2.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-3.jpg',
            instructorImageUrl: '/images/auditor-3.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-4.jpg',
            instructorImageUrl: '/images/auditor-4.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-5.jpg',
            instructorImageUrl: '/images/auditor-5.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-6.jpg',
            instructorImageUrl: '/images/auditor-6.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-7.jpg',
            instructorImageUrl: '/images/auditor-1.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-8.jpg',
            instructorImageUrl: '/images/auditor-8.png'
        },
        {
            courseName: 'Big 4 Auditor Financial Analyst',
            instructorName: 'Jaenna Ortega',
            instructorRole: 'Senior Accountant',
            price: 300,
            rating: 3.5,
            courseImageUrl: '/images/class-9.jpg',
            instructorImageUrl: '/images/auditor-9.png'
        },
        
    ]

    return (
        <>
            {courseData.map((course, index) => (<CardCourse key={index} {...course} />))}
        </>
    )
}