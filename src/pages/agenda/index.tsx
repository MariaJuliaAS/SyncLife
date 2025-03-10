import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import ptLocale from '@fullcalendar/core/locales/pt'
import '../../styles/agenda.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../services/firebaseConnection';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { ModalAddTarefa } from '../../components/componentsAgenda/modalAddTarefa';
import { ModalInfoTarefa } from '../../components/componentsAgenda/modalInfoTarefa';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

interface EventosProps {
    title: string;
    start: string;
    end: string;
    description: string;
    status: string;
    priority: string;
    backgroundColor: string;
    borderColor: string;
    id: string;
}

export function Agenda() {

    const [eventos, setEventos] = useState<EventosProps[]>()
    const [loading, setLoading] = useState(true)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [modlaObj, setModalObj] = useState<EventosProps>({
        title: '',
        start: '',
        end: '',
        description: '',
        status: '',
        priority: '',
        backgroundColor: '',
        borderColor: '',
        id: '',
    })
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null)

    useEffect(() => {
        const unsubeAuth = auth.onAuthStateChanged((user) => {
            if (user) {

                const q = query(
                    collection(db, 'tarefas'),
                    where('userId', '==', user.uid)
                )

                const unsbutFirestore = onSnapshot(q, (snapshot) => {
                    let list: EventosProps[] = [];

                    snapshot.forEach((doc) => {
                        list.push({
                            title: doc.data().titulo,
                            start: doc.data().dataHoraInicio,
                            end: doc.data().dataHoraFim,
                            description: doc.data().descricao,
                            status: doc.data().status,
                            priority: doc.data().prioridade,
                            backgroundColor: doc.data().backgroundColor,
                            borderColor: doc.data().backgroundColor,
                            id: doc.id,
                        })
                    })

                    setEventos(list)
                    setLoading(false)

                })
            } else {
                setEventos([])
            }
        })

    }, [])

    async function moverEvento(info: EventClickArg | EventResizeDoneArg) {
        const event = info.event;
        const docRef = doc(db, 'tarefas', event.id)

        try {
            await updateDoc(docRef, {
                dataHoraInicio: event.startStr,
                dataHoraFim: event.endStr
            })
            toast.success('Evento editado com sucesso!')
        }
        catch (err) {
            console.log(err)
        }
    }

    function abrirModalAdd(info: DateClickArg): void {
        setModalAdd(true);
        setDataSelecionada(info.dateStr);
    }

    function abrirModalInfo(info: EventClickArg): void {
        const event = info.event;
        console.log(event)
        setModalObj({
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            description: event.extendedProps.description,
            status: event.extendedProps.status,
            priority: event.extendedProps.priority,
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor,
            id: event.id,
        });
        console.log(event)
        setModalInfo(true);
    }

    if (loading) {
        return (
            <div className='loading'>
                <CircularProgress size={50} color='primary' thickness={5} style={{ color: '#0B5ED7' }} />
            </div>
        )
    }


    return (
        <div className='container'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
                initialView='dayGridMonth'
                weekends={true}
                themeSystem='bootstrap5'
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                locale='pt'
                locales={[ptLocale]}
                dateClick={abrirModalAdd}
                events={eventos}
                eventClick={abrirModalInfo}
                editable={true}
                droppable={true}
                eventDrop={moverEvento}
                eventResize={moverEvento}
                eventDidMount={(info) => {
                    if (info.event.extendedProps.status === 'Concluido') {
                        info.el.style.textDecoration = 'line-through';
                        info.el.style.opacity = '0.6';
                    }
                }}
            />
            <AnimatePresence>
                {modalAdd && <ModalAddTarefa fecharModal={() => setModalAdd(false)} dataSelecionada={dataSelecionada} />}
                {modalInfo && <ModalInfoTarefa infos={modlaObj} fecharModal={() => { setModalInfo(false) }} />}
            </AnimatePresence>

        </div>
    )
}
