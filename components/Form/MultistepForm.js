import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { FormContext } from "../../FormContext"
import { useCountChildren } from '../../lib/hooks/useCountChildren'
import { useNetlify } from '../../lib/hooks/useNetlify'
import { disclaimer, form, provided_by } from '../../styles/Sidebar.module.css'
import { FormProgress } from "./FormProgress"
import { NetlifyHiddenFields } from "./NetlifyHiddenFields"

export function MultistepForm({ children }) {
    const router = useRouter()
    const { state } = useContext(FormContext)

    const { step, setStep, currentChild, kids } = useCountChildren(children)

    function isLastStep() {
        return step === kids.length - 1
    }


    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                if (isLastStep()) {
                    const res = await useNetlify(state)

                    if (res.status === 200) {
                        router.push("/tilbud-mottatt")
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
            <NetlifyHiddenFields items={state} />
            <FormProgress currentStep={currentChild} steps={kids} />
            {currentChild}
            <div style={step > 0 ? { display: "flex", flexDirection: "column-reverse" } : null}>
                {step > 0 ? <button type="button" onClick={() => setStep(step => step - 1)}>Tilbake</button> : null}
                <button type="submit">{isLastStep() ? "Send" : (step === 0 ? "Få 3 tilbud" : "Neste")}</button>
            </div>
            <div hidden={step !== 0 ? true : false}>
                <p className={provided_by}>
                    En tjeneste av <Link href="https://advokatmatch.no">
                        <a target="_blank">advokatmatch.no</a>
                    </Link>
                </p>
                <p className={disclaimer}>Informasjonen sendes kun til advokatene du mottar tilbud fra, og brukes ikke til noe annet.</p>
            </div>
        </form>
    )
}