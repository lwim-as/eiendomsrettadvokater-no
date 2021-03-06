import { useField } from "formik"
import { useState } from "react"
import { faAngleDown, faTimes } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    select_container,
    selected_item,
    select_header,
    has_selected,
    drop_btn,
    select_error
} from '../../styles/Sidebar.module.css'

export function Select({ name, hint, options }) {
    const [field, form, helpers] = useField(name)
    const [toggled, setToggled] = useState(false)

    const { value } = field
    const { error } = form
    const { setValue } = helpers

    function handleChange(e) {
        
        setValue(e.target.textContent, true)
        setToggled(!toggled)

    }
    return (
        <div className={select_container}>
            <div className={selected_item} onFocus={() => setToggled(!toggled)} onClick={() => setToggled(!toggled)}>
                <p className={value === "" ? (select_header) : (select_header, has_selected)}>{hint}</p>
                <p tabIndex={0} data-name={name}>{value}</p>
                <FontAwesomeIcon className={drop_btn} icon={toggled ? faAngleDown : faTimes}/>
                {error !== "" ? <span className={select_error}>{error}</span> : null}
            </div>
            {toggled ? (
                <ul>
                    {options.map(option => (
                        <SelectItem handleClick={handleChange} name={name} key={option} value={option} />
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export function SelectItem({ value, handleClick }) {


    return <li onClick={handleClick}>{value}</li>
}
