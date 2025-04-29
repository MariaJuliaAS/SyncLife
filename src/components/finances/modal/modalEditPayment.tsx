import { MdOutlineClose } from "react-icons/md";
import { ModalEditProps } from "./modalEditTransaction";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../../services/firebaseConnection";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { PaymentsListProps } from "./modalAddPayment";
import { LayoutModalAddPayment } from "./layoutModalAddPayment";
import toast from "react-hot-toast";

export function ModalEditPayment({ closeModal, docId }: ModalEditProps) {
    const [disableEditing, setDisableEditing] = useState(true)
    const [payments, setPayments] = useState<PaymentsListProps>({
        card: '',
        establishment: '',
        category: '',
        date: '',
        value: 0,
        observation: ''
    })

    useEffect(() => {
        async function getPayment() {
            const paymentRef = doc(db, 'payments', docId)
            await getDoc(paymentRef)
                .then((snapshot) => {
                    const doc = snapshot.data()
                    setPayments({
                        card: doc?.card,
                        establishment: doc?.establishment,
                        category: doc?.category,
                        date: doc?.date,
                        value: doc?.value,
                        observation: doc?.observation
                    })
                })
                .catch((error) => {
                    console.log('Erro ao carregar pagamentos no modal de editar: ' + error)
                })
        }

        getPayment()
    }, [])

    async function handleEditPayment(e: FormEvent) {
        e.preventDefault()
        const paymentRef = doc(db, 'payments', docId)

        await updateDoc(paymentRef, { ...payments })
            .then(() => {
                toast.success('Pagamento editado com sucesso!')
                window.location.reload()
            })
            .catch((error) => {
                console.log('Erro ao editar pagamento' + error)
            })
    }

    async function handleDeletePayment() {
        const paymentRef = doc(db, 'payments', docId)

        await deleteDoc(paymentRef)
            .then(() => {
                toast.success('Pagamento excluido com sucesso!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao excluir pagamento: ' + error)
            })
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Editar Pagamento</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={handleEditPayment} className="mt-4 flex flex-col">
                    <LayoutModalAddPayment payments={payments} setPayments={setPayments} disableEditing={disableEditing} />
                    <div className="flex justify-end gap-4">
                        <button onClick={handleDeletePayment} type="button" className="sm:text-base text-sm border border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Excluir
                        </button>
                        {disableEditing ?
                            <button onClick={(e: FormEvent) => {
                                e.preventDefault()
                                setDisableEditing(!disableEditing)
                            }} type="button" className="sm:text-base text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                                Habilitar Edição
                            </button> :
                            <button type="submit" className="sm:text-base text-sm bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                                Salvar Edição
                            </button>
                        }
                    </div>
                </form>
            </main>
        </div>
    )
}