import { MdOutlineClose } from "react-icons/md";
import { ModalProps } from "../../finances/modal/modalAddTransaction";
import { LayoutModalAddActivity } from "./layoutModalAddActivity";
import { useContext, useState } from "react";
import { ActivitiesContext } from "../../../context/ActivitiesContext";

export interface ActitivitiesProps {
    subject: string;
    details: string;
    dateTime: string;
    deliveryMethod: string;
    status: string;
}


export function ModalAddActivity({ closeModal }: ModalProps) {
    const [activities, setActivities] = useState<ActitivitiesProps>({
        subject: "",
        details: "",
        dateTime: "",
        deliveryMethod: '',
        status: ""
    })
    const { handleAddActivity } = useContext(ActivitiesContext)

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Nova Atividade</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={(e) => { handleAddActivity(e, activities), closeModal() }} className="mt-4 flex flex-col">
                    <LayoutModalAddActivity activities={activities} setActivities={setActivities} />

                    <div className="flex justify-end gap-4">
                        <button onClick={closeModal} type="button" className="sm:text-base text-sm border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button type="submit" className="sm:text-base text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Adicionar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}