import { NextPageContext } from 'next'
import parser, { OgpParserResult } from 'ogp-parser'

const Embed = ({ embed, url }: { embed: OgpParserResult; url: string }) => {
  const ogUrl = embed.ogp['og:url']?.[0] ?? ''
  const domain = new URL(ogUrl).hostname

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm border border-gray-300 flex m-auto"
      style={{ maxWidth: '780px' }}
    >
      <div className="px-4 py-3 flex-1">
        <h1 className="text-lg">{embed.title}</h1>
        {embed.ogp['og:description'] && (
          <p className="overflow-ellipsis whitespace-nowrap w-96 overflow-x-hidden">
            {embed.ogp['og:description']}
          </p>
        )}
        <img
          src={`https://www.google.com/s2/favicons?sz=32&domain=${domain}`}
          width="14"
          height="14"
          className="w-4 h-4 inline-block mr-2"
        />
        {domain}
      </div>
      <div className="w-30 h-30" style={{ width: '120px', height: '120px' }}>
        <img
          src={embed.ogp['og:image']?.[0] ?? ''}
          className="w-full h-full object-cover"
        />
      </div>
    </a>
  )
}

Embed.getInitialProps = async (ctx: NextPageContext) => {
  const url = ctx.query.url
  const embed = await parser(url as string)
  return {
    embed,
    url,
  }
}

export default Embed
