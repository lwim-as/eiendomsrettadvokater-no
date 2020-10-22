import Head from 'next/head'
import { useEffect, useState } from 'react'
import { FrontPagePost } from '../components/FrontPagePost'
import { getPaginatedPosts } from '../lib/graphql-api'

import { content_container, category_content, load_more_btn } from "../styles/FrontPage.module.css"

function FrontPage({ posts }) {

  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [fetchedData, setFetchedData] = useState([])
  const [pageInfo, setPageInfo] = useState({})

  useEffect(() => {
    setPageInfo({
      hasNextPage: posts.pageInfo.hasNextPage,
      endCursor: posts.pageInfo.endCursor
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


  return (
    <>
      <Head>
        <title>Eiendomsrettadvokater</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={category_content}>
        {posts.edges.map(({ node }) => <FrontPagePost className={content_container} key={node.slug} post={node} />)}
        {currentPage > 1 ? fetchedData.map(({ node }) => <FrontPagePost className={content_container} key={node.slug} post={node} />) : null}
        {pageInfo.hasNextPage ? <button className={load_more_btn} disabled={isLoading} onClick={() => setCurrentPage(current => current + 1)}>{isLoading ? "Laster inn fler" : "Last inn fler"}</button> : null}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { posts } = await getPaginatedPosts()

  return {
    props: {
      posts
    }
  }
}

export default FrontPage