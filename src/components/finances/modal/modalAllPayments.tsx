import { MdOutlineClose } from "react-icons/md";
import { ModalProps } from "./modalAddTransaction";

interface ModalAllPaymentsProps {
    closeModal: () => void;
    selectedCard: string;
}

export function ModalAllPayments({ closeModal, selectedCard }: ModalAllPaymentsProps) {
    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Todas as Transações</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <div>
                    <p>teste</p>
                </div>
            </main>
        </div>
    )
}