
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';

interface MarkdownPreviewProps {
  content: string;
  showMarkdownSyntax: boolean;
}

const MarkdownPreview = ({ content, showMarkdownSyntax }: MarkdownPreviewProps) => {
  const displayContent = showMarkdownSyntax ? content : content
    .replace(/#{1,6}\s?/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^\s*[-\*\+]\s+/gm, '• ');

  return (
    <Card className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Vista Previa</h2>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="markdown-preview prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 style={{color: 'var(--markdown-heading)'}} className="text-3xl font-bold mb-4">{children}</h1>,
              h2: ({children}) => <h2 style={{color: 'var(--markdown-heading)'}} className="text-2xl font-semibold mb-3">{children}</h2>,
              h3: ({children}) => <h3 style={{color: 'var(--markdown-heading)'}} className="text-xl font-semibold mb-2">{children}</h3>,
              h4: ({children}) => <h4 style={{color: 'var(--markdown-heading)'}} className="text-lg font-semibold mb-2">{children}</h4>,
              h5: ({children}) => <h5 style={{color: 'var(--markdown-heading)'}} className="text-base font-semibold mb-1">{children}</h5>,
              h6: ({children}) => <h6 style={{color: 'var(--markdown-heading)'}} className="text-sm font-semibold mb-1">{children}</h6>,
              strong: ({children}) => <strong style={{color: 'var(--markdown-bold)'}}>{children}</strong>,
              em: ({children}) => <em style={{color: 'var(--markdown-italic)'}}>{children}</em>,
              code: ({children}) => <code style={{color: 'var(--markdown-code)'}} className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
              a: ({children, href}) => <a href={href} style={{color: 'var(--markdown-link)'}} className="underline">{children}</a>,
              ul: ({children}) => <ul style={{color: 'var(--markdown-list)'}} className="list-disc pl-6 mb-4">{children}</ul>,
              ol: ({children}) => <ol style={{color: 'var(--markdown-list)'}} className="list-decimal pl-6 mb-4">{children}</ol>,
              li: ({children}) => <li className="mb-1">{children}</li>,
              p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>,
              pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>,
            }}
          >
            {showMarkdownSyntax ? content : displayContent}
          </ReactMarkdown>
        </div>
      </div>
    </Card>
  );
};

export default MarkdownPreview;
