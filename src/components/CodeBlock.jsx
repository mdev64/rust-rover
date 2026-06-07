import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

SyntaxHighlighter.registerLanguage('rust', rust);

const HIGHLIGHTER_STYLE = {
  margin: 0,
  padding: '1.35rem 1.5rem',
  paddingTop: '2.5rem',
  fontSize: '0.88rem',
  lineHeight: '1.75',
  borderRadius: '10px',
  background: '#1e1e2e',
};

const CODE_TAG_PROPS = {
  style: { fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace" },
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  }

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        <button
          className={`copy-btn${copied ? ' copy-btn--copied' : ''}`}
          onClick={copyToClipboard}
          title="Copy code"
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language="rust"
        style={vscDarkPlus}
        customStyle={HIGHLIGHTER_STYLE}
        codeTagProps={CODE_TAG_PROPS}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
