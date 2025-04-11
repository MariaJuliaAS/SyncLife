import { EventsProps } from "./modalAdd"
import { Input } from "../input"

interface FormProps {
    eventsInfos: EventsProps;
    setEventsInfos: React.Dispatch<React.SetStateAction<EventsProps>>;
    disableEditing?: boolean;
}

export function LayoutFormModal({ eventsInfos, setEventsInfos, disableEditing }: FormProps) {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Título</label>
            <Input
                placeholder="Reunião de equie"
                value={eventsInfos?.title}
                onChange={(e) => setEventsInfos(prev => ({ ...prev, title: e.target.value }))}
                required
                disabled={disableEditing}
            />

            <label className="sm:text-base text-sm mb-2 font-medium">Descrição</label>
            <textarea
                placeholder="Detalhes do evento..."
                className="border border-gray-200 rounded-md outline-none p-2 mb-4 bg-white"
                rows={3}
                value={eventsInfos?.description}
                onChange={(e) => setEventsInfos(prev => ({ ...prev, description: e.target.value }))}
                disabled={disableEditing}
            />

            <section>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col w-full">
                        <label className="sm:text-base text-sm mb-2 font-medium">Data de Início</label>
                        <Input
                            type="date"
                            value={eventsInfos?.startDate}
                            onChange={(e) => setEventsInfos(prev => ({ ...prev, startDate: e.target.value }))}
                            required
                            disabled={disableEditing}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="sm:text-base text-sm mb-2 font-medium">Hora de Início</label>
                        <Input
                            type="time"
                            value={eventsInfos?.startHour}
                            onChange={(e) => setEventsInfos(prev => ({ ...prev, startHour: e.target.value }))}
                            required
                            disabled={disableEditing}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col w-full">
                        <label className="sm:text-base text-sm mb-2 font-medium">Data de Fim</label>
                        <Input
                            type="date"
                            value={eventsInfos?.endDate}
                            min={eventsInfos.startDate}
                            onChange={(e) => setEventsInfos(prev => ({ ...prev, endDate: e.target.value }))}
                            required
                            disabled={disableEditing}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="sm:text-base text-sm mb-2 font-medium">Hora de Fim</label>
                        <Input
                            type="time"
                            value={eventsInfos?.endHour}
                            min={eventsInfos.startHour}
                            onChange={(e) => setEventsInfos(prev => ({ ...prev, endHour: e.target.value }))}
                            required
                            disabled={disableEditing}
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-row items-center justify-center gap-4 mb-5 border-b border-b-gray-200">
                <div className="flex flex-col w-full mb-10">
                    <label className="sm:text-base text-sm mb-2 font-medium">Status</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="accent-emerald-600 mr-3"
                            checked={eventsInfos.status}
                            onChange={(e) => setEventsInfos(prev => ({ ...prev, status: e.target.checked }))}
                            disabled={disableEditing}
                        />
                        <label>{eventsInfos.status ? 'Concluído' : 'Pendente'}</label>
                    </div>
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="sm:text-base text-sm mb-2 font-medium">Cor do Evento</label>
                    <Input
                        type="color"
                        value={eventsInfos.backgroundColor}
                        onChange={(e) => setEventsInfos(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        disabled={disableEditing}
                    />
                </div>
            </section>

        </>
    )
}