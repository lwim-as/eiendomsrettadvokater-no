import React, { useState } from 'react'
import { sidebar_container, form, form_step } from '../styles/Sidebar.module.css'

function Sidebar() {
    return (
        <aside className={sidebar_container}>
            <FormStepper>
                <FormStep>
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br /> Å motta tilbud er <u>gratis og uforpliktende</u>.</p>
                    <input type="hidden" name="form-adokat-type" value="contact"/>
                    <select name="advokat-type">
                        <option value="">---</option>
                        <option value="Annet">Annet</option>
                        <option value="Heve boligkjøp">Heve boligkjøp</option>
                        <option value="Prisavslag og erstatning">Prisavslag og erstatning</option>
                        <option value="Klage på nybygg">Klage på nybygg</option>
                        <option value="Selgers rettigheter">Selgers rettigheter</option>
                        <option value="Skjulte feil og mangler">Skjulte feil og mangler</option>
                        <option value="Håndverkertvister">Håndverkertvister</option>
                        <option value="Nabotvister">Nabotvister</option>
                        <option value="Plan-og bygningsrett">Plan-og bygningsrett</option>
                    </select>
                </FormStep>
                <FormStep>
                    <label>
                        Navn:
                        <input type="text" name="name" />
                    </label>
                </FormStep>
                <FormStep>

                </FormStep>
            </FormStepper>
        </aside>
    )
}

export default Sidebar

export function FormStepper({ children }) {
    const [step, setStep] = useState(0)
    const formSteps = React.Children.toArray(children)

    const currentStep = formSteps[step]

    function isLastStep() {
        return step === formSteps.length - 1
    }

    function handleSubmit(e) {
        if (!isLastStep()) {
            e.preventDefault()
            setStep(step => step + 1)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={form} name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            {currentStep}
            {step > 0 ? <button onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
            <button type="submit">{isLastStep() ? "Send" : "Neste"}</button>
        </form>
    )
}

export function FormStep({ children }) {
    return (
        <div className={form_step}>
            {children}
        </div>
    )
}
