import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DownloadPdfButtonProps {
  lessonTitle: string;
  lessonDescription: string;
  contentRef: React.RefObject<HTMLElement>;
  topicName?: string;
  topicId?: string;
  lessonId?: string;
  className?: string;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  lessonTitle,
  lessonDescription,
  contentRef,
  topicName,
  topicId,
  lessonId,
  className
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to reduce initial bundle size
      const html2pdf = (await import('html2pdf.js')).default;

      // Create a wrapper div for the PDF content with border
      const pdfContent = document.createElement('div');
      pdfContent.style.padding = '20px 35px 35px 35px';
      pdfContent.style.fontFamily = 'Georgia, serif';
      pdfContent.style.backgroundColor = '#ffffff';
      pdfContent.style.color = '#1a1a1a';
      pdfContent.style.border = '2px solid #e5e5e5';
      pdfContent.style.borderRadius = '4px';

      // Build lesson URL for linking
      const baseUrl = 'https://www.ramakrishna-johannesburg.org.za';
      const lessonUrl = topicId && lessonId ? `${baseUrl}/learn/lessons/${topicId}/${lessonId}` : baseUrl;

      // Add header with logo and branding
      const header = document.createElement('div');
      header.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 2px solid #f97316;">
          <div style="display: flex; justify-content: center; margin-bottom: 5px;">
            <img src="/pics/icon.png" alt="Ramakrishna Mission Logo" style="width: 65px; height: 65px; display: block;" crossorigin="anonymous" />
          </div>
          <p style="font-size: 15px; color: #666; margin: 0 0 12px 0;">The Ramakrishna Centre of South Africa - Johannesburg</p>
          <h1 style="font-size: 28px; color: #1a1a1a; margin: 0 0 10px 0; font-weight: bold;">
            <a href="${lessonUrl}" style="color: #1a1a1a; text-decoration: none;">${lessonTitle}</a>
          </h1>
          ${topicName ? `<p style="font-size: 14px; color: #f97316; margin: 0 0 10px 0; font-weight: 500;">${topicName}</p>` : ''}
          <p style="font-size: 14px; color: #666; margin: 0;">${lessonDescription}</p>
        </div>
      `;
      pdfContent.appendChild(header);

      // Clone the lesson content
      const contentClone = contentRef.current.cloneNode(true) as HTMLElement;
      
      // Remove elements that shouldn't be in PDF
      const elementsToRemove = contentClone.querySelectorAll(
        'iframe, video, .quiz-section, [data-pdf-exclude], button, .table-of-contents'
      );
      elementsToRemove.forEach(el => el.remove());

      // Replace YouTube embeds with links
      const youtubeContainers = contentClone.querySelectorAll('[data-youtube-id]');
      youtubeContainers.forEach((container) => {
        const videoId = container.getAttribute('data-youtube-id');
        if (videoId) {
          const link = document.createElement('p');
          link.style.cssText = 'background: #fef3c7; padding: 12px; border-radius: 8px; margin: 16px 0;';
          link.innerHTML = `📺 <strong>Watch video:</strong> <a href="https://youtube.com/watch?v=${videoId}" style="color: #f97316;">https://youtube.com/watch?v=${videoId}</a>`;
          container.replaceWith(link);
        }
      });

      // Style adjustments for PDF
      contentClone.style.cssText = 'font-size: 12pt; line-height: 1.6;';

      // Make headings link back to the lesson page
      const headings = contentClone.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        const headingText = heading.textContent || '';
        const headingId = heading.id || headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const headingUrl = `${lessonUrl}#${headingId}`;
        heading.innerHTML = `<a href="${headingUrl}" style="color: inherit; text-decoration: none;">${headingText}</a>`;
      });

      // Make sure images are reasonably sized with padding above
      const images = contentClone.querySelectorAll('img');
      images.forEach(img => {
        img.style.maxWidth = '50%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '25px auto 10px auto';
      });

      pdfContent.appendChild(contentClone);

      // Add footer with promotional note
      const footer = document.createElement('div');
      footer.innerHTML = `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #f97316; text-align: center;">
          <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); padding: 20px; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #c2410c; font-weight: 600;">
              📚 Want more lessons, quizzes, games & spiritual resources?
            </p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #1a1a1a;">
              Visit us at <strong style="color: #f97316;">www.ramakrishna-johannesburg.org.za</strong>
            </p>
          </div>
        </div>
      `;
      pdfContent.appendChild(footer);

      // Generate PDF with page numbers
      const opt = {
        margin: [10, 10, 15, 10], // Extra bottom margin for page numbers
        filename: `${lessonTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      // Generate PDF and add page numbers
      const pdfInstance = html2pdf().set(opt).from(pdfContent);

      await pdfInstance.toPdf().get('pdf').then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(150, 150, 150);
          const pageText = `Page ${i} of ${totalPages}`;
          const textWidth = pdf.getTextWidth(pageText);
          pdf.text(pageText, (pageWidth - textWidth) / 2, pageHeight - 7);
        }
      }).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isGenerating}
      className={cn(
        'gap-2 text-gray-600 hover:text-indian-saffron hover:border-indian-saffron',
        className
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:inline">Generating...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </>
      )}
    </Button>
  );
};

export default DownloadPdfButton;

