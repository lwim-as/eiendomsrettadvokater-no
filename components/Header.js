import Link from 'next/link'
import { siteheader, sitenav, sitemenu } from '../styles/Header.module.css'

export function Header() {
    return (
        <header className={siteheader}>
            <nav className={sitenav}>
                <figure>
                    <Link href="/">
                        <a>
                            <img src="https://eiendomsrettadvokater.no/wp-content/uploads/2019/04/black.png" alt="logo" />
                        </a>
                    </Link>
                </figure>
                <ul className={sitemenu}>
                    <HeaderItem slug="/kontakt" text="Kontakt" />
                    <HeaderItem slug="/om" text="Om" />
                </ul>
            </nav>
        </header>
    )
}

export function HeaderItem({ slug, text }) {
    return (
        <li>
            <Link href={slug}>
                <a>{text}</a>
            </Link>
        </li>
    )
} 
