import { site_footer, footer_container, footer_content, copy_right } from '../styles/Footer.module.css'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

const lastestPostsQuery = gql`
    {
    posts(first: 5) {
        edges {
            node {
                slug
                title
            }
        }
    }
}
`

export function Footer() {
    const { data, loading } = useQuery(lastestPostsQuery)
    return (
        <footer className={site_footer}>
            <div className={footer_container}>
                <div className={footer_content}>
                    <img src="./images/eiendomsrett-hvit.png" />
                </div>
                <div className={footer_content}>
                    <h4>INFORMASJON</h4>
                    <h5>Lead Service AS</h5>
                    <h5>Org.nr 922 997 454</h5>
                    <h5>Bogstadveien 27B</h5>
                    <h5>0355 Oslo</h5>
                </div>
                <div className={footer_content}>
                    <h4>SISTE ARTIKLER</h4>
                    <ul>
                        {!loading ? data.posts.edges.map(({ node }) => <FooterItem key={node.slug} item={node} />) : null}
                    </ul>
                </div>
                <div className={footer_content}>
                    <h4>KONTAKT</h4>
                    <ul>
                        <FooterItem item={{slug: "cookies", title: "Informasjonskapsler"}}/>
                        <FooterItem item={{slug: "kontakt", title: "Kontakt"}}/>
                        <FooterItem item={{slug: "om", title: "Om"}}/>
                        <FooterItem item={{slug: "personvern", title: "Personvern"}}/>
                    </ul>
                </div>
            </div>
            <h4 className={copy_right}>Kopirett © 2020 Eiendomsrettadvokater</h4>
        </footer>
    )
}

export function FooterItem({ item }) {
    return (
        <li>
            <Link href={`/${item.slug}`}>
                <a>{item.title}</a>
            </Link>
        </li>
    )
}
