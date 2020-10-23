import { fetchAPI } from "../graphql-api"

export async function getPostPaths() {
    const data = await fetchAPI(`
    {
      posts {
        edges {
          node {
            slug
          }
        }
      }
    }
    `)

    return data
}

export async function getPostDataBySlug(id) {
    const data = await fetchAPI(`

    fragment SeoData on PostTypeSEO {
      title
      metaDesc
      metaRobotsNoindex
      metaRobotsNofollow
      ...OpenGraphData
      ...TwitterData
    }

    fragment OpenGraphData on PostTypeSEO {
      opengraphUrl
      opengraphType
      opengraphTitle
      opengraphSiteName
      opengraphAuthor
      opengraphDescription
      opengraphModifiedTime
      opengraphPublishedTime
      opengraphImage {
        sourceUrl
      }
    }

    fragment TwitterData on PostTypeSEO {
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }

    query getPostDataBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        seo {
          ...SeoData
        }
        slug
        title
        content
        featuredImage {
          node {
            srcSet
            sizes
            sourceUrl
          }
        }
      }
    }
    `,
        {
            variables: {
                id
            }
        })

    return data
}