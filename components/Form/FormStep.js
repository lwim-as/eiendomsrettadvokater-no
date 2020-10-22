import { form_step } from '../../styles/Sidebar.module.css'

export function FormStep({ children }) {
    return <div className={form_step}>{children}</div>
}