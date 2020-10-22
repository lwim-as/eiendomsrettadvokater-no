import { createContext, useState } from 'react'

const FormContext = createContext(null)

function FormContextProvider({ children }) {
    const [state, setState] = useState({
        name: "",
        phone: "",
        email: "",
        description: "",
        advokat_type: ""
    })
    
    return (
        <FormContext.Provider value={{ state, setState }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext, FormContextProvider }
