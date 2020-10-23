import Head from "next/head"

export function Seo({ seo }) {

    const {
        title,
        metaDesc,
        metaRobotsNoindex,
        metaRobotsNofollow,
        opengraphAuthor,
        opengraphPublishedTime,
        opengraphModifiedTime,
        opengraphUrl,
        opengraphSiteName,
        opengraphType,
        opengraphTitle,
        opengraphDescription,
        opengraphImage
    } = seo

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={metaDesc} />
            <meta name="robots" content={`${metaRobotsNoindex}, ${metaRobotsNofollow}, max-snippet:-1, max-image-preview:large, max-video-preview:-1`}/>
            {opengraphAuthor ? <meta property="og:author" content={opengraphAuthor} /> : null}
            {opengraphPublishedTime ? <meta property="article:published_time" content={opengraphPublishedTime} /> : null}
            {opengraphModifiedTime ? <meta property="article:modified_time" content={opengraphModifiedTime} /> : null}
            {opengraphUrl ? <meta property="og:url" content={opengraphUrl} /> : null}
            {opengraphSiteName ? <meta property="og:site_name" content={opengraphSiteName} /> : null}
            {opengraphType ? <meta property="og:type" content={opengraphType} /> : null}
            {opengraphTitle ? <meta property="og:title" content={opengraphTitle} /> : null}
            {opengraphDescription ? <meta property="og:description" content={opengraphDescription} /> : null}
            {opengraphImage ? <meta property="og:image" content={opengraphImage.sourceUrl} /> : null}
        </Head>
    )
}
