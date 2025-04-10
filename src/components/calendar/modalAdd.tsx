import { FormEvent, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FormatDate } from "../../utils/formatDate";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { LayoutFormModal } from "./layoutModalForm";

interface ModalAddProps {
    closeModal: () => void;
    dateSelected: string;
}

export interface EventsProps {
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
                    <LayoutFormModal eventsInfos={eventsInfos} setEventsInfos={setEventsInfos} />

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