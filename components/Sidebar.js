import React, { useState } from 'react';

import { sidebar_container } from '../styles/Sidebar.module.css'

import { Select } from './Form/Select';
import { MultistepForm } from './Form/MultistepForm';
import { FormStep } from './Form/FormStep';
import { object, string } from 'yup';
import InputField from './Form/InputField';
import { useNetlify } from '../lib/hooks/useNetlify';
import { FormSuccess } from './Form/FormSuccess';

export function Sidebar() {
    const [isSuccess, setIsSuccess] = useState(false)
    return (
        <aside className={sidebar_container}>
            <MultistepForm
                initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    description: "",
                    advokat_type: "",
                    concent: ""
                }}
                handleSubmit={async (values, helpers) => {
                    const res = await useNetlify(values)

                    if (res.status === 200) {
                        setIsSuccess(true)
                    }
                }}
            >
                <FormStep
                    validationSchema={
                        object().shape({
                            advokat_type: string().required("Dette feltet er obligatorisk")
                        })
                    }
                >
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br />Å motta tilbud er <u>gratis og uforpliktende.</u></p>
                    <Select
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
                <FormStep
                    validationSchema={
                        object().shape({
                            advokat_type: string().required("Dette feltet er obligatorisk"),
                            description: string().required("Dette feltet er obligatorisk")
                        })
                    }
                >
                    <h2>Beskriv oppdraget:</h2>
                    <Select
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
                    <InputField label="Beskriv oppdraget kort" name="description" component="textarea" />
                </FormStep>
                <FormStep
                    validationSchema={
                        object().shape({
                            name: string().required("Dette feltet er obligatorisk"),
                            email: string().email("Ugylding e-post").required("Dette feltet er obligatorisk"),
                            phone: string().required("Dette feltet er obligatorisk"),
                            concent: string().equals(["true"], "Du må godta personvernsreglene").required("Du må godta personvernsreglene")
                        })
                    }
                >
                    <h2>Din informasjon:</h2>
                    <InputField label="Navn" name="name" />
                    <InputField label="Email" name="email" type="email" />
                    <InputField label="Telefon" name="phone" type="tel" />
                    <InputField style={{ flexDirection: "row-reverse" }} label={`For å fullføre skjemaet må du godta våre <a href="/personvern/">personvernsregler</a>.`} type="checkbox" name="concent" />
                </FormStep>
            </MultistepForm>
            {isSuccess ? <FormSuccess handleState={setIsSuccess} /> : null}
        </aside>
    );
}