import React, { useContext, useState } from 'react';

import { sidebar_container, form, form_step, form_indicator_container } from '../styles/Sidebar.module.css'
import { CustomSelect } from './CustomSelect';
import Link from 'next/link';

import { FormContext } from '../FormContext'

export default function Sidebar() {

    const { state, setState } = useContext(FormContext)

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    function handleChange(e) {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    return (
        <aside className={sidebar_container}>
            <MultistepForm
                handleSubmit={(state) => {
                    return fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "sidebar", ...state })
                    })
                }}
            >
                <FormStep>
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br />Å motta tilbud er <u>gratis og uforpliktende.</u></p>
                    <CustomSelect
                        name="advokat_type"
                        hint="Hva handler saken om?"
                        options={["Annet", "Heve boligkjøp", "Prisavslag og erstatning", "Klage på nybygg", "Selgers rettigheter", "Skjulte feil og mangler", "Håndverkertvister", "Nabotvister", "Plan-og bygningsrett"]}
                    />
                </FormStep>
                <FormStep>
                    <h2>Beskriv oppdraget:</h2>
                    <CustomSelect
                        name="advokat_type"
                        hint="Du har valgt:"
                        options={["Annet", "Heve boligkjøp", "Prisavslag og erstatning", "Klage på nybygg", "Selgers rettigheter", "Skjulte feil og mangler", "Håndverkertvister", "Nabotvister", "Plan-og bygningsrett"]}
                    />
                    <textarea name="description" onChange={handleChange} />
                </FormStep>
                <FormStep>
                    <h2>Din informasjon:</h2>
                    <label>
                        Navn
                        <input onChange={handleChange} name="name" type="text" />
                    </label>
                    <label>
                        E-post
                        <input onChange={handleChange} name="email" type="email" />
                    </label>
                    <label>
                        Telefon
                        <input onChange={handleChange} name="phone" type="tel" />
                    </label>
                </FormStep>
            </MultistepForm>
        </aside>
    );
}

export function FormStep({ children }) {
    return <div className={form_step}>{children}</div>
}

export function MultistepForm({ children, handleSubmit }) {

    const { state, setState } = useContext(FormContext)

    function handleChange(e) {
        const { name, value } = e.target
        setState({ [name]: value })
    }

    const childrenArr = React.Children.toArray(children)

    const [step, setStep] = useState(0)
    const currentChild = childrenArr[step]

    function isLastStep() {
        return step === childrenArr.length - 1
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                if (isLastStep()) {
                    await handleSubmit(state)
                } else {
                    setStep(step => step + 1)
                }
            }}
            className={form} name="sidebar" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input onChange={handleChange} hidden disabled name="name" />
            <input onChange={handleChange} hidden disabled name="advokat_type" />
            <input onChange={handleChange} hidden disabled name="email" />
            <input onChange={handleChange} hidden disabled name="phone" />
            <input onChange={handleChange} hidden disabled name="description" />
            {currentChild}
            <div style={step > 0 ? { display: "flex", flexDirection: "column-reverse" } : null}>
                {step > 0 ? <button type="button" onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
                <button type="submit">{isLastStep() ? "Send" : (step === 0 ? "Få 3 tilbud" : "Neste")}</button>
            </div>
            {step === 0 ? (
                <>
                    <p style={{ textAlign: "center", fontWeight: "300", margin: "0" }}>En tjeneste av <Link href="https://advokatmatch.no"><a target="_blank" style={{ textDecoration: "underline", color: "blue" }}>advokatmatch.no</a></Link></p>
                    <p style={{ fontSize: "12px", fontWeight: "300", color: "#545454", textAlign: "center" }}>Informasjonen sendes kun til advokatene du mottar tilbud fra, og brukes ikke til noe annet.</p>
                </>
            ) : null}
        </form>
    )
}