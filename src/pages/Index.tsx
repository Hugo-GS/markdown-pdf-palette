import { useState } from 'react';
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownPreview from '@/components/MarkdownPreview';
import SidebarOptions from '@/components/SidebarOptions';
import PDFPreview from '@/components/PDFPreview';
import { usePDFGenerator } from '@/hooks/usePDFGenerator';
const Index = () => {
  const [markdownContent, setMarkdownContent] = useState(`# Mi Documento Markdown

## Introducción

Este es un **ejemplo** de documento en *Markdown* que puedes convertir a PDF.

### Características principales

- **Títulos** con color verde
- **Texto en negritas** con color personalizado
- *Texto en cursivas* con su propio color
- \`Código inline\` con resaltado
- [Enlaces](https://example.com) con colores distintivos

### Lista de elementos

1. Primer elemento de lista numerada
2. Segundo elemento
3. Tercer elemento

#### Lista con viñetas

* Elemento con viñeta
* Otro elemento
* Último elemento

### Código de ejemplo

\`\`\`javascript
function saludar(nombre) {
  console.log(\`¡Hola, \${nombre}!\`);
}

saludar("Mundo");
\`\`\`

> Este es un bloque de cita que resalta información importante.

¡Personaliza este contenido y genera tu PDF!`);
  const [showMarkdownSyntax, setShowMarkdownSyntax] = useState(true);
  const [websiteName, setWebsiteName] = useState('MarkdownToPDF');
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const {
    generatePDF
  } = usePDFGenerator({
    websiteName
  });
  const handleGeneratePDF = () => {
    generatePDF(markdownContent, showMarkdownSyntax);
  };
  return <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <SidebarOptions showMarkdownSyntax={showMarkdownSyntax} onToggleMarkdownSyntax={setShowMarkdownSyntax} websiteName={websiteName} onWebsiteNameChange={setWebsiteName} onGeneratePDF={handleGeneratePDF} showPDFPreview={showPDFPreview} onTogglePDFPreview={setShowPDFPreview} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 bg-card py-0">
          <h1 className="text-2xl font-bold text-primary">
            Markdown to PDF Converter
          </h1>
          <p className="text-muted-foreground mt-1">
            Convierte tu Markdown a PDF con estilos personalizados
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex gap-4 p-4">
          {!showPDFPreview ? <>
              {/* Editor */}
              <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} showMarkdownSyntax={showMarkdownSyntax} />

              {/* Preview */}
              <MarkdownPreview content={markdownContent} showMarkdownSyntax={showMarkdownSyntax} />
            </> : <>
              {/* Editor (smaller) */}
              <div className="w-1/3">
                <MarkdownEditor value={markdownContent} onChange={setMarkdownContent} showMarkdownSyntax={showMarkdownSyntax} />
              </div>

              {/* PDF Preview (larger) */}
              <div className="flex-1">
                <PDFPreview content={markdownContent} showMarkdownSyntax={showMarkdownSyntax} websiteName={websiteName} />
              </div>
            </>}
        </div>
      </div>
    </div>;
};
export default Index;