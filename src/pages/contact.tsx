import ExtLink from '../components/ext-link'
import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/steelydylan',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/steelydylan',
  },
  // {
  //   Comp: LinkedIn,
  //   alt: 'linkedin icon',
  //   link: 'https://www.linkedin.com/in/jj-kasper-0b5392166/',
  // },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:ess_president@me.com?subject=Notion Blog',
  },
]

export default function Contact() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Contact
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-100 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
            <img
              src="/avatar.jpeg"
              loading="lazy"
              alt="steelydylan"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div>
            <div className="text-indigo-500 md:text-lg font-bold text-center">
              steelydylan
            </div>
            <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">
              Frontend Engineer
            </p>

            <div className="flex justify-center">
              <div className="flex gap-4">
                {contacts.map(({ Comp, link, alt }) => {
                  return (
                    <ExtLink key={link} href={link} aria-label={alt}>
                      <Comp height={32} />
                    </ExtLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
