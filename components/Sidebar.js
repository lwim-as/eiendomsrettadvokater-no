function Sidebar() {
    return (
        <aside>
            <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">

                <label>
                    Navn:
                    <input type="text" name="name" />
                </label>
                <button type="submit">Send</button>
            </form>
        </aside>
    )
}

export default Sidebar
