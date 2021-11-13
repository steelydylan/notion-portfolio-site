import { useLayoutEffect } from 'react'
import { Text } from './text'

import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('js', js)

export const CodeBlock: React.FC<{ text: any; lang: string }> = ({
  text,
  lang,
}) => {
  useLayoutEffect(() => {
    hljs.initHighlighting()
    ;(hljs.initHighlighting as any).called = false
  }, [])

  return (
    <pre className="mb-6 md:mb-8 text-xs text-white bg-black p-2 overflow-x-auto">
      <code className={lang}>
        <Text text={text} />
      </code>
    </pre>
  )
}
