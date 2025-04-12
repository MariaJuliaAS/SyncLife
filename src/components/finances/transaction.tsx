import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GetTransactions } from "../../hooks/getTransactions";
import { useState } from "react";

export function Transaction() {
    const [seeBalance, setSeeBalance] = useState(true)
    const { getTransactions } = GetTransactions()

    const total = getTransactions.reduce((acc, obj) => acc + obj.value, 0)

    const earnings = getTransactions.reduce((acc, obj) => obj.type === "Receita" ? acc + obj.value : acc, 0)
    const expenses = getTransactions.reduce((acc, obj) => obj.type === "Despesa" ? acc + obj.value : acc, 0)

    return (
        <section className="xl:grid-cols-3 grid-cols-1 grid place-items-center gap-4">
            <article className="w-full flex items-center justify-between h-36 px-4 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-lg">
                <div>
                    <span className="sm:text-base text-sm font-medium mt-2 text-gray-50">Saldo em conta</span>
                    <p className="sm:text-2xl flex items-center font-bold  text-white text-xl py-1">{seeBalance ? (total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })) : ("R$ ***")}</p>
                    {/*<span className="sm:text-sm text-xs text- mt-2 text-gray-50">Atualizado há 5 minutos</span>*/}
                </div>
                <button onClick={() => setSeeBalance(!seeBalance)} className="sm:text-base text-sm cursor-pointer bg-black/10 rounded-full p-3">
                    {seeBalance ? <FaRegEyeSlash color="#fff" className="sm:text-2xl text-xl" /> : <FaRegEye color="#fff" className="sm:text-2xl text-xl" />}
                </button>
            </article>

            {/* xl:contents => A div desaparece e os articles voltam a ocupar as 3 colunas do grip principal */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:contents gap-4">
                <article className="w-full h-36 border px-4 border-gray-200 rounded-md flex justify-between items-center bg-white shadow-lg">
                    <div>
                        <span className="sm:text-base text-sm font-medium mt-2 text-gray-800">Ganhos</span>
                        <p className="sm:text-2xl font-bold  text-black text-xl py-1">{earnings.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <span className="sm:text-sm text-xs mt-2 text-gray-800">Este mês</span>
                    </div>
                    <span className="bg-emerald-600/20 rounded-full p-3">
                        <FaArrowTrendUp className="text-gray-950 sm:text-2xl text-xl" />
                    </span>
                </article>

                <article className="w-full h-36 border px-4 border-gray-200 rounded-md flex justify-between items-center bg-white shadow-lg">
                    <div>
                        <span className="sm:text-base text-sm font-medium mt-2 text-gray-800">Gastos</span>
                        <p className="sm:text-2xl font-bold  text-black text-xl py-1">{expenses.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <span className="sm:text-sm text-xs mt-2 text-gray-800">Este mês</span>
                    </div>
                    <span className="bg-red-500/20 rounded-full p-3">
                        <FaArrowTrendDown className="text-gray-950 sm:text-2xl text-xl" />
                    </span>
                </article>
            </div>

        </section>
    )
}