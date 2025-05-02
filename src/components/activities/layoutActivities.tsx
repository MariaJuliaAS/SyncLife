import { GoCalendar, GoKebabHorizontal } from "react-icons/go";


export function LayoutActivities() {
    return (
        <article className="border border-gray-200 rounded-lg p-4">
            <header className="flex justify-between items-center mb-6">
                <h3 className="bg-gray-100 px-3 py-1 rounded-full text-sm">Fundamento de Cáculo</h3>
                <GoKebabHorizontal className="text-lg cursor-pointer" />
            </header>

            <div>
                <p>Lista de exercícios sobre integrais duplas</p>
                <span className="flex items-center mt-2.5 text-gray-400 text-sm">
                    <GoCalendar className="mr-2" />
                    Entrega: 09/05/2025
                </span>
            </div>
        </article>
    )
}