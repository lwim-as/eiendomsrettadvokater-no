import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { sidebar_container, form, form_step } from '../styles/Sidebar.module.css'

export default function Sidebar() {

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    return (
        <aside className={sidebar_container}>
            <FormikStepper
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                    description: "",
                    advokat_type: ""
                }}
                onSubmit={async (values) => {
                    const res = await fetch("/", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: encode({ "form-name": "contact", ...values })
                    })
                }}
            >
                <FormikStep>
                    <Field name="advokat_type" as="select">
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
                    </Field>
                </FormikStep>
                <FormikStep>
                    <Field name="name" type="text" />
                    <Field name="email" type="email" />
                    <Field name="phone" type="tel" />
                </FormikStep>
            </FormikStepper>
        </aside>
    );
}

export function FormikStep({ children }) {
    return (
        <div className={form_step}>{children}</div>)
}

export function FormikStepper({ children, ...props }) {
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
            <Form className={form} name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                {currentChild}
                {step > 0 ? <button onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
                <button type="submit">{isLastStep() ? "Send" : "Neste"}</button>
            </Form>
        </Formik>
    )
}
