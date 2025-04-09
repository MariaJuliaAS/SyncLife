import { useState } from "react"
import { Calendar } from "../../components/calendar/calendar"
import { ModalAdd } from "../../components/calendar/modalAdd"
import { DateClickArg } from "@fullcalendar/interaction/index.js"

export function Home() {
    const [statusnModalAdd, setStatusModalAdd] = useState(false)
    const [dateSelected, setDateSelected] = useState('')

    function openModalAdd(info: DateClickArg): void {
        setStatusModalAdd(true)
        setDateSelected(info.dateStr)
    }

    return (
        <main className='sm:px-12 w-full max-h-screen py-6 px-4 flex justify-center '>
            <Calendar openModalAdd={openModalAdd} />

            {statusnModalAdd && <ModalAdd
                closeModal={() => setStatusModalAdd(false)}
                dateSelected={dateSelected}
            />}
        </main>

    )
}