import { GiMoneyStack } from "react-icons/gi";

export function RecentTransactions() {
    return (
        <section className="flex-1 bg-white border border-gray-200 rounded-md py-7 shadow-lg">
            <header className="px-4">
                <p className="font-bold sm:text-xl text-lg">Transações Recentes</p>
            </header>

            <main className="flex flex-col gap-4 mt-6">
                <article className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                    <div className="flex gap-4 items-center">
                        <span className="sm:text-base text-sm bg-gray-100 rounded-full p-3 text-white">
                            <GiMoneyStack className="text-emerald-800 sm:text-2xl text-xl" />
                        </span>
                        <p className="flex flex-col font-bold sm:text-lg text-base">
                            Supermercado
                            <span className="sm:text-base text-sm font-normal text-gray-500">Hoje, 14:08</span>
                        </p>
                    </div>
                    <span className="bg-red-500/40 px-2 py-1 rounded-lg">
                        -R$ 145,80
                    </span>
                </article>
                <article className="flex items-center justify-between p-2 transition-all duration-200 hover:bg-gray-600/10 px-4">
                    <div className="flex gap-4 items-center">
                        <span className="sm:text-base text-sm bg-gray-100 rounded-full p-3 text-white">
                            <GiMoneyStack className="text-emerald-800 sm:text-2xl text-xl" />
                        </span>
                        <p className="flex flex-col font-bold sm:text-lg text-base">
                            Salário
                            <span className="sm:text-base text-sm font-normal text-gray-500">06/12, 17:45</span>
                        </p>
                    </div>
                    <span className="bg-green-500/40 px-2 py-1 rounded-lg">
                        -R$ 145,80
                    </span>
                </article>

            </main>

            <footer className="border-t border-gray-200 mt-4 flex items-center justify-center px-4">
                <button className="mt-4 border border-gray-200 rounded-lg w-full py-1 cursor-pointer transition-all duration-200 hover:bg-gray-300/30">
                    Ver Todas Transações
                </button>
            </footer>
        </section>
    )
}