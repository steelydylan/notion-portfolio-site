import { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints'
import { Fragment } from 'react'
import { getBlocks, getDatabase, getPage } from '../../lib/notion'

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        className={[
          bold ? 'font-bold' : '',
          code
            ? 'bg-red-300 text-red-500 text-sm inline-block py px-2 rounded-sm'
            : '',
          italic ? 'italic' : '',
          strikethrough ? 'stroke-1' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a href={text.link.url} className="text-indigo-500 hover:underline">
            {text.content}
          </a>
        ) : (
          text.content
        )}
      </span>
    )
  })
}

const renderBlock = (block: GetBlockResponse) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">
          <Text text={value.text} />
        </p>
      )
    case 'code':
      return (
        <pre className="sm:text-lg mb-6 md:mb-8 text-xs text-white bg-black p-2">
          <Text text={value.text} />
        </pre>
      )
    case 'heading_1':
      return (
        <h1 className="text-gray-800 text-xl sm:text-2xl font-semibold mb-2 md:mb-4">
          <Text text={value.text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold mb-2 md:mb-4">
          <Text text={value.text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure className="bg-gray-100 overflow-hidden rounded-lg shadow-lg relative mb-6 md:mb-8">
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <article className="max-w-screen-md px-4 md:px-8 mx-auto">
        <h1 className="text-gray-800 text-2xl sm:text-3xl font-bold text-center mb-4 md:mb-6">
          <Text text={page.properties.Page.title} />
        </h1>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </article>
    </div>
  )
}

export const getStaticPaths = async () => {
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID as string)
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug, id: post.id } })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID as string)
  const post = posts.find((p) => p.slug === slug)
  const page = await getPage(post.id)
  const blocks = await getBlocks(post.id)
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children
    }
    return block
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
