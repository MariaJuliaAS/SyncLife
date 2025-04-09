import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt'
import './calendar.css'

interface CalendarProps {
    openModalAdd: (info: DateClickArg) => void;
}

export function Calendar({ openModalAdd }: CalendarProps) {
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
            events={[
                { title: 'Evento 1', date: '2025-04-09' },
                { title: 'Evento 2', date: '2025-04-10' },
            ]}
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
            nowIndicator={true}
            dateClick={openModalAdd}
        />
    )
}