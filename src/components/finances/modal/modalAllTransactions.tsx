import { MdOutlineClose } from "react-icons/md";
import { GetTransactions } from "../../../hooks/getTransactions";
import { GoCreditCard } from "react-icons/go";
import { PiPixLogo } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { FormatDate } from "../../../utils/formatDate";

interface ModalAllTransactionsProps {
    closeModal: () => void;
}

export function ModalAllTransactions({ closeModal }: ModalAllTransactionsProps) {
    const { getTransactions } = GetTransactions();
    const currentDate = new Date().toISOString().slice(0, 10);

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="border-b border-gray-200">
                    <div className="flex  justify-between mb-2">
                        <p className="font-bold sm:text-lg text-base">Nova Transação</p>
                        <MdOutlineClose onClick={closeModal} size={25} className="cursor-pointer mb-4 text-black transition-all duration-200 hover:text-red-500" />
                    </div>
                </header>

                {getTransactions.map((item) => (
                    <article key={item.docId} className="flex items-center justify-between my-3 p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                        <div className="flex gap-4 items-center">
                            <span className="sm:text-base text-sm bg-gray-100 rounded-full p-3 text-white">
                                {item.paymentForm === "Dinheiro" ? <GiMoneyStack className="text-emerald-800 sm:text-2xl text-xl" />
                                    : item.paymentForm === "Pix" ? <PiPixLogo className="text-emerald-800 sm:text-2xl text-xl" /> :
                                        <GoCreditCard className="text-emerald-800 sm:text-2xl text-xl" />}
                            </span>
                            <p className="flex flex-col font-bold sm:text-lg text-base">
                                {item.category}
                                <span className="sm:text-base text-sm font-normal text-gray-500">
                                    {item.created.slice(0, 10) === currentDate
                                        ? `Hoje, ${FormatDate(item.created).hourFormatted}` :
                                        FormatDate(item.created).dateHourFormatted}</span>
                            </p>
                        </div>
                        <span className={item.type === "Despesa" ? "bg-red-500/40 px-2 py-1 rounded-lg" : "bg-green-500/40 px-2 py-1 rounded-lg"}>
                            {item.value.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            })}
                        </span>
                    </article>
                ))}
            </main>
        </div>
    )
}