
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
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.6';

      // Process content based on markdown syntax visibility
      let processedContent = content;
      
      if (!showMarkdownSyntax) {
        processedContent = content
          .replace(/#{1,6}\s?/g, '')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/`(.*?)`/g, '$1')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .replace(/^\s*[-\*\+]\s+/gm, '• ');
      }

      // Convert markdown to HTML with proper styling
      let htmlContent = processedContent
        .replace(/^# (.*$)/gm, '<h1 style="color: black; font-size: 32px; font-weight: bold; margin: 24px 0 16px 0; line-height: 1.2;">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 style="color: black; font-size: 28px; font-weight: bold; margin: 20px 0 12px 0; line-height: 1.2;">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 style="color: black; font-size: 24px; font-weight: bold; margin: 16px 0 10px 0; line-height: 1.2;">$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4 style="color: black; font-size: 20px; font-weight: bold; margin: 14px 0 8px 0; line-height: 1.2;">$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5 style="color: black; font-size: 18px; font-weight: bold; margin: 12px 0 6px 0; line-height: 1.2;">$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6 style="color: black; font-size: 16px; font-weight: bold; margin: 10px 0 4px 0; line-height: 1.2;">$1</h6>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold; color: black;">$1</strong>')
        .replace(/(?<!\*)(\*)(?!\*)(.*?)(?<!\*)(\*)(?!\*)/g, '<em style="font-style: italic; color: black;">$2</em>')
        .replace(/`(.*?)`/g, '<code style="background-color: #f3f4f6; color: black; padding: 3px 6px; border-radius: 4px; font-family: \'Space Mono\', monospace; font-size: 13px;">$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: black; text-decoration: underline;">$1</a>')
        .replace(/^> (.*)$/gm, '<blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 16px 0; font-style: italic; color: #374151; background-color: #f9fafb; padding: 12px 16px;">$1</blockquote>');

      // Handle lists with proper styling
      htmlContent = htmlContent
        .replace(/^\* (.*)$/gm, '<li style="margin: 6px 0; font-size: 14px; color: black;">$1</li>')
        .replace(/^(\d+)\. (.*)$/gm, '<li style="margin: 6px 0; font-size: 14px; color: black;">$2</li>');

      // Handle code blocks
      htmlContent = htmlContent.replace(/```(\w+)?\n([\s\S]*?)```/g, 
        '<pre style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 16px; margin: 16px 0; overflow-x: auto; font-family: \'Space Mono\', monospace; font-size: 13px; line-height: 1.4; color: black;"><code>$2</code></pre>'
      );

      // If showing markdown syntax, apply colors to syntax elements
      if (showMarkdownSyntax) {
        htmlContent = htmlContent
          .replace(/(#{1,6})\s/g, '<span style="color: oklch(0.4534 0.0911 168.6646); font-weight: bold;">$1</span> ')
          .replace(/(\*\*)(.*?)(\*\*)/g, '<span style="color: oklch(0.5924 0.2025 355.8943);">$1</span>$2<span style="color: oklch(0.5924 0.2025 355.8943);">$3</span>')
          .replace(/(?<!\*)(\*)(?!\*)(.*?)(?<!\*)(\*)(?!\*)/g, '<span style="color: oklch(0.5808 0.1732 39.5003);">$1</span>$2<span style="color: oklch(0.5808 0.1732 39.5003);">$3</span>')
          .replace(/(`)(.*?)(`)/g, '<span style="color: oklch(0.6437 0.1019 187.3840);">$1</span>$2<span style="color: oklch(0.6437 0.1019 187.3840);">$3</span>')
          .replace(/(\[)(.*?)(\])(\()(.*?)(\))/g, '<span style="color: oklch(0.5863 0.2064 27.1172);">$1</span>$2<span style="color: oklch(0.5863 0.2064 27.1172);">$3$4</span>$5<span style="color: oklch(0.5863 0.2064 27.1172);">$6</span>')
          .replace(/^(\s*)([-\*\+])(\s+)/gm, '$1<span style="color: oklch(0.6149 0.1394 244.9273);">$2</span>$3');
      }

      // Wrap in paragraphs and handle line breaks
      htmlContent = htmlContent
        .replace(/\n\n/g, '</p><p style="margin: 12px 0; line-height: 1.6; font-size: 14px; color: black;">')
        .replace(/\n/g, '<br>');

      // Wrap content in paragraph tags
      htmlContent = `<div style="font-size: 14px; line-height: 1.6; color: black;"><p style="margin: 12px 0; line-height: 1.6;">${htmlContent}</p></div>`;

      // Handle lists properly
      htmlContent = htmlContent.replace(/(<li[^>]*>.*?<\/li>)/gs, (match, li) => {
        if (!htmlContent.includes('<ul>') && !htmlContent.includes('<ol>')) {
          return `<ul style="padding-left: 24px; margin: 16px 0; list-style-type: disc;">${li}</ul>`;
        }
        return li;
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
      footer.style.fontSize = '12px';
      footer.style.color = '#6b7280';
      footer.style.borderTop = '1px solid #e5e7eb';
      footer.style.paddingTop = '8px';
      footer.innerHTML = `
        <span>${websiteName || 'Mi Sitio Web'}</span>
        <span>Página 1</span>
      `;

      tempDiv.appendChild(footer);
      document.body.appendChild(tempDiv);

      // Generate PDF with high quality
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        useCORS: true,
        allowTaint: true,
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const imgWidth = 595;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Download the PDF
      const fileName = `documento-markdown-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      console.log('PDF generado y descargado exitosamente');
      return true;
    } catch (error) {
      console.error('Error al generar PDF:', error);
      return false;
    }
  }, [websiteName]);

  return { generatePDF };
};
