import { useField } from "formik"
import { useState } from "react"

import {
    select_container,
    selected_item,
    select_header,
    has_selected,
    drop_btn
}
    from '../styles/Sidebar.module.css'

export function FormikCustomSelect({ name, hint, options }) {
    const [field, , helpers] = useField(name)
    const [toggled, setToggled] = useState(false)

    const { value } = field

    function handleChange(e) {
        const { setValue } = helpers
        setValue(e.target.textContent)
        setToggled(!toggled)

    }

    return (
        <div className={select_container}>
            <div className={selected_item} onFocus={() => setToggled(!toggled)} onClick={() => setToggled(!toggled)}>
                <p className={value === "" ? (select_header) : (select_header, has_selected)}>{hint}</p>
                <p tabIndex={0} data-name={name}>{value}</p>
                <i aria-hidden="true" className={`fal fa-${toggled ? "times" : "angle-down"} ${drop_btn}`}></i>
            </div>
            {toggled ? (
                <ul>
                    {options.map(option => (
                        <CustomSelectItem handleClick={handleChange} name={name} key={option} value={option} />
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export function CustomSelectItem({ value, handleClick }) {


    return <li onClick={handleClick}>{value}</li>
}
