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
    query getPostDataBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        seo {
          title
          metaDesc
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