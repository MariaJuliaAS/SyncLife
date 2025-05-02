import { Input } from "../../input";
import { ActitivitiesProps } from "./modalAddActivity";

interface LayoutModalAddActivityProps {
    activities: ActitivitiesProps;
    setActivities: React.Dispatch<React.SetStateAction<ActitivitiesProps>>;
}

export function LayoutModalAddActivity({ activities, setActivities }: LayoutModalAddActivityProps) {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Matéria</label>
            <Input
                required
                value={activities.subject}
                onChange={(e) => setActivities(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Ex.: Fundamentos de Cálculo"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Detalhes</label>
            <textarea
                value={activities.details}
                onChange={(e) => setActivities(prev => ({ ...prev, details: e.target.value }))}
                placeholder="Descreva a atividade..."
                rows={3}
                className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Data de Entrega</label>
            <Input
                type="datetime-local"
                required
                value={activities.dateTime}
                onChange={(e) => setActivities(prev => ({ ...prev, dateTime: e.target.value }))}
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Status</label>
            <select
                required
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
                value={activities.status}
                onChange={(e) => setActivities(prev => ({ ...prev, status: e.target.value }))}
            >
                <option value="A Fazer">A Fazer</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
            </select>
        </>
    )
}