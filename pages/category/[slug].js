import Head from 'next/head'
import { useEffect, useState } from 'react'
import CategoryPost from '../../components/CategoryPost'
import { getCategoryPaths, getCategoryPosts, getPaginatedCategoryPosts } from '../../lib/graphql-api'

import { header, content_container, category_content, load_more_btn } from '../../styles/Category.module.css'

function Category({ category }) {
  const { seo, name, slug, posts } = category

  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [fetchedData, setFetchedData] = useState([])
  const [pageInfo, setPageInfo] = useState({})

  useEffect(() => {
    setPageInfo({
      hasNextPage: posts.pageInfo.hasNextPage,
      endCursor: posts.pageInfo.endCursor,
    })
  }, [])

  useEffect(() => {
    if (currentPage < 2) return

    async function fetchMorePosts() {
      setIsLoading(true)
      if (pageInfo.hasNextPage) {
        const { posts: nextPosts } = await getPaginatedPosts(pageInfo.endCursor)

        setFetchedData([...fetchedData, ...nextPosts.edges])
        setPageInfo({ hasNextPage: nextPosts.pageInfo.hasNextPage, endCursor: nextPosts.pageInfo.endCursor })
        setIsLoading(false)
      }
    }
    fetchMorePosts()
  }, [currentPage])

  const filteredPosts = posts.edges.filter(
    post =>
      post.node.slug !== 'hvordan-lanet-er-sikret-og-hvorfor-du-burde-velge-lan-med-sikkerhet' &&
      post.node.slug !== 'oversikt-over-de-ulike-typene-kredittkort'
  )

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name='description' content={seo.metaDesc} />
      </Head>

      <div className={category_content}>
        <div className={header}>
          <h1>{name}</h1>
        </div>
        {posts.edges.length === 0 ? (
          <p>No posts to see here...</p>
        ) : (
          filteredPosts.map(({ node }) => (
            <CategoryPost className={content_container} post={node} categorySlug={slug} key={node.slug} />
          ))
        )}
        {currentPage > 1
          ? fetchedData.map(({ node }) => (
              <CategoryPost className={content_container} post={node} categorySlug={slug} key={node.slug} />
            ))
          : null}
        {pageInfo.hasNextPage ? (
          <button className={load_more_btn} disabled={isLoading} onClick={() => setCurrentPage(current => current + 1)}>
            {isLoading ? 'Laster inn fler' : 'Last inn fler'}
          </button>
        ) : null}
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { category } = await getPaginatedCategoryPosts(params.slug)

  return {
    props: {
      category,
    },
  }
}

export async function getStaticPaths() {
  const { categories } = await getCategoryPaths()

  return {
    paths: categories.edges.map(({ node }) => `/category/${node.slug}`),
    fallback: false,
  }
}

export default Category
