import { GiMoneyStack } from "react-icons/gi";
import { GoCreditCard } from "react-icons/go";
import { PiPixLogo } from "react-icons/pi";
import { GetTransactions } from "../../hooks/getTransactions";
import { FormatDate } from "../../utils/formatDate";
import { useState } from "react";
import { ModalEditTransaction } from "./modal/modalEditTransaction";
import { ModalAllTransactions } from "./modal/modalAllTransactions";

export function RecentTransactions() {
    const { getTransactions } = GetTransactions()
    const currentDate = new Date().toISOString().slice(0, 10)
    const [modalEditTransaction, setModalEditTransaction] = useState(false)
    const [modalAllTransactions, setModalAllTransactions] = useState(false)
    const [docId, setDocId] = useState<string>("")

    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg">
            <header className="px-4">
                <p className="font-bold sm:text-xl text-lg">Transações Recentes</p>
            </header>

            <main className="flex flex-col gap-4 mt-6">
                {getTransactions.slice(0, 3).map((item) => (
                    <article onClick={() => { setModalEditTransaction(true), setDocId(item.docId) }} key={item.docId} className=" cursor-pointer flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
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

            <footer className="border-t border-gray-200 mt-4 flex items-center justify-center px-4">
                <button onClick={() => setModalAllTransactions(true)} className="mt-4 border border-gray-200 rounded-lg w-full py-1 cursor-pointer transition-all duration-200 hover:bg-gray-300/30">
                    Ver Todas Transações
                </button>
            </footer>

            {modalEditTransaction && <ModalEditTransaction closeModal={() => setModalEditTransaction(false)} docId={docId} />}
            {modalAllTransactions && <ModalAllTransactions closeModal={() => setModalAllTransactions(false)} />}
        </section>
    )
}