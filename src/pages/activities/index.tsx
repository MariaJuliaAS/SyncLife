import { useState } from "react";
import { Nav } from "../../components/nav";
import { FiPlusCircle } from "react-icons/fi";
import { GoCalendar, GoKebabHorizontal } from "react-icons/go";
import { ModalAddActivity } from "../../components/activities/modalAddActivity";

export function Activities() {
    const [modalAddActivity, setModalAddActivity] = useState(false)

    return (
        <div className="flex">
            <Nav />

            <div className='sm:px-12 w-full min-h-screen py-6 px-4 flex bg-gray-50 justify-center'>
                <main className="w-full xl:max-w-11/12 sm:max-w-8/12 max-w-full">
                    <header className="sm:flex-row flex-col gap-4 w-full flex justify-between items-start mb-6 lg:pt-0 sm:pt-6 pt-0">
                        <h1 className="font-bold lg:text-3xl text-2xl">Minhas Atividades</h1>

                        <div className="flex items-center">
                            <button onClick={() => setModalAddActivity(true)} className="lg:text-base text-sm sm:px-5 px-2 sm:py-2 bg-emerald-600 py-1 text-white flex items-center font-medium rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-700">
                                <FiPlusCircle className="sm:text-lg text-base mr-2" />
                                Nova Atividade
                            </button>
                        </div>
                    </header>

                    <div className="xl:grid-cols-3 grid grid-cols-1 gap-12" >
                        <section className=" bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }} >
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">A Fazer</h1>
                                <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">1</span>
                            </header>

                            <article className="border border-gray-200 rounded-lg p-4 mb-4">
                                <header className="flex justify-between items-center mb-6">
                                    <h3 className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fundamento de Cáculo</h3>
                                    <GoKebabHorizontal className="text-lg cursor-pointer" />
                                </header>

                                <div>
                                    <p>Lista de exercícios sobre integrais duplas</p>
                                    <span className="flex items-center mt-2.5 text-gray-400 text-sm">
                                        <GoCalendar className="mr-2" />
                                        Entrega: 09/05/2025
                                    </span>
                                </div>
                            </article>
                        </section>

                        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">Em Andamento</h1>
                                <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">1</span>
                            </header>

                            <article className="border border-gray-200 rounded-lg p-4">
                                <header className="flex justify-between items-center mb-6">
                                    <h3 className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fundamento de Cáculo</h3>
                                    <GoKebabHorizontal className="text-lg cursor-pointer" />
                                </header>

                                <div>
                                    <p>Lista de exercícios sobre integrais duplas</p>
                                    <span className="flex items-center mt-2.5 text-gray-400 text-sm">
                                        <GoCalendar className="mr-2" />
                                        Entrega: 09/05/2025
                                    </span>
                                </div>
                            </article>

                        </section>

                        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">Concluído</h1>
                                <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">1</span>
                            </header>

                            <article className="border border-gray-200 rounded-lg p-4">
                                <header className="flex justify-between items-center mb-6">
                                    <h3 className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fundamento de Cáculo</h3>
                                    <GoKebabHorizontal className="text-lg cursor-pointer" />
                                </header>

                                <div>
                                    <p>Lista de exercícios sobre integrais duplas</p>
                                    <span className="flex items-center mt-2.5 text-gray-400 text-sm">
                                        <GoCalendar className="mr-2" />
                                        Entrega: 09/05/2025
                                    </span>
                                </div>
                            </article>
                        </section>
                    </div>

                    {modalAddActivity && <ModalAddActivity closeModal={() => setModalAddActivity(false)} />}

                </main>
            </div>
        </div>
    )
}