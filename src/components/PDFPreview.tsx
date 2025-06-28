
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

    // Usar los colores exactos del CSS con valores OKLCH
    return text
      .replace(/(#{1,6})\s/g, '<span style="color: oklch(0.4534 0.0911 168.6646); font-weight: bold;">$1</span> ')
      .replace(/(\*\*)(.*?)(\*\*)/g, '<span style="color: oklch(0.5924 0.2025 355.8943);">$1</span>$2<span style="color: oklch(0.5924 0.2025 355.8943);">$3</span>')
      .replace(/(?<!\*)(\*)(?!\*)(.*?)(?<!\*)(\*)(?!\*)/g, '<span style="color: oklch(0.5808 0.1732 39.5003);">$1</span>$2<span style="color: oklch(0.5808 0.1732 39.5003);">$3</span>')
      .replace(/(`)(.*?)(`)/g, '<span style="color: oklch(0.6437 0.1019 187.3840);">$1</span>$2<span style="color: oklch(0.6437 0.1019 187.3840);">$3</span>')
      .replace(/(\[)(.*?)(\])(\()(.*?)(\))/g, '<span style="color: oklch(0.5863 0.2064 27.1172);">$1</span>$2<span style="color: oklch(0.5863 0.2064 27.1172);">$3$4</span>$5<span style="color: oklch(0.5863 0.2064 27.1172);">$6</span>')
      .replace(/^(\s*)([-\*\+])(\s+)/gm, '$1<span style="color: oklch(0.6149 0.1394 244.9273);">$2</span>$3');
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
            <div 
              className="pdf-content text-black"
              style={{ fontSize: '14px', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ 
                __html: processContentWithColoredSyntax(content)
                  .replace(/\n/g, '<br>')
                  .replace(/\n\n/g, '<br><br>')
              }}
            />

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
          <div className="pdf-content text-black" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({children}) => <h1 className="text-black font-bold mb-6" style={{fontSize: '32px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h1>,
                h2: ({children}) => <h2 className="text-black font-bold mb-4" style={{fontSize: '28px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h2>,
                h3: ({children}) => <h3 className="text-black font-bold mb-3" style={{fontSize: '24px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h3>,
                h4: ({children}) => <h4 className="text-black font-bold mb-2" style={{fontSize: '20px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h4>,
                h5: ({children}) => <h5 className="text-black font-bold mb-2" style={{fontSize: '18px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h5>,
                h6: ({children}) => <h6 className="text-black font-bold mb-1" style={{fontSize: '16px', lineHeight: '1.2', fontWeight: 'bold'}}>{children}</h6>,
                strong: ({children}) => <strong className="text-black" style={{fontWeight: 'bold'}}>{children}</strong>,
                em: ({children}) => <em className="text-black" style={{fontStyle: 'italic'}}>{children}</em>,
                code: ({children}) => <code className="text-black bg-gray-100 px-2 py-1 rounded font-mono" style={{fontSize: '13px'}}>{children}</code>,
                a: ({children, href}) => <a href={href} className="text-black underline">{children}</a>,
                ul: ({children}) => <ul className="text-black list-disc pl-6 mb-4">{children}</ul>,
                ol: ({children}) => <ol className="text-black list-decimal pl-6 mb-4">{children}</ol>,
                li: ({children}) => <li className="mb-1 text-black" style={{fontSize: '14px'}}>{children}</li>,
                p: ({children}) => <p className="mb-4 leading-relaxed text-black" style={{fontSize: '14px', lineHeight: '1.6'}}>{children}</p>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-green-500 pl-4 italic my-4 text-gray-700 bg-gray-50 p-3">{children}</blockquote>,
                pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-black font-mono" style={{fontSize: '13px'}}>{children}</pre>,
              }}
            >
              {processContentWithColoredSyntax(content)}
            </ReactMarkdown>
          </div>

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
