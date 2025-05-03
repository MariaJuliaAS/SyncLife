import { GoCalendar, GoKebabHorizontal } from "react-icons/go";
import { FormatDate } from "../../utils/formatDate";
import { useContext, useState } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ActivitiesContext, GetActivitiesProps } from "../../context/ActivitiesContext";

interface ActivitiesSectionProps {
    list: GetActivitiesProps[];
    status: string;
}

export function ActivitiesSection({ list, status }: ActivitiesSectionProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const { handleMoveActivity, handleDeleteActivity } = useContext(ActivitiesContext)

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

                        <DropdownMenu.Root open={activeMenu === item.docId} onOpenChange={(isOpen) => setActiveMenu(isOpen ? item.docId : null)}>
                            <DropdownMenu.Trigger asChild>
                                <button className="transition duration-200 ease-in-out rounded-md p-1 hover:bg-gray-100">
                                    <GoKebabHorizontal className="text-lg cursor-pointer" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal>
                                <DropdownMenu.Content side="bottom" align="end" className="bg-white border border-gray-200 rounded-lg flex flex-col items-start p-4 z-50"  >
                                    <button className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 py-1 px-2">Editar</button>
                                    {['A Fazer', 'Em Andamento', 'Concluído']
                                        .filter((status) => status !== item.status)
                                        .map((status) => (
                                            <button key={status} onClick={() => { handleMoveActivity(item.docId, status), setActiveMenu(null) }} className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 py-1 px-2">Mover para {status}</button>
                                        ))
                                    }
                                    <button onClick={() => handleDeleteActivity(item.docId)} className="w-full cursor-pointer transition duration-200 ease-in-out rounded-md text-start hover:bg-gray-400/10 text-red-500 py-1 px-2">Excluir</button>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>

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

        </section>
    )
}