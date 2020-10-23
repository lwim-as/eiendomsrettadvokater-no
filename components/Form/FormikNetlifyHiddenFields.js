import { Field } from "formik"

export function FormikNetlifyHiddenFields({ items }) {
    for (const key in items) {
        return <Field hidden readOnly name={key}/>
    }
}