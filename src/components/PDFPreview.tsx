
import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card } from '@/components/ui/card';

interface PDFPreviewProps {
  content: string;
  showMarkdownSyntax: boolean;
  websiteName: string;
}

const PDFPreview = ({ content, showMarkdownSyntax, websiteName }: PDFPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

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

    // Colorear solo los símbolos de markdown para PDF
    return text
      .replace(/(#{1,6})\s/g, '<span style="color: #22c55e">$1</span> ')
      .replace(/(\*\*)(.*?)(\*\*)/g, '<span style="color: #ec4899">$1</span>$2<span style="color: #ec4899">$3</span>')
      .replace(/(?<!\*)(\*)(?!\*)(.*?)(?<!\*)(\*)(?!\*)/g, '<span style="color: #f97316">$1</span>$2<span style="color: #f97316">$3</span>')
      .replace(/(`)(.*?)(`)/g, '<span style="color: #2563eb">$1</span>$2<span style="color: #2563eb">$3</span>')
      .replace(/(\[)(.*?)(\])(\()(.*?)(\))/g, '<span style="color: #dc2626">$1</span>$2<span style="color: #dc2626">$3$4</span>$5<span style="color: #dc2626">$6</span>')
      .replace(/^(\s*)([-\*\+])(\s+)/gm, '$1<span style="color: #7c3aed">$2</span>$3');
  };

  if (showMarkdownSyntax) {
    return (
      <Card className="flex-1 flex flex-col bg-white text-black">
        <div className="p-4 border-b bg-muted/50">
          <h2 className="text-lg font-semibold text-foreground">Vista Previa del PDF</h2>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          <div 
            ref={previewRef}
            className="max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm] relative"
            style={{ 
              width: '210mm',
              minHeight: '297mm',
              padding: '20mm',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            {/* PDF Content */}
            <div 
              className="pdf-content text-black"
              dangerouslySetInnerHTML={{ 
                __html: processContentWithColoredSyntax(content)
                  .replace(/\n/g, '<br>')
                  .replace(/\n\n/g, '<br><br>')
              }}
            />

            {/* Footer */}
            <div 
              className="absolute bottom-0 left-0 right-0 flex justify-between items-center text-sm text-gray-500 border-t pt-2"
              style={{ 
                margin: '0 20mm 10mm 20mm',
                paddingTop: '10px'
              }}
            >
              <span>{websiteName || 'Mi Sitio Web'}</span>
              <span>Página 1</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col bg-white text-black">
      <div className="p-4 border-b bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground">Vista Previa del PDF</h2>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <div 
          ref={previewRef}
          className="max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm] relative"
          style={{ 
            width: '210mm',
            minHeight: '297mm',
            padding: '20mm',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          {/* PDF Content */}
          <div className="pdf-content text-black">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-black">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 text-black">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold mb-3 text-black">{children}</h3>,
                h4: ({children}) => <h4 className="text-lg font-semibold mb-2 text-black">{children}</h4>,
                h5: ({children}) => <h5 className="text-base font-semibold mb-2 text-black">{children}</h5>,
                h6: ({children}) => <h6 className="text-sm font-semibold mb-1 text-black">{children}</h6>,
                strong: ({children}) => <strong className="text-black font-bold">{children}</strong>,
                em: ({children}) => <em className="text-black italic">{children}</em>,
                code: ({children}) => <code className="text-black bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                a: ({children, href}) => <a href={href} className="text-black underline">{children}</a>,
                ul: ({children}) => <ul className="text-black list-disc pl-6 mb-4">{children}</ul>,
                ol: ({children}) => <ol className="text-black list-decimal pl-6 mb-4">{children}</ol>,
                li: ({children}) => <li className="mb-1 text-black">{children}</li>,
                p: ({children}) => <p className="mb-4 leading-relaxed text-black">{children}</p>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-700">{children}</blockquote>,
                pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-black">{children}</pre>,
              }}
            >
              {processContentWithColoredSyntax(content)}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div 
            className="absolute bottom-0 left-0 right-0 flex justify-between items-center text-sm text-gray-500 border-t pt-2"
            style={{ 
              margin: '0 20mm 10mm 20mm',
              paddingTop: '10px'
            }}
          >
            <span>{websiteName || 'Mi Sitio Web'}</span>
            <span>Página 1</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PDFPreview;
