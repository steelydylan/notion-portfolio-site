import dayjs from 'dayjs'
import { Post } from '../types'

const PortfolioItem: React.FC<{
  url: string
  title: string
  description: string
  date: string
  image: string
}> = ({ url, title, description, date, image }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start flex-shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative"
      >
        <img
          src={image}
          loading="lazy"
          alt=""
          className="w-full h-full object-cover object-center absolute inset-0 transform group-hover:scale-110 transition duration-200"
        />
      </a>

      <div className="flex flex-col gap-2">
        <span className="text-gray-400 text-sm">{date}</span>

        <h2 className="text-gray-800 text-xl font-bold">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 active:text-indigo-600 transition duration-100"
          >
            {title}
          </a>
        </h2>

        <p className="text-gray-500">{description}</p>

        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  )
}

export const Portfolio: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Works
          </h2>
          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
            Picked up my best works ever
            <br />
            Please see my works from the links if you like
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-12 xl:gap-16">
          {posts.map((p) => (
            <PortfolioItem
              title={p.page}
              description={p.description}
              date={dayjs(p.date).format('YYYY-MM-DD')}
              image={p.thumbnail}
              url={`/posts/${p.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
