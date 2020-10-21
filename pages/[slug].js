import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import { getPostDataBySlug, getPostPaths } from "../lib/graphql-api"

import { page_container, page_content } from '../styles/Post.module.css'

function Post({ post }) {
    const { seo, title, content, featuredImage } = post

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.metaDesc} />
            </Head>
            <div className={page_container}>
                <div className={page_content}>
                    <h1>{title}</h1>
                    <img src={featuredImage.node.sourceUrl} />
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <Sidebar/>
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const { post } = await getPostDataBySlug(params.slug)

    return {
        props: {
            post
        }
    }
}

export async function getStaticPaths() {

    const { posts } = await getPostPaths()

    const paths = posts.edges.map(({ node }) => {
        return `/${node.slug}`
    })

    return {
        paths,
        fallback: false
    }
}

export default Post