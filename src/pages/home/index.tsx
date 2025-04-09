import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import ptLocale from '@fullcalendar/core/locales/pt'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './calendar.css'


export function Home() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
            themeSystem="bootstrap5"
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            locale='pt'
            locales={[ptLocale]}
            events={[
                { title: 'Evento 1', date: '2025-04-09' },
                { title: 'Evento 2', date: '2025-04-10' },
            ]}
        />
    )
}