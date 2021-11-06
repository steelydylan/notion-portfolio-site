import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

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
    <>
      <div className={sharedStyles.layout}>
        <div className={contactStyles.avatar}>
          <img src="/avatar.jpeg" alt="avatar with letters JJ" height={60} />
        </div>

        <h1 style={{ marginTop: 0 }}>Contact</h1>

        <div className={contactStyles.name}>
          steelydylan - Frontend Engineer
        </div>

        <div className={contactStyles.links}>
          {contacts.map(({ Comp, link, alt }) => {
            return (
              <ExtLink key={link} href={link} aria-label={alt}>
                <Comp height={32} />
              </ExtLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
