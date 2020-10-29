import { Field, Form, Formik } from "formik"
import Link from "next/link"
import React from "react"
import { useCountChildren } from '../../lib/hooks/useCountChildren'
import { disclaimer, form, provided_by } from '../../styles/Sidebar.module.css'
import { FormProgress } from "./FormProgress"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-light-svg-icons'

export function MultistepForm({ children, initialValues, handleSubmit, ...props }) {

    const { step, setStep, currentChild, kids } = useCountChildren(children)

    function isLastStep() {
        return step === kids.length - 1
    }


    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            initialValues={initialValues}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await handleSubmit(values, helpers)
                } else {
                    setStep(step => step + 1)
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form
                    className={form}
                    name="sidebar"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    <Field hidden readOnly name="name" />
                    <Field hidden readOnly name="email" />
                    <Field hidden readOnly name="phone" />
                    <Field hidden readOnly name="description" />
                    <Field hidden readOnly name="advokat_type" />
                    <FormProgress currentStep={currentChild} steps={kids} />
                    {currentChild}
                    <div style={step > 0 ? { display: "flex", flexDirection: "column-reverse" } : null}>
                        {step > 0 ? <button type="button" onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
                        <button type="submit">{isLastStep() ? (isSubmitting ? <FontAwesomeIcon spin icon={faSpinner} /> : "Send") : (step === 0 ? "Få 3 tilbud" : "Neste")}</button>
                    </div>
                    <div hidden={step !== 0 ? true : false}>
                        <p className={provided_by}>
                            En tjeneste av <Link href="https://advokatmatch.no">
                                <a target="_blank">advokatmatch.no</a>
                            </Link>
                        </p>
                        <p className={disclaimer}>Informasjonen sendes kun til advokatene du mottar tilbud fra, og brukes ikke til noe annet.</p>
                    </div>
                </Form>
            )}
        </Formik>
    )
}