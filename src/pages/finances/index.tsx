import { Siderbar } from "../../components/sidebar"


export function Finances() {
    return (
        <div className="flex">

            <Siderbar />

            <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex bg-gray-50'>
                <h1>PÁGINA DE FINANCES</h1>
            </main>
        </div>
    )
}