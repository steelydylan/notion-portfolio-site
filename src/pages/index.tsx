import { Portfolio } from '../components/portfolio'
import { getDatabase } from '../lib/notion'

export async function getStaticProps() {
  const posts = await getDatabase(process.env.NOTION_DATABASE_ID as string, {
    sorts: [
      {
        property: 'rEYP',
        direction: 'descending',
      },
    ],
  })
  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}

const Index = ({ posts = [], preview }) => {
  return <Portfolio posts={posts} />
}

export default Index
