import { Client } from '@notionhq/client'
import { Post } from '../../types'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'rEYP',
        direction: 'descending',
      },
    ],
  })
  const { results } = response
  const posts = results.map((result) => {
    const d = result.properties
    const item: Post = {
      thumbnail: '',
      authors: [],
      slug: '',
      published: 'no',
      date: 0,
      description: '',
      page: '',
      id: result.id,
    }
    Object.keys(d).forEach((key) => {
      const property = d[key]
      if (property.type === 'people') {
        item[key.toLowerCase()] = property.people.map((p) => (p as any).name)
      } else if (property.type === 'rich_text') {
        item[key.toLowerCase()] = property.rich_text[0].plain_text
      } else if (property.type === 'files') {
        if (property.files[0].type === 'external') {
          item[key.toLowerCase()] = property.files[0].name
        } else {
          item[key.toLowerCase()] = property.files[0].file?.url
        }
      } else if (property.type === 'title') {
        item[key.toLowerCase()] = property.title[0].plain_text
      } else if (property.type === 'checkbox') {
        item[key.toLowerCase()] = property.checkbox
      } else if (property.type === 'multi_select') {
        item[key.toLowerCase()] = property.multi_select[0].name
      } else if (property.type === 'date') {
        item[key.toLowerCase()] = property.date.start
      }
    })
    return item
  })
  return posts
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}
