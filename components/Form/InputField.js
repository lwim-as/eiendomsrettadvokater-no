import { Field, useField } from "formik"
import { field_error } from '../../styles/Sidebar.module.css'

function InputField({ label, name, type = "", component = "" }) {
    const [, form] = useField(name)
    const { error } = form

    return (
        <label>
            {label}
            <Field
                name={name}
                type={type !== "" ? type : null}
                as={component !== "" ? component : null}
            />
            {error !== undefined ? <span className={field_error}>{error}</span> : null}
        </label>
    )
}

export default InputField
