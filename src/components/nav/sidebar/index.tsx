import { GrTarget } from "react-icons/gr";
import { GoCalendar, GoCreditCard } from "react-icons/go";
import { LuNotebookPen } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebaseConnection";

export function Siderbar() {

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <div className="flex flex-col justify-between min-h-screen w-64 border-r border-gray-200 px-4">
            <div>
                <header className="flex my-5">
                    <GrTarget color="#fff" className="sm:text-4xl text-3xl mr-2 bg-emerald-600 rounded-xl p-1" />
                    <p className="sm:text-3xl font-bold text-2xl select-none text-gray-800">SyncLife</p>
                </header>

                <nav className="flex flex-col gap-4 pt-7 pl-1">
                    <NavLink to='/' className={({ isActive }) => `select-none cursor-pointer flex items-center text-lg  rounded-md py-1 transition-all duration-200 hover:bg-emerald-600/10 hover:px-4 hover:text-emerald-600 ${isActive ? 'bg-emerald-600/10 text-emerald-600 px-4' : 'text-black'}`}  >
                        <GoCalendar size={25} className="mr-3" />
                        Agenda
                    </NavLink>
                    <NavLink to='/activities' className={({ isActive }) => `select-none cursor-pointer flex items-center text-lg  rounded-md py-1 transition-all duration-200 hover:bg-emerald-600/10 hover:px-4 hover:text-emerald-600 ${isActive ? 'bg-emerald-600/10 text-emerald-600 px-4' : 'text-black'}`}>
                        <LuNotebookPen size={25} className="mr-3" />
                        Atividades
                    </NavLink>
                    <NavLink to='/finances' className={({ isActive }) => `select-none cursor-pointer flex items-center text-lg  rounded-md py-1 transition-all duration-200 hover:bg-emerald-600/10 hover:px-4 hover:text-emerald-600 ${isActive ? 'bg-emerald-600/10 text-emerald-600 px-4' : 'text-black'}`}>
                        <GoCreditCard size={25} className=" mr-3 " />
                        Finanças
                    </NavLink>
                </nav>
            </div>

            <footer className="border-t border-gray-300 mb-4 pl-1">
                <button onClick={handleLogout} className="w-full mt-4 select-none cursor-pointer flex items-center text-lg rounded-md py-1 transition-all duration-200 hover:bg-red-500/10 hover:px-4 hover:text-red-500">
                    <IoExitOutline size={25} className=" mr-3 " />
                    Sair
                </button>
            </footer>
        </div>
    )
}