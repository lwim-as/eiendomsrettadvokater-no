import { form_step } from '../../styles/Sidebar.module.css'

export function FormStep({ children, validationSchema }) {
    return <div className={form_step}>{children}</div>
}