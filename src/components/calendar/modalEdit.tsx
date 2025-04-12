import { MdOutlineClose } from "react-icons/md";
import { LayoutFormModal } from "./layoutModalForm";
import { FormEvent, useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import { EventsProps } from "./modalAdd";
import { FormatDate } from "../../utils/formatDate";
import toast from "react-hot-toast";

interface ModalEditProps {
    closeModal: () => void;
    docEventId: string;
}

export function ModalEdit({ closeModal, docEventId }: ModalEditProps) {
    const [disableEditing, setDisableEditing] = useState(true)
    const [eventsInfos, setEventsInfos] = useState<EventsProps>({
        title: '',
        startDate: '',
        startHour: '',
        endDate: '',
        endHour: '',
        description: '',
        status: false,
        backgroundColor: '#000000',
        borderColor: '#000000',
        userId: auth.currentUser?.uid,
    })
    const { dateFormatted } = FormatDate(eventsInfos.startDate)

    useEffect(() => {

        async function getEvent() {
            const eventRef = doc(db, 'events', docEventId)

            await getDoc(eventRef)
                .then((snapshot) => {
                    setEventsInfos({
                        title: snapshot.data()?.title,
                        startDate: (snapshot.data()?.start).slice(0, 10),
                        startHour: (snapshot.data()?.start).slice(11, 16),
                        endDate: (snapshot.data()?.end).slice(0, 10),
                        endHour: (snapshot.data()?.end).slice(11, 16),
                        description: snapshot.data()?.description,
                        status: snapshot.data()?.status,
                        backgroundColor: snapshot.data()?.backgroundColor,
                        borderColor: snapshot.data()?.backgroundColor,
                        userId: snapshot.data()?.userId,
                    })
                })
                .catch((error) => {
                    console.log('Erro ao carregar evento: ' + error)
                })
        }

        getEvent()

    }, [])

    async function handleEditEvent(e: FormEvent) {
        e.preventDefault()

        const eventRef = doc(db, 'events', docEventId)

        await updateDoc(eventRef, {
            ...eventsInfos,
            borderColor: eventsInfos.backgroundColor,
            start: eventsInfos.startDate + 'T' + eventsInfos.startHour,
            end: eventsInfos.endDate + 'T' + eventsInfos.endHour
        })
            .then(() => {
                toast.success('Evento editado com sucesso!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao editar evento' + error)
            })
    }

    async function handleDeletEvent() {
        const eventRef = doc(db, 'events', docEventId)

        await deleteDoc(eventRef)
            .then(() => {
                toast.success('Evento excluido com sucesso!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao excluir evento: ' + error)
            })
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8">
                <header className="flex items-center justify-between w-full mb-5 border-b border-b-gray-200">
                    <h3 className="mb-4 font-bold text-lg">{`${dateFormatted}, ${eventsInfos.startHour} - ${eventsInfos.endHour}`}</h3>
                    <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                </header>


                <form onSubmit={handleEditEvent} className="flex flex-col">
                    <LayoutFormModal eventsInfos={eventsInfos} setEventsInfos={setEventsInfos} disableEditing={disableEditing} />

                    <div className="gap-4 flex">
                        <button type="button" onClick={handleDeletEvent} className="sm:text-base text-sm w-full border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Excluir
                        </button>

                        {disableEditing ?
                            <button onClick={(e: FormEvent) => {
                                e.preventDefault()
                                setDisableEditing(!disableEditing)
                            }} type="button" className="sm:text-base text-sm w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                                Habilitar Edição
                            </button> :
                            <button type="submit" className="sm:text-base text-sm w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                                Salvar Edição
                            </button>
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}