import { MdOutlineClose } from "react-icons/md";
import { LayoutModalAddTransaction } from "./layoutModalAddTransaction";

interface modalAddTransactionProps {
    closeModal: () => void;
}

export function ModalAddTransaction({ closeModal }: modalAddTransactionProps) {
    return (
        <div className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main className="bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Nova Transação</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                <form className="mt-4 flex flex-col">
                    <LayoutModalAddTransaction />
                    <div className="flex gap-4">
                        <button onClick={closeModal} type="button" className="sm:text-base text-sm border w-full border-gray-200 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white">
                            Cancelar
                        </button>
                        <button className="sm:text-base text-sm w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:bg-gray-800">
                            Salvar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}