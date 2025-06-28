
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileDown, Eye, Settings } from 'lucide-react';

interface SidebarOptionsProps {
  showMarkdownSyntax: boolean;
  onToggleMarkdownSyntax: (value: boolean) => void;
  websiteName: string;
  onWebsiteNameChange: (value: string) => void;
  onGeneratePDF: () => void;
  showPDFPreview: boolean;
  onTogglePDFPreview: (value: boolean) => void;
}

const SidebarOptions = ({
  showMarkdownSyntax,
  onToggleMarkdownSyntax,
  websiteName,
  onWebsiteNameChange,
  onGeneratePDF,
  showPDFPreview,
  onTogglePDFPreview
}: SidebarOptionsProps) => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Opciones de Formato</h2>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Sintaxis de Markdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="markdown-syntax"
                  checked={showMarkdownSyntax}
                  onCheckedChange={onToggleMarkdownSyntax}
                />
                <Label htmlFor="markdown-syntax" className="text-sm">
                  Mostrar comandos (#, **, etc.)
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Activa para ver los símbolos de markdown en la vista previa y PDF
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Configuración del PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-name" className="text-sm">
                  Marca de agua (pie de página)
                </Label>
                <Input
                  id="website-name"
                  value={websiteName}
                  onChange={(e) => onWebsiteNameChange(e.target.value)}
                  placeholder="Nombre de tu sitio web"
                  className="text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="pdf-preview"
                  checked={showPDFPreview}
                  onCheckedChange={onTogglePDFPreview}
                />
                <Label htmlFor="pdf-preview" className="text-sm">
                  Vista previa del PDF
                </Label>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="space-y-3">
            <Button 
              onClick={onTogglePDFPreview}
              variant="outline" 
              className="w-full justify-start gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPDFPreview ? 'Ocultar' : 'Mostrar'} Vista Previa PDF
            </Button>
            
            <Button 
              onClick={onGeneratePDF}
              className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
            >
              <FileDown className="h-4 w-4" />
              Descargar PDF
            </Button>
          </div>

          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                Colores de Markdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-heading)'}}></div>
                  <span>Títulos (#)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-bold)'}}></div>
                  <span>Negritas (**)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-italic)'}}></div>
                  <span>Cursivas (*)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-code)'}}></div>
                  <span>Código (`)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-link)'}}></div>
                  <span>Enlaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'var(--markdown-list)'}}></div>
                  <span>Listas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SidebarOptions;
