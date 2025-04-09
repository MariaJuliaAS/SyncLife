import { useState } from "react";
import { Input } from "../input";
import { IoCloseCircle } from "react-icons/io5";

interface ModalAddProps {
    closeModal: () => void;
    dateSelected: string;
}

// interface EventsProps{

// }

export function ModalAdd({ closeModal, dateSelected }: ModalAddProps) {
    // const [eventsInfos, setEventsInfos] = useState()

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main className="bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8">
                <header className="flex items-center justify-between w-full mb-5 border-b border-b-gray-200">
                    <h3 className="mb-4 font-bold text-lg">Adicionar Evento - {dateSelected}</h3>
                    <IoCloseCircle onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                </header>

                <form className="flex flex-col">
                    <label className="sm:text-base text-sm mb-2 font-medium">Título</label>
                    <Input
                        placeholder="Reunião de equie"
                    />

                    <label className="sm:text-base text-sm mb-2 font-medium">Descrição</label>
                    <textarea
                        placeholder="Detalhes do evento..."
                        className="border border-gray-200 rounded-md outline-none p-2 mb-4 bg-white"
                        rows={3}
                    />

                    <section>
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Data de Início</label>
                                <Input
                                    type="date"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Hora de Início</label>
                                <Input
                                    type="time"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Data de Fim</label>
                                <Input
                                    type="date"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Hora de Fim</label>
                                <Input
                                    type="time"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-row items-center justify-center gap-4 mb-5 border-b border-b-gray-200">
                        <div className="flex flex-col w-full mb-10">
                            <label className="sm:text-base text-sm mb-2 font-medium">Status</label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="accent-emerald-600 mr-3"
                                />
                                <label>Pendente</label>
                                <input
                                    type="checkbox"
                                    className="accent-emerald-600 mx-3"
                                />
                                <label>Concluído</label>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="sm:text-base text-sm mb-2 font-medium">Cor do Evento</label>
                            <Input
                                type="color"
                            />
                        </div>
                    </section>

                    <div className="gap-4 flex">
                        <button className="sm:text-base text-sm w-full border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button className="sm:text-base text-sm w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Adicionar
                        </button>
                    </div>
                </form>
            </main>
        </div>

    )
}