import React, { useContext } from 'react';

import { sidebar_container } from '../styles/Sidebar.module.css'

import { CustomSelect } from './CustomSelect';
import { FormContext } from '../FormContext'
import { MultistepForm } from './Form/MultistepForm';
import { FormStep } from './Form/FormStep';
import { FormField } from './Form/FormField';

export default function Sidebar() {

    const { state, setState } = useContext(FormContext)

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
            <MultistepForm>
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