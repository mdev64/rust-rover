import CodeBlock from './CodeBlock';
import './ContentRenderer.css';

// ── Main ContentRenderer ─────────────────────────────────────
function ContentRenderer({ content }) {
  return (
    <div className="content-renderer">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3 key={i} className="content-heading">
                {block.text}
              </h3>
            );

          case 'text':
            return (
              <p key={i} className="content-text">
                {renderInlineMarkdown(block.text)}
              </p>
            );

          case 'code':
            return <CodeBlock key={i} code={block.code} />;

          case 'tip':
            return (
              <div key={i} className="tip-box">
                <span className="tip-icon">💡</span>
                <p>{renderInlineMarkdown(block.text)}</p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// ── Inline markdown: **bold** and `code` ──────────────────
function renderInlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.includes('\n')) {
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    }
    return part;
  });
}

export default ContentRenderer;
