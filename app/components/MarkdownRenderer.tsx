import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

interface MarkdownRendererProps {
  markdownText: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownText }) => {
  const createMarkup = (markdown: string) => {
    const rawMarkup = marked.parse(markdown, { gfm: true, async: false });
    return { __html: DOMPurify.sanitize(rawMarkup as string) };
  };

  return (
    <div dangerouslySetInnerHTML={createMarkup(markdownText)} />
  );
};

export default MarkdownRenderer;
