import Link from 'next/link'
import NextLink from 'next/link'

import { single_inner_content, post_thumbnail, post_content, category_label } from '../styles/FrontPage.module.css'

export function FrontPagePost({ post, className }) {
  const { slug, title, categories, featuredImage, excerpt } = post

  return (
    <div className={className}>
      <div className={single_inner_content}>
        {featuredImage?.node.sourceUrl !== undefined ? (
          <img lazy='true' className={post_thumbnail} src={featuredImage.node.sourceUrl} />
        ) : null}
        <div className={post_content}>
          <h2>
            <NextLink href={`/${slug}`} legacyBehavior>
              <a>{title}</a>
            </NextLink>
          </h2>
          <Link href={`/category/${categories.edges[0].node.slug}`} legacyBehavior>
            <a className={category_label}>{categories.edges[0].node.name}</a>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
          <Link href={`/${slug}`} legacyBehavior>
            <a>Les mer...</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
