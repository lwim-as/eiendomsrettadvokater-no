import { useRef } from "react"

export function FormField({ type = "text", name, label, handleChange }) {
    const inputRef = useRef(null)

    if (type !== "textarea") {
        return (
            <label>
                {label}
                <input ref={inputRef} name={name} onChange={handleChange} type={type} />
            </label>
        )
    }

    return (
        <label>
            {label}
            <textarea ref={inputRef} onChange={handleChange} name={name} />
        </label>
    )
}