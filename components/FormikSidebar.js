import React from 'react';

import { sidebar_container } from '../styles/Sidebar.module.css'

import { FormikCustomSelect } from './FormikCustomSelect';
import { FormikMultistepForm } from './Form/FormikMultistepForm';
import { FormStep } from './Form/FormStep';
import { Field } from 'formik';

export function FormikSidebar() {


    return (
        <aside className={sidebar_container}>
            <FormikMultistepForm>
                <FormStep>
                    <h2>Få tilbud fra flere advokater</h2>
                    <p>Sammenlign tilbud fra flere advokater.<br />Å motta tilbud er <u>gratis og uforpliktende.</u></p>
                    <FormikCustomSelect
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
                    <FormikCustomSelect
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
                    <label>
                        Beskriv oppdraget kort
                        <Field name="description" as="textarea" />
                    </label>
                </FormStep>
                <FormStep>
                    <h2>Din informasjon:</h2>
                    <label>
                        Navn
                        <Field name="name" />
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
            </FormikMultistepForm>
        </aside>
    );
}