import { ImSpinner2 } from "react-icons/im";

export function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <ImSpinner2 size={50} className="text-emerald-600 animate-spin" />
        </div>
    )
}