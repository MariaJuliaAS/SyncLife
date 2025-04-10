import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt'
import './calendar.css'
import { EventsCalendarProps } from '../../pages/home';

interface CalendarProps {
    openModalAdd: (info: DateClickArg) => void;
    events: EventsCalendarProps[]
}

export function Calendar({ openModalAdd, events }: CalendarProps) {
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

        />
    )
}