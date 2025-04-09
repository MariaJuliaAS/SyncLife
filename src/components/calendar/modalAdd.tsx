import { FormEvent, useState } from "react";
import { Input } from "../input";
import { IoCloseCircle } from "react-icons/io5";
import { FormatDate } from "../../utils/formatDate";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

interface ModalAddProps {
    closeModal: () => void;
    dateSelected: string;
}

interface EventsProps {
    title: string;
    startDate: string;
    startHour: string;
    endDate: string;
    endHour: string;
    description: string;
    status: boolean;
    backgroundColor: string;
    borderColor: string;
    id: string | undefined;
}

export function ModalAdd({ closeModal, dateSelected }: ModalAddProps) {
    const { dateFormatted, hourFormatted, dateHourFormatted, haveHour } = FormatDate(dateSelected)
    const [eventsInfos, setEventsInfos] = useState<EventsProps>({
        title: '',
        startDate: dateSelected.slice(0, 10),
        startHour: hourFormatted,
        endDate: '',
        endHour: '',
        description: '',
        status: false,
        backgroundColor: '#000000',
        borderColor: '#000000',
        id: auth.currentUser?.uid,
    })

    async function handleAddEvent(e: FormEvent) {
        e.preventDefault()

        await addDoc(collection(db, 'events'), {
            ...eventsInfos,
            status: eventsInfos.status ? 'Completed' : 'Pending',
            borderColor: eventsInfos.backgroundColor,

        })
            .then(() => {
                toast.success('Nova tarefa adicionada a sua agenda!')
                setEventsInfos({
                    title: '',
                    startDate: '',
                    startHour: '',
                    endDate: '',
                    endHour: '',
                    description: '',
                    status: false,
                    backgroundColor: '#000000',
                    borderColor: '#000000',
                    id: auth.currentUser?.uid,
                })
            })
            .catch((error) => {
                console.log('Erro ao adicionar tarefa: ' + error)
            })
    }

    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main className="bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8">
                <header className="flex items-center justify-between w-full mb-5 border-b border-b-gray-200">
                    <h3 className="mb-4 font-bold text-lg">Adicionar Evento - {haveHour ? dateHourFormatted : dateFormatted}</h3>
                    <IoCloseCircle onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                </header>

                <form onSubmit={handleAddEvent} className="flex flex-col">
                    <label className="sm:text-base text-sm mb-2 font-medium">Título</label>
                    <Input
                        placeholder="Reunião de equie"
                        value={eventsInfos?.title}
                        onChange={(e) => setEventsInfos(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />

                    <label className="sm:text-base text-sm mb-2 font-medium">Descrição</label>
                    <textarea
                        placeholder="Detalhes do evento..."
                        className="border border-gray-200 rounded-md outline-none p-2 mb-4 bg-white"
                        rows={3}
                        value={eventsInfos?.description}
                        onChange={(e) => setEventsInfos(prev => ({ ...prev, description: e.target.value }))}
                    />

                    <section>
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Data de Início</label>
                                <Input
                                    type="date"
                                    value={eventsInfos?.startDate}
                                    onChange={(e) => setEventsInfos(prev => ({ ...prev, startDate: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Hora de Início</label>
                                <Input
                                    type="time"
                                    value={eventsInfos?.startHour}
                                    onChange={(e) => setEventsInfos(prev => ({ ...prev, startHour: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Data de Fim</label>
                                <Input
                                    type="date"
                                    value={eventsInfos?.endDate}
                                    onChange={(e) => setEventsInfos(prev => ({ ...prev, endDate: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="sm:text-base text-sm mb-2 font-medium">Hora de Fim</label>
                                <Input
                                    type="time"
                                    value={eventsInfos?.endHour}
                                    onChange={(e) => setEventsInfos(prev => ({ ...prev, endHour: e.target.value }))}
                                    required
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
                                    checked={eventsInfos.status}
                                    onChange={(e) => setEventsInfos(prev => ({ ...prev, status: e.target.checked }))}
                                />
                                <label>{eventsInfos.status ? 'Concluído' : 'Pendente'}</label>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-4">
                            <label className="sm:text-base text-sm mb-2 font-medium">Cor do Evento</label>
                            <Input
                                type="color"
                                value={eventsInfos.backgroundColor}
                                onChange={(e) => setEventsInfos(prev => ({ ...prev, backgroundColor: e.target.value }))}
                            />
                        </div>
                    </section>

                    <div className="gap-4 flex">
                        <button onClick={closeModal} className="sm:text-base text-sm w-full border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button type="submit" className="sm:text-base text-sm w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Adicionar
                        </button>
                    </div>
                </form>
            </main>
        </div>

    )
}