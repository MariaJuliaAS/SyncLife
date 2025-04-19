import { MdOutlineClose } from "react-icons/md";
import { ModalProps } from "./modalAddTransaction";
import { LayoutModalAddPayment } from "./layoutModalAddPayment";
import { FormEvent, useState } from "react";
import { auth, db } from "../../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

export interface PaymentsListProps {
    card: string;
    establishment: string;
    category: string;
    value: number;
    date: string;
    observation?: string;
}

export function ModalAddPayment({ closeModal }: ModalProps) {
    const [payments, setPayments] = useState<PaymentsListProps>({
        card: "",
        establishment: "",
        category: "",
        value: 0,
        date: "",
        observation: "",
    })

    async function handleAddPayment(e: FormEvent) {
        e.preventDefault()

        await addDoc(collection(db, "payments"),
            {
                ...payments,
                userId: auth.currentUser?.uid
            })
            .then(() => {
                toast.success("Pagamento adicionado à fatura!")
                closeModal()
            })
            .catch((error) => {
                console.log("Erro ao adicionar pagamento: " + error)
            })
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Novo Pagamento</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={handleAddPayment} className="mt-4 flex flex-col">
                    <LayoutModalAddPayment payments={payments} setPayments={setPayments} />
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