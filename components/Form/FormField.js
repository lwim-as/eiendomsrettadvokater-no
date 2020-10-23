export function FormField({ type = "text", name, label, handleChange }) {
    if (type !== "textarea") {
        return (
            <label>
                {label}
                <input
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    name={name}
                    onChange={handleChange}
                    type={type}
                />
            </label>
        )
    }

    return (
        <label>
            {label}
            <textarea
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleFocus}
                onChange={handleChange}
                name={name}
            />
        </label>
    )
}