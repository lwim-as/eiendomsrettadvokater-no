import React from "react"
import {success_container} from '../../styles/Sidebar.module.css'
export function FormSuccess({ handleState }) {

    function removePopup() {
        handleState(false)
    }

    return (
        <div className={success_container}>
            <i onClick={removePopup} aria-hidden="true" className="fal fa-times"></i>
            <p>Takk, du vil motta 3 tilbud innen kort tid</p>
        </div>
    )
}