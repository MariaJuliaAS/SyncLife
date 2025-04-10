import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt'
import './calendar.css'
import { EventsCalendarProps } from '../../pages/home';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { db } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface CalendarProps {
    openModalAdd: (info: DateClickArg) => void;
    openModalEdit: (info: EventClickArg) => void;
    events: EventsCalendarProps[]
}

export function Calendar({ openModalAdd, openModalEdit, events }: CalendarProps) {

    async function moveEvent(info: EventClickArg | EventResizeDoneArg) {
        const event = info.event
        console.log(event)
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
    )
}