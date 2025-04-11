import { signOut } from "firebase/auth";
import { useState } from "react";
import { GoCalendar, GoCreditCard } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebaseConnection";
import { GrTarget } from "react-icons/gr";

export function Header() {
    const [statusNav, setStatusNav] = useState(false)

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <main className="bg-gray-50">
            <header className="absolute right-6 top-5">
                <button onClick={() => setStatusNav(!statusNav)} className="cursor-pointer transition-all duration-200 hover:scale-105">
                    <TbMenu2 size={35} />
                </button>
            </header>

            {statusNav &&
                <section >
                    <div className="absolute top-14 right-8 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
                    <nav className="bg-white px-5 py-7 absolute right-5 top-16 z-10 rounded-lg shadow-lg sm:w-64 w-54">
                        <div className="flex mb-5">
                            <GrTarget color="#fff" className="sm:text-4xl text-3xl mr-2 bg-emerald-600 rounded-xl p-1" />
                            <p className="sm:text-3xl font-bold text-2xl select-none text-gray-800">SyncLife</p>
                        </div>
                        <Link to='/' className="sm:text-lg text-base select-none cursor-pointer flex items-center justify-between rounded-md py-1 transition-all duration-200 hover:bg-emerald-600/10 hover:px-4 hover:text-emerald-600">
                            <div className="flex items-center">
                                <GoCalendar className="mr-3 sm:text-[25px] text-xl" />
                                Agenda
                            </div>
                            <span className="text-gray-400 group-hover:text-emerald-600">›</span>
                        </Link>
                        <Link to='/finances' className="sm:text-lg text-base select-none cursor-pointer flex items-center justify-between rounded-md py-1 transition-all duration-200 hover:bg-emerald-600/10 hover:px-4 hover:text-emerald-600">
                            <div className="flex items-center">
                                <GoCreditCard className=" mr-3 sm:text-[25px] text-xl" />
                                Finanças
                            </div>
                            <span className="text-gray-400 group-hover:text-emerald-600">›</span>
                        </Link>
                        <div className="border-t border-gray-300 mt-4">
                            <div className="mt-1 flex items-center justify-between w-full select-none cursor-pointer text-lg rounded-md py-1 transition-all duration-200 hover:bg-red-500/10 hover:px-4 hover:text-red-500">
                                <button onClick={handleLogout} className="flex items-center sm:text-lg text-base">
                                    <IoExitOutline className=" mr-3 sm:text-[25px] text-xl" />
                                    Sair
                                </button>
                                <span className="text-gray-400 group-hover:text-emerald-600">›</span>
                            </div>
                        </div>
                    </nav>
                </section>
            }
        </main>

    )
}