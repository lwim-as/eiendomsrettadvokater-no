import { useContext, useRef, useState } from "react"
import { FormContext } from "../FormContext"

import { select_container, selected_item, select_header, has_selected, drop_btn } from '../styles/Sidebar.module.css'

export function CustomSelect({ name, hint, options}) {

    const inputRef = useRef(null)
    const { state, setState } = useContext(FormContext)
    const [toggled, setToggled] = useState(false)

    function handleChange(e) {
        const newValue = state.filter(item => {
            if (item.name === inputRef.current.dataset.name) {
                item.value = e.target.textContent
            }
        })
        setState(state => state, ...newValue)
        setToggled(!toggled)
    }

    function returnValue() {
        const value = state.filter(item => item.name === name)

        return value[0].value
    }

    return (
        <div className={select_container}>
            <div className={selected_item} onFocus={() => setToggled(!toggled)} onClick={() => setToggled(!toggled)}>
                <p className={returnValue() === "" ? (select_header) : (select_header, has_selected)}>{hint}</p>
                <p tabIndex={0} ref={inputRef} data-name={name}>{returnValue()}</p>
                <i aria-hidden="true" className={`fal fa-${toggled ? "times" : "angle-down"} ${drop_btn}`}></i>
            </div>
            {toggled ? (
                <ul>
                    {options.map(option => (
                        <CustomSelectItem handleClick={handleChange} key={option} value={option} />
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export function CustomSelectItem({ value, handleClick }) {
    return <li onClick={handleClick}>{value}</li>
}
