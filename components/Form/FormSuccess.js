import React from "react"
import { success_container } from '../../styles/Sidebar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from '@fortawesome/pro-light-svg-icons'

export function FormSuccess({ handleState }) {

    function removePopup() {
        handleState(false)
    }

    return (
        <div className={success_container}>
            <FontAwesomeIcon onClick={removePopup} icon={faTimes} />
            <p>Takk, du vil motta 3 tilbud innen kort tid</p>
        </div>
    )
}