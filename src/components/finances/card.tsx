import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ModalAddNewCard } from "./modal/modalAddNewCard";

export function Card() {
    const [modalAddNewCard, setModalAddNewCard] = useState(false)

    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg">
            <header className=" px-4 flex justify-between">
                <p className="font-bold sm:text-xl text-lg">Fatura</p>
                <button onClick={() => setModalAddNewCard(true)} className="sm:text-base text-sm text-emerald-600 font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                    Novo Cartão
                </button>
            </header>

            <main className="flex flex-col gap-4 mt-4">
                <article className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                    <div className="flex gap-4 items-center">
                        <span className="sm:text-base text-sm bg-violet-800 rounded-full p-3 text-white">NU</span>
                        <p className="flex flex-col font-bold sm:text-lg text-base">
                            R$ 691,00
                            <span className="sm:text-base text-sm font-normal text-gray-500">Vencimento: 11/04</span>
                        </p>
                    </div>
                    <MdKeyboardArrowRight size={20} color="#000" />
                </article>
                <article className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                    <div className="flex gap-4 items-center">
                        <span className="sm:text-base text-sm bg-yellow-400 rounded-full py-3 px-3.5 text-white">WI</span>
                        <p className="flex flex-col font-bold sm:text-lg text-base">
                            R$ 691,00
                            <span className="sm:text-base text-sm font-normal text-gray-500">Vencimento: 11/04</span>
                        </p>
                    </div>
                    <MdKeyboardArrowRight size={20} color="#000" />
                </article>

                <footer className="border-t border-gray-200 mt-4 flex items-center justify-center px-4">
                    <button className="mt-4 border border-gray-200 rounded-lg w-full py-1 cursor-pointer transition-all duration-200 hover:bg-gray-300/30">
                        Novo Pagamento
                    </button>
                </footer>

                {modalAddNewCard && <ModalAddNewCard closeModal={() => setModalAddNewCard(false)} />}
            </main>
        </section>
    )
}