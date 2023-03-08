import Link from 'next/link'

function CategoryPost({ post, className }) {
  const { slug, title, excerpt } = post
  return (
    <div className={className}>
      <Link href='/[slug]' as={`/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Link href={`../${slug}`} legacyBehavior>
        <a>Les mer...</a>
      </Link>
    </div>
  )
}

export default CategoryPost
