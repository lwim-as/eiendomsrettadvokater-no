import { fetchAPI } from "../graphql-api"

export async function getCategoryPaths() {
    const data = await fetchAPI(`
    {
      categories {
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

export async function getCategoryPosts(catName) {

    const data = await fetchAPI(`
    query getCategoryPosts($catName: ID!) {
      category(id: $catName, idType: SLUG) {
        slug
        name
        seo {
          title
          metaDesc
        }
        posts {
          edges {
            node {
              title
              slug
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    `,
        {
            variables: {
                catName
            }
        })

    return data
}

export async function getPaginatedCategoryPosts(catName, after = null, first = 10) {
  const posts = await fetchAPI(`
  query getPaginatedCategoryPosts($after: String, $first: Int, $catName: ID!) {
    category(id: $catName, idType: SLUG) {
      slug
      name
      seo {
        title
        metaDesc
      }
      posts(first: $first, after: $after) {
        edges {
          node {
            title
            slug
            excerpt
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            commentCount
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }  
    `, {
    variables: {
      catName,
      after,
      first,
    }
  })

  return posts
}