import { useEffect, useState } from "react";
import { Nav } from "../../components/nav";
import { FiPlusCircle } from "react-icons/fi";
import { ModalAddActivity } from "../../components/activities/modal/modalAddActivity";
import { LayoutActivities } from "../../components/activities/layoutActivities";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import { FormatDate } from "../../utils/formatDate";

interface GetActivitiesProps {
    subject: string;
    details: string;
    dateTime: string;
    status: string;
    docId: string;
}


export function Activities() {
    const [modalAddActivity, setModalAddActivity] = useState(false)
    const [activitiesList, setActivitiesList] = useState<GetActivitiesProps[]>([])

    useEffect(() => {
        const q = query(
            collection(db, 'activities'),
            where('userId', '==', auth.currentUser?.uid)
        )

        const unsub = onSnapshot(q, (snapshot) => {
            let list: GetActivitiesProps[] = []

            snapshot.forEach((doc) => {
                const item = doc.data()

                list.push({
                    subject: item.subject,
                    details: item.details,
                    dateTime: item.dateTime,
                    status: item.status,
                    docId: doc.id
                })
            })
            setActivitiesList(list)
        })

        return () => {
            unsub()
        }
    }, [])

    const toDo = activitiesList.filter((item) => item.status === 'A Fazer')
    const inProgress = activitiesList.filter((item) => item.status === 'Em Andamento')
    const completed = activitiesList.filter((item) => item.status === 'Concluído')

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

                        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">A Fazer</h1>
                                {toDo.length > 0 && (
                                    <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">{toDo.length}</span>
                                )}
                            </header>

                            {toDo.length === 0 && (
                                <span className="flex items-center justify-center text-gray-500 h-7/12">
                                    Nenhuma atividade cadastrada
                                </span>
                            )}

                            {toDo.map((item) => (
                                <LayoutActivities
                                    key={item.docId}
                                    subject={item.subject}
                                    details={item.details}
                                    dateTime={FormatDate(item.dateTime).dateHourFormatted}
                                />
                            ))}

                        </section>

                        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">Em Andamento</h1>
                                {toDo.length > 0 && (
                                    <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">{inProgress.length}</span>
                                )}
                            </header>

                            {inProgress.length === 0 && (
                                <span className="flex items-center justify-center text-gray-500 h-7/12">
                                    Nenhuma atividade cadastrada
                                </span>
                            )}

                            {inProgress.map((item) => (
                                <LayoutActivities
                                    key={item.docId}
                                    subject={item.subject}
                                    details={item.details}
                                    dateTime={FormatDate(item.dateTime).dateHourFormatted}
                                />
                            ))}
                        </section>

                        <section className="bg-white rounded-md border border-gray-200 shadow-lg py-2 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 115px)' }}>
                            <header className="flex justify-between items-center mb-4">
                                <h1 className="text-lg font-medium">Concluído</h1>
                                {completed.length > 0 && (
                                    <span className="bg-gray-100 px-3 border border-gray-200 rounded-full text-sm">{completed.length}</span>
                                )}
                            </header>

                            {completed.length === 0 && (
                                <span className="flex items-center justify-center text-gray-500 h-7/12">
                                    Nenhuma atividade cadastrada
                                </span>
                            )}

                            {completed.map((item) => (
                                <LayoutActivities
                                    key={item.docId}
                                    subject={item.subject}
                                    details={item.details}
                                    dateTime={FormatDate(item.dateTime).dateHourFormatted}
                                />
                            ))}
                        </section>
                    </div>

                    {modalAddActivity && <ModalAddActivity closeModal={() => setModalAddActivity(false)} />}

                </main>
            </div>
        </div>
    )
}