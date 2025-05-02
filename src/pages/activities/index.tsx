import { Nav } from "../../components/nav";
import { FiPlusCircle } from "react-icons/fi";

export function Activities() {
    return (
        <div className="flex">
            <Nav />

            <div className='sm:px-12 w-full min-h-screen py-6 px-4 flex bg-gray-50 justify-center'>
                <main className="w-full max-w-11/12">
                    <header className="sm:flex-row flex-col gap-4 w-full flex justify-between items-start mb-6 lg:pt-0 sm:pt-6 pt-0">

                        <h1 className="font-bold sm:text-3xl text-2xl">Minhas Atividades</h1>

                        <div className="flex items-center">
                            <button className="sm:text-base text-sm sm:px-5 px-2 bg-emerald-600 py-2 text-white flex justify-center items-center font-medium rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-700">
                                <FiPlusCircle className="text-lg mr-2" />
                                Nova Atividade
                            </button>
                        </div>
                    </header>
                </main>
            </div>

            {/* <section className="bg-red-400">
                    <h1>teste</h1>
                </section>
                <section className="bg-red-400">
                    <h1>teste</h1>
                </section>
                <section className="bg-red-400">
                    <h1>teste</h1>
                </section> */}

        </div>
    )
}