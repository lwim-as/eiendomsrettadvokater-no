import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { sidebar_container, form, form_step, form_indicator_container } from '../styles/Sidebar.module.css'
import { CustomSelect } from './CustomSelect';
import Link from 'next/link';

export default function Sidebar() {
    const [toggled, setToggled] = useState(false)
    const [selectedItem, setSelectedItem] = useState("")

    function handleChange(e) {
        setSelectedItem(e.target.textContent)
        setToggled(state => !state)
    }

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    return (
        <aside className={sidebar_container}>
            <MultistepForm
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    description: "",
                    advokat_type: ""
                }}
                onSubmit={(values) => {
                    console.log(values)
                    fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "sidebar", ...values })
                    })
                }}
            >
                <FormStep>
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br />Å motta tilbud er <u>gratis og uforpliktende.</u></p>
                    <CustomSelect
                        hint="Hva handler saken om?"
                        setToggled={setToggled}
                        toggleState={toggled}
                        value={selectedItem}
                        handleChange={handleChange}
                        name="advokat_type"
                        options={["Annet", "Heve boligkjøp", "Prisavslag og erstatning", "Klage på nybygg", "Selgers rettigheter", "Skjulte feil og mangler", "Håndverkertvister", "Nabotvister", "Plan-og bygningsrett"]} />
                </FormStep>
                <FormStep>
                    <h2>Beskriv oppdraget:</h2>
                    <CustomSelect
                        hint="Du har valgt:"
                        setToggled={setToggled}
                        toggleState={toggled}
                        value={selectedItem}
                        handleChange={handleChange}
                        name="advokat_type"
                        options={["Annet", "Heve boligkjøp", "Prisavslag og erstatning", "Klage på nybygg", "Selgers rettigheter", "Skjulte feil og mangler", "Håndverkertvister", "Nabotvister", "Plan-og bygningsrett"]} />
                    <Field name="description" as="textarea" />
                </FormStep>
                <FormStep>
                    <h2>Din informasjon:</h2>
                    <label>
                        Navn
                        <Field name="name" type="text" />
                    </label>
                    <label>
                        E-post
                        <Field name="email" type="email" />
                    </label>
                    <label>
                        Telefon
                        <Field name="phone" type="tel" />
                    </label>
                </FormStep>
            </MultistepForm>
        </aside>
    );
}

export function FormStep({ children }) {
    return (
        <div className={form_step}>{children}</div>)
}

export function MultistepForm({ children, ...props }) {
    const childrenArr = React.Children.toArray(children)

    const [step, setStep] = useState(0)
    const currentChild = childrenArr[step]

    function isLastStep() {
        return step === childrenArr.length - 1
    }

    return (
        <Formik
            {...props}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers)
                } else {
                    setStep(step => step + 1)
                }
            }}>
            <Form className={form} name="sidebar" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                <div className={form_indicator_container}>
                    {}
                </div>
                <Field hidden disabled name="name" type="text" />
                <Field hidden disabled name="advokat_type" type="text" />
                <Field hidden disabled name="email" type="email" />
                <Field hidden disabled name="phone" type="tel" />
                <Field hidden disabled name="description" as="textarea" />
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
            </Form>
        </Formik>
    )
}