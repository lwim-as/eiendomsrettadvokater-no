import Head from 'next/head'

import { page_content } from '../styles/Page.module.css'

function Page({ children, meta }) {
    return (
        <div className={page_content}>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
            </Head>
            {children}
        </div>
    )
}

export default Page
