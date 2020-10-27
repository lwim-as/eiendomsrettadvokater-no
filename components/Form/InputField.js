import { Field, useField } from "formik"
import { field_error } from '../../styles/Sidebar.module.css'

function InputField({ label, name, style = {}, type = "", component = "" }) {
    const [, form] = useField(name)
    const { error } = form

    return (
        <>
            <label style={style}>
                <span dangerouslySetInnerHTML={{__html: label}}/>
                <Field
                    name={name}
                    type={type !== "" ? type : null}
                    as={component !== "" ? component : null}
                />
            </label>
            {error !== undefined ? <span className={field_error}>{error}</span> : null}
        </>
    )
}

export default InputField
