import { useEffect, useState } from "react"
import { Calendar } from "../../components/calendar/calendar"
import { ModalAdd } from "../../components/calendar/modalAdd"
import { DateClickArg } from "@fullcalendar/interaction/index.js"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { auth, db } from "../../services/firebaseConnection"

export interface EventsCalendarProps {
    title: string;
    start: string;
    end: string;
    backgroundColor: string;
    borderColor: string;
    docId: string
}

export function Home() {
    const [statusnModalAdd, setStatusModalAdd] = useState(false)
    const [dateSelected, setDateSelected] = useState('')
    const [events, setEvents] = useState<EventsCalendarProps[]>([])

    function openModalAdd(info: DateClickArg): void {
        setStatusModalAdd(true)
        setDateSelected(info.dateStr)
    }

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
                    start: item.data().startDate + 'T' + item.data().startHour,
                    end: item.data().endDate + 'T' + item.data().endHour,
                    backgroundColor: item.data().backgroundColor,
                    borderColor: item.data().borderColor,
                    docId: item.id
                })
            })
            setEvents(list)
            console.log(list)
        })

        return () => {
            unsub()
        }

    }, [])

    return (
        <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex justify-center '>
            <Calendar events={events} openModalAdd={openModalAdd} />

            {statusnModalAdd && <ModalAdd
                closeModal={() => setStatusModalAdd(false)}
                dateSelected={dateSelected}
            />}
        </main>

    )
}