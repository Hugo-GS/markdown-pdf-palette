import { useCallback } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface UsePDFGeneratorProps {
  websiteName: string;
}

export const usePDFGenerator = ({ websiteName }: UsePDFGeneratorProps) => {
  const generatePDF = useCallback(async (content: string, showMarkdownSyntax: boolean) => {
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '210mm';
      tempDiv.style.minHeight = '297mm';
      tempDiv.style.padding = '20mm';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Outfit, sans-serif';
      tempDiv.style.color = 'black';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.6';

      // Process content
      const displayContent = showMarkdownSyntax ? content : content
        .replace(/#{1,6}\s?/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/^\s*[-\*\+]\s+/gm, '• ');

      // Convert markdown to HTML using exact OKLCH colors
      let htmlContent = displayContent
        .replace(/^# (.*$)/gm, '<h1 style="color: oklch(0.4534 0.0911 168.6646); font-size: 24px; font-weight: bold; margin: 24px 0 16px 0;">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 style="color: oklch(0.4534 0.0911 168.6646); font-size: 20px; font-weight: 600; margin: 20px 0 12px 0;">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 style="color: oklch(0.4534 0.0911 168.6646); font-size: 18px; font-weight: 600; margin: 16px 0 8px 0;">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color: oklch(0.5924 0.2025 355.8943); font-weight: bold;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em style="color: oklch(0.5808 0.1732 39.5003); font-style: italic;">$1</em>')
        .replace(/`(.*?)`/g, '<code style="color: oklch(0.6437 0.1019 187.3840); background-color: #f3f4f6; padding: 2px 4px; border-radius: 4px; font-family: monospace;">$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: oklch(0.5863 0.2064 27.1172); text-decoration: underline;">$1</a>')
        .replace(/^\* (.*$)/gm, '<li style="color: oklch(0.6149 0.1394 244.9273); margin: 4px 0;">$1</li>')
        .replace(/^(\d+)\. (.*$)/gm, '<li style="color: oklch(0.6149 0.1394 244.9273); margin: 4px 0;">$2</li>')
        .replace(/\n\n/g, '</p><p style="margin: 16px 0; line-height: 1.6;">')
        .replace(/\n/g, '<br>');

      // Wrap in paragraphs
      htmlContent = `<p style="margin: 16px 0; line-height: 1.6;">${htmlContent}</p>`;

      // Handle lists
      htmlContent = htmlContent.replace(/(<li[^>]*>.*?<\/li>)/g, (match) => {
        if (htmlContent.indexOf('<ul>') === -1 && htmlContent.indexOf('<ol>') === -1) {
          return `<ul style="padding-left: 24px; margin: 16px 0;">${match}</ul>`;
        }
        return match;
      });

      tempDiv.innerHTML = htmlContent;

      // Add footer
      const footer = document.createElement('div');
      footer.style.position = 'absolute';
      footer.style.bottom = '10mm';
      footer.style.left = '20mm';
      footer.style.right = '20mm';
      footer.style.display = 'flex';
      footer.style.justifyContent = 'space-between';
      footer.style.fontSize = '10px';
      footer.style.color = '#6b7280';
      footer.style.borderTop = '1px solid #e5e7eb';
      footer.style.paddingTop = '8px';
      footer.innerHTML = `
        <span>${websiteName || 'Mi Sitio Web'}</span>
        <span>Página 1</span>
      `;

      tempDiv.appendChild(footer);
      document.body.appendChild(tempDiv);

      // Generate PDF
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in points
        height: 1123, // A4 height in points
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const imgWidth = 595; // A4 width in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('documento-markdown.pdf');

      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  }, [websiteName]);

  return { generatePDF };
};
