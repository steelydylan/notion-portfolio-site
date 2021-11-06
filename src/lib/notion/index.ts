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
      if (d[key].type === 'people') {
        item[key.toLowerCase()] = d[key].people.map((p) => p.name)
      } else if (d[key].type === 'rich_text') {
        item[key.toLowerCase()] = d[key].rich_text[0].plain_text
      } else if (d[key].type === 'files') {
        if (d[key].files[0].type === 'external') {
          item[key.toLowerCase()] = d[key].files[0].name
        } else {
          item[key.toLowerCase()] = d[key].files[0].file?.url
        }
      } else if (d[key].type === 'title') {
        item[key.toLowerCase()] = d[key].title[0].plain_text
      } else if (d[key].type === 'checkbox') {
        item[key.toLowerCase()] = d[key].checkbox
      } else if (d[key].type === 'multi_select') {
        item[key.toLowerCase()] = d[key].multi_select[0].name
      } else if (d[key].type === 'date') {
        item[key.toLowerCase()] = d[key].date.start
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
