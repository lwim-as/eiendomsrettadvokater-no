import { Field } from "formik"
import { useState } from "react"

import { select_container, selected_item, select_header, has_selected } from '../styles/Sidebar.module.css'

export function CustomSelect({ options, name, handleChange, value, setToggled, toggleState, hint }) {

    return (
        <div className={select_container}>
            <div className={selected_item} onClick={() => setToggled(!toggleState)}>
                {value === "" ? <p className={select_header}>{hint}</p> :
                    (<>
                        <p className={select_header, has_selected}>{hint}</p>
                        {value}
                    </>)}
                <span>{toggleState ? "X" : "V"}</span>
            </div>
            <ul style={toggleState ? { display: "block" } : { display: "none" }}>
                {options.map(option => (
                    <CustomSelectItem handleClick={handleChange} key={option} value={option} />
                ))}
            </ul>
            <Field hidden value={value} name={name} as="select">
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </Field>
        </div>
    )
}

export function CustomSelectItem({ value, handleClick }) {
    return (
        <li onClick={handleClick}>{value}</li>
    )
}
