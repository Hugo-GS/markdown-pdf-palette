
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';

interface MarkdownPreviewProps {
  content: string;
  showMarkdownSyntax: boolean;
}

const MarkdownPreview = ({ content, showMarkdownSyntax }: MarkdownPreviewProps) => {
  const processContentWithColoredSyntax = (text: string) => {
    if (!showMarkdownSyntax) {
      return text
        .replace(/#{1,6}\s?/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/^\s*[-\*\+]\s+/gm, '• ');
    }

    // Colorear solo los símbolos de markdown
    return text
      .replace(/(#{1,6})\s/g, '<span style="color: var(--markdown-heading)">$1</span> ')
      .replace(/(\*\*)(.*?)(\*\*)/g, '<span style="color: var(--markdown-bold)">$1</span>$2<span style="color: var(--markdown-bold)">$3</span>')
      .replace(/(?<!\*)(\*)(?!\*)(.*?)(?<!\*)(\*)(?!\*)/g, '<span style="color: var(--markdown-italic)">$1</span>$2<span style="color: var(--markdown-italic)">$3</span>')
      .replace(/(`)(.*?)(`)/g, '<span style="color: var(--markdown-code)">$1</span>$2<span style="color: var(--markdown-code)">$3</span>')
      .replace(/(\[)(.*?)(\])(\()(.*?)(\))/g, '<span style="color: var(--markdown-link)">$1</span>$2<span style="color: var(--markdown-link)">$3$4</span>$5<span style="color: var(--markdown-link)">$6</span>')
      .replace(/^(\s*)([-\*\+])(\s+)/gm, '$1<span style="color: var(--markdown-list)">$2</span>$3');
  };

  if (showMarkdownSyntax) {
    return (
      <Card className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Vista Previa</h2>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div 
            className="markdown-preview prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: processContentWithColoredSyntax(content)
                .replace(/\n/g, '<br>')
                .replace(/\n\n/g, '<br><br>')
            }}
          />
        </div>
      </Card>
    );
  }

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
              h1: ({children}) => <h1 className="text-3xl font-bold mb-4 text-black">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-semibold mb-3 text-black">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-semibold mb-2 text-black">{children}</h3>,
              h4: ({children}) => <h4 className="text-lg font-semibold mb-2 text-black">{children}</h4>,
              h5: ({children}) => <h5 className="text-base font-semibold mb-1 text-black">{children}</h5>,
              h6: ({children}) => <h6 className="text-sm font-semibold mb-1 text-black">{children}</h6>,
              strong: ({children}) => <strong className="text-black font-bold">{children}</strong>,
              em: ({children}) => <em className="text-black italic">{children}</em>,
              code: ({children}) => <code className="text-black bg-muted px-1 py-0.5 rounded text-sm">{children}</code>,
              a: ({children, href}) => <a href={href} className="text-black underline">{children}</a>,
              ul: ({children}) => <ul className="text-black list-disc pl-6 mb-4">{children}</ul>,
              ol: ({children}) => <ol className="text-black list-decimal pl-6 mb-4">{children}</ol>,
              li: ({children}) => <li className="mb-1 text-black">{children}</li>,
              p: ({children}) => <p className="mb-4 leading-relaxed text-black">{children}</p>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-black">{children}</blockquote>,
              pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-black">{children}</pre>,
            }}
          >
            {processContentWithColoredSyntax(content)}
          </ReactMarkdown>
        </div>
      </div>
    </Card>
  );
};

export default MarkdownPreview;
