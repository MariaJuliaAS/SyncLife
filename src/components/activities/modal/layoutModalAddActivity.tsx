import { Input } from "../../input";


export function LayoutModalAddActivity() {
    return (
        <>
            <label className="sm:text-base text-sm mb-2 font-medium">Matéria</label>
            <Input
                placeholder="Ex.: Fundamentos de Cálculo"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Detalhes</label>
            <textarea
                placeholder="Descreva a atividade..."
                rows={3}
                className="border border-gray-200 rounded-md outline-none px-2 mb-4 bg-white"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Data de Entrega</label>
            <Input
                type="datetime-local"
            />
            <label className="sm:text-base text-sm mb-2 font-medium">Status</label>
            <select
                required
                className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
            >
                <option value="A Fazer">A Fazer</option>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluído">Concluído</option>
            </select>
        </>
    )
}