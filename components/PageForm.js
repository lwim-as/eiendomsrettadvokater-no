import { form } from '../styles/Page.module.css'

function PageForm() {
    return (
        <form action="/tilbud-mottatt" className={form} name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <label>
                Fullt navn:
                    <input required name="name" type="text" />
            </label>
            <label>
                Epost:
                    <input required name="email" type="email" />
            </label>
            <label>
                Emne:
                    <input required name="subject" type="text" />
            </label>
            <label>
                Melding:
                    <textarea required name="description" />
            </label>
            <button type="submit">Send</button>
        </form>
    )
}

export default PageForm
