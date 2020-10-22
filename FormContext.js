import { createContext, useState } from 'react'

const FormContext = createContext(null)

function FormContextProvider({ children }) {
    const [state, setState] = useState([
        {
            name: "name",
            value: "",
            error: ""
        },
        {
            name: "phone",
            value: "",
            error: ""
        },
        {
            name: "email",
            value: "",
            error: ""
        },
        {
            name: "description",
            value: "",
            error: ""
        },
        {
            name: "advokat_type",
            value: "",
            error: ""
        }
    ])

    return (
        <FormContext.Provider value={{ state, setState }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext, FormContextProvider }
