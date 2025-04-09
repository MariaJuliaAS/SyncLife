import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt'
import './calendar.css'

export function Home() {
    return (
        <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex justify-center '>
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
                events={[
                    { title: 'Evento 1', date: '2025-04-09' },
                    { title: 'Evento 2', date: '2025-04-10' },
                ]}
            />
        </main>

    )
}