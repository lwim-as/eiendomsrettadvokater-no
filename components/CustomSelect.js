import { useContext, useRef, useState } from "react"
import { FormContext } from "../FormContext"

import { select_container, selected_item, select_header, has_selected } from '../styles/Sidebar.module.css'

export function CustomSelect({ name, hint, options }) {
    const inputRef = useRef(null)

    const { state, setState } = useContext(FormContext)
    const [toggled, setToggled] = useState(false)

    function handleChange(e) {
        setState({ ...state, [inputRef.current.name]: e.target.textContent })
        setToggled(state => !state)

        console.log(state)
    }



    return (
        <div className={select_container}>
            <div className={selected_item} onClick={() => setToggled(!toggled)}>
                {state[name] === "" ? (
                    <>
                        <p className={select_header}>{hint}</p>
                        <input style={{ display: "none" }} ref={inputRef} disabled readOnly name={name} value={state[name]} />
                    </>
                ) :
                    (<>
                        <p className={select_header, has_selected}>{hint}</p>
                        <input ref={inputRef} disabled readOnly name={name} value={state[name]} />
                    </>)}
                <span>{toggled ? "X" : "V"}</span>
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
