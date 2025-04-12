import { useState } from "react";
import { Card } from "../../components/finances/card";
import { Graphic } from "../../components/finances/graphic";
import { RecentTransactions } from "../../components/finances/recentTransactions";
import { Transaction } from "../../components/finances/transaction";
import { Nav } from "../../components/nav";
import { ModalAddTransaction } from "../../components/finances/modal/modalAddTransaction";

export function Finances() {
    const [modalAddTransaction, setModalAddTransaction] = useState(false)

    return (
        <div className="flex">
            <Nav />

            <div className='sm:px-12 w-full min-h-screen py-6 px-4 flex bg-gray-50 felx justify-center'>
                <main className="w-full max-w-7xl">
                    <header className="sm:flex-row flex-col gap-4 w-full flex justify-between mb-6 lg:pt-0 sm:pt-6 pt-0">
                        <div>
                            <h1 className="font-bold sm:text-3xl text-2xl">Dashboard Financeiro</h1>
                            <span className="sm:text-base text-sm mt-2 text-gray-500">Acompanhe suas finanças em um só lugar</span>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => setModalAddTransaction(true)} className="sm:text-base text-sm sm:px-5 px-2 bg-emerald-600 py-1 text-white font-medium rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-700">
                                Nova Transação
                            </button>
                        </div>
                    </header>

                    <Transaction />

                    <div className="flex sm:flex-row flex-col gap-4">
                        <div className="flex-col flex mt-4 gap-4 flex-1">
                            <RecentTransactions />
                            <Card />
                        </div>
                        <div className="flex-1 mt-4">
                            <Graphic />
                        </div>
                    </div>
                </main>

                {modalAddTransaction && <ModalAddTransaction closeModal={() => setModalAddTransaction(false)} />}
            </div>
        </div>
    )
}