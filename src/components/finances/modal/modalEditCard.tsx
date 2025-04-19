import { MdOutlineClose } from "react-icons/md";
import { LayoutModalAddCard } from "./layoutModalAddCard";
import { ModalEditProps } from "./modalEditTransaction";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import { CardProps } from "./modalAddNewCard";

export function ModalEditCard({ closeModal, docId }: ModalEditProps) {
    const [cardInfos, setCardInfos] = useState<CardProps>({
        name: "",
        limit: 0,
        date: "",
        color: "#000000"
    })

    useEffect(() => {

        async function getCard() {
            const getCardRef = doc(db, "cards", docId)
            await getDoc(getCardRef)
                .then((snapshot) => {
                    setCardInfos({
                        name: snapshot.data()?.name,
                        limit: snapshot.data()?.limit,
                        date: snapshot.data()?.date,
                        color: snapshot.data()?.color
                    })
                })
                .catch((error) => {
                    console.log("Erro ao carregar cartões no modal edit: " + error)
                })
        }

        getCard()

    }, [])

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Editar Cartão</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form className="mt-4 flex flex-col">
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