import React, { useContext, useRef, useState } from 'react';

import { sidebar_container, form, form_step, disclaimer } from '../styles/Sidebar.module.css'
import { CustomSelect } from './CustomSelect';
import Link from 'next/link';

import { FormContext } from '../FormContext'
import { useRouter } from 'next/router';

export default function Sidebar() {

    const { state, setState } = useContext(FormContext)
    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    function handleChange(e) {
        const { name, value } = e.target
        const newValue = state.filter(item => {
            if (item.name === name) {
                item.value = value
            }
        })

        setState(state, ...newValue)
    }

    return (
        <aside className={sidebar_container}>
            <MultistepForm
                handleSubmit={(state) => {
                    let data = {}

                    state.forEach(item => {
                        data = { ...data, [item.name]: item.value }
                    })

                    console.log(data)
                    return fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "sidebar", ...data })
                    })
                }}
            >
                <FormStep>
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br />Å motta tilbud er <u>gratis og uforpliktende.</u></p>
                    <CustomSelect
                        name="advokat_type"
                        hint="Hva handler saken om?"
                        options={[
                            "Annet",
                            "Heve boligkjøp",
                            "Prisavslag og erstatning",
                            "Klage på nybygg",
                            "Selgers rettigheter",
                            "Skjulte feil og mangler",
                            "Håndverkertvister",
                            "Nabotvister",
                            "Plan-og bygningsrett"
                        ]}
                    />
                </FormStep>
                <FormStep>
                    <h2>Beskriv oppdraget:</h2>
                    <CustomSelect
                        name="advokat_type"
                        hint="Du har valgt:"
                        options={[
                            "Annet",
                            "Heve boligkjøp",
                            "Prisavslag og erstatning",
                            "Klage på nybygg",
                            "Selgers rettigheter",
                            "Skjulte feil og mangler",
                            "Håndverkertvister",
                            "Nabotvister",
                            "Plan-og bygningsrett"
                        ]}
                    />
                    <FormField name="description" type="textarea" label="Beskriv oppdraget kort" handleChange={handleChange} />
                </FormStep>
                <FormStep>
                    <h2>Din informasjon:</h2>
                    <FormField name="name" label="Navn" handleChange={handleChange} />
                    <FormField name="email" label="E-post" type="email" handleChange={handleChange} />
                    <FormField name="phone" label="Telefon" type="tel" handleChange={handleChange} />
                </FormStep>
            </MultistepForm>
        </aside>
    );
}

export function FormStep({ children }) {
    return <div className={form_step}>{children}</div>
}

export function MultistepForm({ children, handleSubmit }) {
    const router = useRouter()
    const { state } = useContext(FormContext)

    /*
    function handleChange(e) {
        console.log(state[name])
        const { name, value } = e.target
        setState({ [name]: value })
    }*/

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
                    const res = await handleSubmit(state)

                    if (res.status === 200) {
                        router.push("/tilbud-mottatt")
                    } else {
                        console.log(state.error)
                    }

                } else {
                    setStep(step => step + 1)
                }
            }}
            className={form}
            name="sidebar"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >

            {currentChild}
            <div style={step > 0 ? { display: "flex", flexDirection: "column-reverse" } : null}>
                {step > 0 ? <button type="button" onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
                <button type="submit">{isLastStep() ? "Send" : (step === 0 ? "Få 3 tilbud" : "Neste")}</button>
            </div>
            {step === 0 ? (
                <>
                    <p style={{ textAlign: "center", fontWeight: "300", margin: "0" }}>En tjeneste av <Link href="https://advokatmatch.no"><a target="_blank" style={{ textDecoration: "underline", color: "blue" }}>advokatmatch.no</a></Link></p>
                    <p className={disclaimer}>Informasjonen sendes kun til advokatene du mottar tilbud fra, og brukes ikke til noe annet.</p>
                </>
            ) : null}
        </form>
    )
}

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