import { useEffect, useState } from "react"
import { Calendar } from "../../components/calendar/calendar"
import { ModalAdd } from "../../components/calendar/modalAdd"
import { ModalEdit } from "../../components/calendar/modalEdit"
import { DateClickArg } from "@fullcalendar/interaction/index.js"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "../../services/firebaseConnection"
import { EventClickArg } from "@fullcalendar/core/index.js"

export interface EventsCalendarProps {
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    borderColor: string;
    id: string;
}

export function Home() {
    const [statusModalAdd, setStatusModalAdd] = useState(false)
    const [statusModalEdit, setStatusModalEdit] = useState(false)
    const [docEventId, setDocEventId] = useState('')
    const [dateSelected, setDateSelected] = useState('')
    const [events, setEvents] = useState<EventsCalendarProps[]>([])

    useEffect(() => {
        const q = query(
            collection(db, 'events'),
            where('userId', '==', auth.currentUser?.uid)
        )

        const unsub = onSnapshot(q, (snapshot) => {
            let list: EventsCalendarProps[] = []

            snapshot.forEach((item) => {
                list.push({
                    title: item.data().title,
                    start: item.data().start,
                    end: item.data().end,
                    backgroundColor: item.data().backgroundColor,
                    borderColor: item.data().borderColor,
                    id: item.id,
                })
            })
            setEvents(list)
        })

        return () => {
            unsub()
        }

    }, [])

    function openModalAdd(info: DateClickArg): void {
        setStatusModalAdd(true)
        setDateSelected(info.dateStr)
    }

    function openModalEdit(info: EventClickArg): void {
        setStatusModalEdit(true)
        setDocEventId(info.event.id)
        console.log(info.event)
    }

    return (
        <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex justify-center '>
            <Calendar events={events} openModalAdd={openModalAdd} openModalEdit={openModalEdit} />

            {statusModalAdd && <ModalAdd
                closeModal={() => setStatusModalAdd(false)}
                dateSelected={dateSelected}
            />}

            {statusModalEdit && <ModalEdit
                closeModal={() => setStatusModalEdit(false)}
                docEventId={docEventId}
            />}
        </main>

    )
}