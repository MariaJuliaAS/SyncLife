import { MdOutlineClose } from "react-icons/md";
import { TransactionPros } from "./modalAddTransaction";
import { FormEvent, useEffect, useState } from "react";
import { LayoutModalTransactions } from "./layoutModalAddTransaction";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import toast from "react-hot-toast";

interface ModalEditeTransaction {
    closeModal: () => void;
    docId: string;
}

export function ModalEditTransaction({ closeModal, docId }: ModalEditeTransaction) {
    const [disableEditing, setDisableEditing] = useState(true)
    const [transaction, setTransaction] = useState<TransactionPros>({
        type: '',
        description: '',
        value: 0,
        created: '',
        category: '',
        paymentForm: '',
        observation: '',
    })

    useEffect(() => {

        async function getTransaction() {
            const transactionRef = doc(db, "transactions", docId)
            await getDoc(transactionRef)
                .then((snapshot) => {
                    const doc = snapshot.data()
                    setTransaction({
                        type: doc?.type,
                        description: doc?.description,
                        value: doc?.value,
                        created: doc?.created,
                        category: doc?.category,
                        paymentForm: doc?.paymentForm,
                        observation: doc?.observation
                    })
                })
                .catch((error) => {
                    console.log("Erro ao carregar transações no modal edit: " + error)
                })
        }

        getTransaction()

    }, [])

    async function handleEditTransaction(e: FormEvent) {
        e.preventDefault()
        const transactionRef = doc(db, 'transactions', docId)

        await updateDoc(transactionRef, { ...transaction })
            .then(() => {
                toast.success('Transação editada com sucesso!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao editar transação' + error)
            })
    }

    async function handleDeleteTransaction() {
        const transactionRef = doc(db, 'transactions', docId)

        await deleteDoc(transactionRef)
            .then(() => {
                toast.success('Transação excluido com sucesso!')
                closeModal()
            })
            .catch((error) => {
                console.log('Erro ao excluir transação: ' + error)
            })
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Editar Transação</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form onSubmit={handleEditTransaction} className="mt-4 flex flex-col">
                    <LayoutModalTransactions disableEditing={disableEditing} transaction={transaction} setTransaction={setTransaction} />
                    <div className="flex gap-4">
                        <button onClick={handleDeleteTransaction} type="button" className="sm:text-base text-sm border w-full border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
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