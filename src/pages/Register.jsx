import RegisterForm from "../components/organisms/RegisterForm"
import MainLayout from "../layouts/MainLayout"

function Login() {
    return (
        <MainLayout>
            <main className="px-[20px] py-[28px] flex justify-center xl:py-[64px] xl:px-[120px]">
                <RegisterForm />
            </main>
        </MainLayout>
    )
}

export default Login