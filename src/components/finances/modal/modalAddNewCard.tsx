import { MdOutlineClose } from "react-icons/md"
import { ModalProps } from "./modalAddTransaction"
import { LayoutModalAddCard } from "./layoutModalAddCard"
import { FormEvent, useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import toast from "react-hot-toast";

export interface CardProps {
    name: string;
    limit: number;
    date: string;
}

export function ModalAddNewCard({ closeModal }: ModalProps) {
    const [cardInfos, setCardInfos] = useState<CardProps>({
        name: '',
        limit: 0,
        date: ''
    })

    async function handleAddNewCard(e: FormEvent) {
        e.preventDefault()

        await addDoc(collection(db, 'cards'), { ...cardInfos })
            .then(() => {
                toast.success('Novo cartão adicionado!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao adicionar cartão: ' + error)
            })
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Novo Cartão</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={handleAddNewCard} className="mt-4 flex flex-col">
                    <LayoutModalAddCard cardInfos={cardInfos} setCardInfos={setCardInfos} />
                    <div className="flex justify-end gap-4">
                        <button onClick={closeModal} type="button" className="sm:text-base text-sm border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button type="submit" className="sm:text-base text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Salvar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}