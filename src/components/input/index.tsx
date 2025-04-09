import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export function Input(props: InputProps) {
    return (
        <input
            className="border border-gray-200 h-10 rounded-md outline-none px-2 mb-4 bg-white"
            {...props}
        />
    )
}