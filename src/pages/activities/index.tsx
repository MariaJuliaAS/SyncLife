import { useContext, useState } from "react";
import { Nav } from "../../components/nav";
import { FiPlusCircle } from "react-icons/fi";
import { ModalAddActivity } from "../../components/activities/modal/modalAddActivity";
import { ActivitiesSection } from "../../components/activities/activitiesSection";
import { ActivitiesContext } from "../../context/ActivitiesContext";


export function Activities() {
    const [modalAddActivity, setModalAddActivity] = useState(false)
    const { filterActivities } = useContext(ActivitiesContext)

    return (
        <div className="flex">
            <Nav />

            <div className='sm:px-12 w-full min-h-screen py-6 px-4 flex bg-gray-50 justify-center'>
                <main className="w-full xl:max-w-11/12 sm:max-w-8/12 max-w-full">
                    <header className="sm:flex-row flex-col gap-4 w-full flex justify-between items-start mb-6 lg:pt-0 sm:pt-6 pt-0">
                        <h1 className="font-bold lg:text-3xl text-2xl">Minhas Atividades</h1>

                        <div className="flex items-center">
                            <button onClick={() => setModalAddActivity(true)} className="lg:text-base text-sm sm:px-5 px-2 sm:py-2 bg-emerald-600 py-1 text-white flex items-center font-medium rounded-md cursor-pointer transition-all duration-200 hover:bg-emerald-700">
                                <FiPlusCircle className="sm:text-lg text-base mr-2" />
                                Nova Atividade
                            </button>
                        </div>
                    </header>

                    <div className="xl:grid-cols-3 grid grid-cols-1 gap-12" >
                        <ActivitiesSection list={filterActivities.toDo} status="A Fazer" />
                        <ActivitiesSection list={filterActivities.inProgress} status="Em Andamento" />
                        <ActivitiesSection list={filterActivities.completed} status="Concluído" />
                    </div>

                    {modalAddActivity && <ModalAddActivity closeModal={() => setModalAddActivity(false)} />}

                </main>
            </div>
        </div>
    )
}