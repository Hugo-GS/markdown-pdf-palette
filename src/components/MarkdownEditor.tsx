
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  showMarkdownSyntax: boolean;
}

const MarkdownEditor = ({ value, onChange, showMarkdownSyntax }: MarkdownEditorProps) => {
  const processedValue = showMarkdownSyntax ? value : value
    .replace(/#{1,6}\s?/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^\s*[-\*\+]\s+/gm, '• ');

  return (
    <Card className="flex-1 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Editor de Markdown</h2>
      </div>
      <div className="flex-1 p-4">
        <Textarea
          value={showMarkdownSyntax ? value : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe tu markdown aquí..."
          className="min-h-[500px] resize-none font-mono text-sm leading-relaxed"
        />
      </div>
    </Card>
  );
};

export default MarkdownEditor;
