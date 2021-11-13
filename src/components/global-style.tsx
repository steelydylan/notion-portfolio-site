export const GlobalStyle = () => {
  return (
    <style jsx global>
      {`
        .hljs {
          display: block;
          overflow-x: auto;
          background-color: transparent !important;
        }

        .hljs-comment,
        .hljs-quote {
          color: #b6c6d0;
        }

        .hljs-selector-tag,
        .hljs-selector-class,
        .hljs-subst {
          color: #ff8e8e;
        }

        .hljs-name,
        .hljs-keyword {
          color: #56cdff;
        }

        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr,
        .hljs-attribute {
          color: #64b9ff;
        }

        .hljs-string,
        .hljs-doctag,
        .hljs-number {
          color: #ffb461;
        }

        .hljs-number {
          color: #a6e6b5;
        }
        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #cba9ff;
        }

        .hljs-tag,
        .hljs-meta {
          color: #b594ff;
        }

        .hljs-params {
          color: #ffffcc;
        }

        .hljs-regexp,
        .hljs-link {
          color: #ff8484;
        }

        // 以下どこで使われるか不明
        .hljs-type,
        .hljs-class .hljs-title {
          color: rgb(173, 192, 250);
        }

        .hljs-symbol,
        .hljs-bullet {
          color: #c367d2;
        }

        .hljs-built_in,
        .hljs-builtin-name {
          color: #64b9ff;
        }

        .hljs-deletion {
          background: #fdd;
        }

        .hljs-addition {
          background: #dfd;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: 700;
        }
      `}
    </style>
  )
}
