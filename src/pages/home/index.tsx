import { useEffect, useState } from "react"
import { ModalAdd } from "../../components/calendar/modalAdd"
import { ModalEdit } from "../../components/calendar/modalEdit"
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { auth, db } from "../../services/firebaseConnection"
import { EventClickArg } from "@fullcalendar/core/index.js"
import toast from "react-hot-toast"
import { Siderbar } from "../../components/sidebar"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt'
import './calendar.css'

interface EventsCalendarProps {
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
    }

    async function moveEvent(info: EventClickArg | EventResizeDoneArg) {
        const event = info.event
        const eventRef = doc(db, 'events', event.id)

        await updateDoc(eventRef, {
            start: event.startStr,
            end: event.endStr
        })
            .then(() => {
                toast.success('Evento editado com sucesso!')
            })
            .catch((error) => {
                console.log('Erro ao editar evento movendo: ' + error)
            })
    }

    return (
        <div className="flex">
            <Siderbar />

            <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex justify-center bg-gray-50'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                    themeSystem="standard"
                    initialView={window.innerWidth <= 850 ? 'timeGridDay' : 'timeGridWeek'}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    locale='pt'
                    locales={[ptLocale]}
                    allDaySlot={false}
                    events={events}
                    nowIndicator={true}
                    dateClick={openModalAdd}
                    eventClick={openModalEdit}
                    editable={true}
                    droppable={true}
                    eventDrop={moveEvent}
                    eventResize={moveEvent}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        meridiem: 'short'
                    }}
                    titleFormat={{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }}
                />

                {statusModalAdd && <ModalAdd
                    closeModal={() => setStatusModalAdd(false)}
                    dateSelected={dateSelected}
                />}

                {statusModalEdit && <ModalEdit
                    closeModal={() => setStatusModalEdit(false)}
                    docEventId={docEventId}
                />}
            </main>
        </div>

    )
}