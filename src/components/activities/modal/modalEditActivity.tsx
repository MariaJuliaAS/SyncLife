import { useContext, useEffect } from "react";
import { ActivitiesContext } from "../../../context/ActivitiesContext";
import { ModalEditProps } from "../../finances/modal/modalEditTransaction";
import { MdOutlineClose } from "react-icons/md";
import { LayoutModalAddActivity } from "./layoutModalAddActivity";


export function ModalEditActivity({ closeModal, docId }: ModalEditProps) {
    const { handleEditActivity, getSpecificActivity, specificActivity, setSpecificActivity } = useContext(ActivitiesContext)

    useEffect(() => {
        getSpecificActivity(docId)
    }, [])

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Editar Atividade</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={(e) => { handleEditActivity(e, docId), closeModal() }} className="mt-4 flex flex-col">
                    <LayoutModalAddActivity activities={specificActivity} setActivities={setSpecificActivity} />

                    <div className="flex justify-end gap-4">
                        <button onClick={closeModal} type="button" className="sm:text-base text-sm border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button type="submit" className="sm:text-base text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Editar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}