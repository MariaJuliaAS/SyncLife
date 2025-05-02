import { GoCalendar, GoKebabHorizontal } from "react-icons/go";
import { GetActivitiesProps } from "../../pages/activities";
import { FormatDate } from "../../utils/formatDate";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

interface ActivitiesSectionProps {
    list: GetActivitiesProps[];
    status: string;
}

export function ActivitiesSection({ list, status }: ActivitiesSectionProps) {
    const [options, setOptions] = useState(false)
    const [statusActivity, setStatusActivity] = useState('')
    const [docId, setDocId] = useState('')
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

    async function handleMoveActivity(docId: string, status: string) {
        await updateDoc(doc(db, 'activities', docId), {
            status: status
        })
            .then(() => {
                setOptions(false)
                toast.success('Atividade movida com sucesso!')
            })
            .catch((error) => {
                console.log('Error ao mover atividade: ', error)
            })
    }

    function handleOpenMenu(event: React.MouseEvent, itemStatus: string, itemDocId: string) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setMenuPosition({
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX - 190
        })
        setOptions(true)
        setStatusActivity(itemStatus)
        setDocId(itemDocId)
    }

    return (
        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-medium">{status}</h1>
                {list.length > 0 && (
                    <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">{list.length}</span>
                )}
            </header>

            {list.length === 0 && (
                <span className="flex items-center justify-center text-gray-500 h-7/12">
                    Nenhuma atividade cadastrada
                </span>
            )}

            {list.map((item) => (
                <article key={item.docId} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 ease-in-out mb-4 bg-white">
                    <header className="flex justify-between items-center mb-6">
                        <h3 className="bg-gray-100 px-3 py-1 rounded-full text-sm">{item.subject}</h3>
                        <GoKebabHorizontal onClick={(e) => handleOpenMenu(e, item.status, item.docId)} className="text-lg cursor-pointer" />
                    </header>

                    <div>
                        <p>{item.details}</p>
                        <span className="flex items-center mt-2.5 text-gray-400 text-sm">
                            <GoCalendar className="mr-2" />
                            Entrega: {FormatDate(item.dateTime).dateHourFormatted}
                        </span>
                    </div>
                </article>
            ))}

            {options && (
                <nav className="bg-white border border-gray-200 rounded-lg fixed flex flex-col items-start p-4 z-50"
                    style={{ top: menuPosition.top, left: menuPosition.left, minWidth: '180px' }}
                >
                    <button className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 py-1 px-2">Editar</button>
                    {['A Fazer', 'Em Andamento', 'Concluído']
                        .filter((status) => status !== statusActivity)
                        .map((status) => (
                            <button onClick={() => handleMoveActivity(docId, status)} className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 py-1 px-2">Mover para {status}</button>
                        ))
                    }
                    <button className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 text-red-500 py-1 px-2">Excluir</button>
                </nav>
            )}

        </section>
    )
}