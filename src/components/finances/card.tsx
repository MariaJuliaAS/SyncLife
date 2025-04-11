import { MdKeyboardArrowRight } from "react-icons/md";

export function Card() {
    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg max-h-64">
            <header className="border-b border-gray-200 px-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="font-bold sm:text-xl text-lg">Fatura</p>
                    <button className="sm:text-base text-sm text-emerald-600 font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                        Novo Cartão
                    </button>
                </div>
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
            </main>
        </section>
    )
}