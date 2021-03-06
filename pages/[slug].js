import Head from 'next/head'
import { Seo } from '../components/Seo'
import { Sidebar } from '../components/Sidebar'
import { getPostDataBySlug, getPostPaths } from '../lib/graphql-api'

import { page_container, page_content, thumbnail } from '../styles/Post.module.css'

function Post({ post }) {
    const { seo, title, content, featuredImage } = post

    return (
        <>
            <Seo seo={seo} />
            <div className={page_container}>
                <div className={page_content}>
                    <h1>{title}</h1>
                    {featuredImage?.node && (
                        <picture>
                            <source srcSet={featuredImage.node.sources} sizes={featuredImage.node.sizes} />
                            <img lazy='true' className={thumbnail} src={featuredImage.node.sourceUrl} />
                        </picture>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <Sidebar />
            </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const { post } = await getPostDataBySlug(params.slug)

    return {
        props: {
            post,
        },
    }
}

export async function getStaticPaths() {
    const { posts } = await getPostPaths()

    const paths = posts.edges.map(({ node }) => {
        return `/${node.slug}`
    })

    return {
        paths,
        fallback: false,
    }
}

export default Post
