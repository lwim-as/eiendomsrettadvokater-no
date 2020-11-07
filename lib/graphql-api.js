export async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    const res = await fetch('https://wp.eiendomsrettadvokater.no/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getPaginatedPosts(after = null, first = 10) {
    const posts = await fetchAPI(
        `
  query getPaginatedPosts($after: String, $first: Int) {
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
    `,
        {
            variables: {
                after,
                first,
            },
        }
    )

    return posts
}

export { getPostDataBySlug, getPostPaths } from './queries/post'
export { getCategoryPaths, getCategoryPosts, getPaginatedCategoryPosts } from './queries/category'
