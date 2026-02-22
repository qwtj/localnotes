import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/MarkdownRenderer.css';

export function MarkdownRenderer({ content }: { content: string }) {
  if (!content.trim())
    return <p className="markdown-renderer__empty">Nothing to preview.</p>;
  return (
    <div className="markdown-renderer">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
