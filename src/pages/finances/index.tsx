import { Nav } from "../../components/nav";



export function Finances() {
    return (
        <div className="flex">
            <Nav />

            <div className='sm:px-12 w-full min-h-screen py-6 px-4 flex bg-gray-50 felx justify-center'>
                <main className="w-full max-w-7xl">
                    <header className="w-full flex justify-between">
                        <div>
                            <h1 className="font-bold text-3xl">Dashboard Financeiro</h1>
                            <span className="mt-2 text-gray-500">Acompanhe suas finanças em um só lugar</span>
                        </div>
                        <div className="flex items-center">
                            <button className="sm:text-base text-sm bg-emerald-600 px-5 py-1 text-white font-medium rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-700">
                                Nova Transação
                            </button>
                        </div>
                    </header>
                </main>
            </div>
        </div>
    )
}