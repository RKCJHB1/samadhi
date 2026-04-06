import React, { useState, useRef } from 'react';
import { Download, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DownloadPdfButtonProps {
  lessonTitle: string;
  lessonDescription: string;
  contentRef: React.RefObject<HTMLElement>;
  topicName?: string;
  topicId?: string;
  lessonId?: string;
  className?: string;
  quiz?: any;
}

const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  lessonTitle,
  lessonDescription,
  contentRef,
  topicName,
  topicId,
  lessonId,
  className,
  quiz
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleOpenPreview = async () => {
    if (!contentRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to reduce initial bundle size
      const html2pdf = (await import('html2pdf.js')).default;

      // Create a wrapper div for the PDF content
      const pdfContent = document.createElement('div');
      pdfContent.style.padding = '40px';
      pdfContent.style.fontFamily = 'Georgia, serif';
      pdfContent.style.backgroundColor = '#ffffff';
      pdfContent.style.color = '#1a1a1a';
      pdfContent.style.lineHeight = '1.6';
      pdfContent.style.width = '800px';
      pdfContent.style.maxWidth = '800px';
      pdfContent.style.margin = '0 auto';

      // Build lesson URL for linking
      const baseUrl = 'https://www.ramakrishna-johannesburg.org.za';
      const lessonUrl = topicId && lessonId ? `${baseUrl}/learn/lessons/${topicId}/${lessonId}` : baseUrl;

      // Add header with logo and branding
      const header = document.createElement('div');
      header.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f97316;">
          <div style="display: flex; justify-content: center; margin-bottom: 12px;">
            <img src="/pics/icon.png" alt="Ramakrishna Mission Logo" style="width: 80px; height: 80px; display: block;" crossorigin="anonymous" />
          </div>
          <p style="font-size: 16px; color: #666; margin: 0 0 12px 0; font-family: Arial, sans-serif;">The Ramakrishna Centre of South Africa - Johannesburg</p>
          <h1 style="font-size: 36px; color: #1a1a1a; margin: 0 0 12px 0; font-weight: bold; font-family: Georgia, serif;">
            ${lessonTitle}
          </h1>
          ${topicName ? `<p style="font-size: 16px; color: #f97316; margin: 0 0 10px 0; font-weight: 500; font-family: Arial, sans-serif;">${topicName}</p>` : ''}
          <p style="font-size: 16px; color: #666; margin: 0; font-family: Arial, sans-serif;">${lessonDescription}</p>
        </div>
      `;
      pdfContent.appendChild(header);

      // Clone the lesson content
      const contentClone = contentRef.current.cloneNode(true) as HTMLElement;

      // Remove elements that shouldn't be in PDF
      const elementsToRemove = contentClone.querySelectorAll(
        'iframe, video, .quiz-section, [data-pdf-exclude], button, .table-of-contents, script, style'
      );
      elementsToRemove.forEach(el => el.remove());

      // Replace YouTube embeds with links
      const youtubeContainers = contentClone.querySelectorAll('[data-youtube-id]');
      youtubeContainers.forEach((container) => {
        const videoId = container.getAttribute('data-youtube-id');
        if (videoId) {
          const link = document.createElement('p');
          link.style.cssText = 'background: #fef3c7; padding: 10px; border-radius: 4px; margin: 12px 0; font-family: Arial, sans-serif; font-size: 12px;';
          link.innerHTML = `📺 <strong>Watch video:</strong> <a href="https://youtube.com/watch?v=${videoId}" style="color: #f97316;">https://youtube.com/watch?v=${videoId}</a>`;
          container.replaceWith(link);
        }
      });

      // Clean up all Tailwind classes and inline styles that might cause issues
      const allElements = contentClone.querySelectorAll('*');
      allElements.forEach(el => {
        // Map common Tailwind classes to inline styles before stripping them
        const htmlEl = el as HTMLElement;
        const className = htmlEl.className || '';
        if (typeof className === 'string') {
          if (className.includes('text-center')) htmlEl.style.textAlign = 'center';
          if (className.includes('italic')) htmlEl.style.fontStyle = 'italic';
          if (className.includes('font-bold') || className.includes('font-semibold')) htmlEl.style.fontWeight = 'bold';
          if (className.includes('mx-auto')) {
            htmlEl.style.marginLeft = 'auto';
            htmlEl.style.marginRight = 'auto';
          }
          if (className.includes('mb-')) htmlEl.style.marginBottom = '16px';
          if (className.includes('mt-')) htmlEl.style.marginTop = '16px';
        }

        // Remove all classes
        htmlEl.className = '';

        // Reset problematic styles
        const style = htmlEl.getAttribute('style') || '';
        if (style) {
          // Keep only essential styles, remove display/flex/grid that might cause gaps
          const essentialStyles = style
            .split(';')
            .filter(s => {
              const prop = s.split(':')[0]?.trim().toLowerCase();
              // Remove problematic CSS properties
              const problematicProps = ['display', 'flex', 'grid', 'position', 'float', 'transform', 'opacity', 'visibility', 'clip'];
              return !problematicProps.some(p => prop?.includes(p));
            })
            .join(';');
          if (essentialStyles.trim()) {
            htmlEl.setAttribute('style', essentialStyles);
          } else {
            htmlEl.removeAttribute('style');
          }
        }
      });

      // Style headings for PDF
      const headings = contentClone.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName[1]);
        const sizes = { 1: '28px', 2: '24px', 3: '20px', 4: '18px', 5: '16px', 6: '14px' };
        const margins = { 1: '24px 0 12px 0', 2: '20px 0 10px 0', 3: '16px 0 8px 0', 4: '12px 0 6px 0', 5: '10px 0 4px 0', 6: '8px 0 4px 0' };
        heading.style.cssText = `font-size: ${sizes[level as keyof typeof sizes]}; font-weight: bold; margin: ${margins[level as keyof typeof margins]}; color: #1a1a1a; font-family: Georgia, serif; page-break-after: avoid;`;
      });

      // Style paragraphs and lists
      const paragraphs = contentClone.querySelectorAll('p, li');
      paragraphs.forEach(p => {
	        p.style.cssText = [
	          'font-size: 14px',
	          'margin: 8px 0',
	          'line-height: 1.6',
	          'color: #1a1a1a',
	          'font-family: Georgia, serif'
	        ].join('; ');
      });

      // Style images - ensure they don't cause gaps
      const images = contentClone.querySelectorAll('img');
      images.forEach(img => {
        // Restrict maximum width and height so large images (like the Sri Ramakrishna portrait) fit on the first page
        img.style.cssText = 'max-width: 60%; max-height: 350px; object-fit: contain; display: block; margin: 16px auto; border-radius: 6px; page-break-inside: avoid; break-inside: avoid-page;';
        // Also protect the parent container (which often holds the caption)
        if (img.parentElement) {
          img.parentElement.style.pageBreakInside = 'avoid';
          img.parentElement.style.breakInside = 'avoid-page';
          img.parentElement.style.display = 'block';
          img.parentElement.classList.add('avoid-break');
        }
      });

      // Style blockquotes
      const blockquotes = contentClone.querySelectorAll('blockquote');
      blockquotes.forEach(bq => {
	        bq.style.cssText = [
	          'border-left: 4px solid #f97316',
	          'padding: 10px 16px',
	          'margin: 12px 0',
	          'background-color: #fef3c7',
	          'font-style: italic',
	          'font-size: 14px',
	          'color: #1a1a1a',
	          'font-family: Georgia, serif',
	          // Keep blockquotes from being split awkwardly
	          'page-break-inside: avoid',
	          'break-inside: avoid-page'
	        ].join('; ');
      });

      // Style lists
      const lists = contentClone.querySelectorAll('ul, ol');
      lists.forEach(list => {
	        list.style.cssText = [
	          'margin: 8px 0 8px 24px',
	          'padding: 0'
	        ].join('; ');
      });

      pdfContent.appendChild(contentClone);

      // Add quiz section if available
      if (quiz && quiz.questions && quiz.questions.length > 0) {
        const quizSection = document.createElement('div');
        quizSection.style.cssText = 'margin-top: 40px; padding-top: 20px; border-top: 2px solid #f97316; page-break-before: always;';

        const quizTitle = document.createElement('h2');
        quizTitle.textContent = 'Knowledge Check - Quiz Questions & Answers';
        quizTitle.style.cssText = 'font-size: 22px; font-weight: bold; margin: 0 0 20px 0; color: #1a1a1a; font-family: Georgia, serif;';
        quizSection.appendChild(quizTitle);

        quiz.questions.forEach((question: any, index: number) => {
          const questionDiv = document.createElement('div');
          questionDiv.style.cssText = 'margin-bottom: 20px; page-break-inside: avoid;';

          const questionNum = document.createElement('p');
          questionNum.style.cssText = 'font-size: 14px; font-weight: bold; margin: 0 0 8px 0; color: #1a1a1a; font-family: Georgia, serif;';
          questionNum.textContent = `Q${index + 1}: ${question.question}`;
          questionDiv.appendChild(questionNum);

          const answersList = document.createElement('ul');
          answersList.style.cssText = 'margin: 6px 0 6px 24px; padding: 0; list-style-type: lower-alpha;';

          question.answers.forEach((answer: string, answerIndex: number) => {
            const answerItem = document.createElement('li');
            const isCorrect = answerIndex === question.correctAnswer;
            answerItem.style.cssText = `font-size: 14px; margin: 4px 0; color: ${isCorrect ? '#16a34a' : '#1a1a1a'}; font-family: Georgia, serif; ${isCorrect ? 'font-weight: bold;' : ''}`;
            answerItem.textContent = `${answer}${isCorrect ? ' ✓ (Correct Answer)' : ''}`;
            answersList.appendChild(answerItem);
          });

          questionDiv.appendChild(answersList);
          quizSection.appendChild(questionDiv);
        });

        pdfContent.appendChild(quizSection);
      }

      // Add footer with promotional note
      const footer = document.createElement('div');
      footer.innerHTML = `
        <div style="margin-top: 30px; padding-top: 15px; border-top: 2px solid #f97316; text-align: center;">
          <div style="background: #fff7ed; padding: 15px; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #c2410c; font-weight: 600; font-family: Arial, sans-serif;">
              📚 Want more lessons, quizzes, games & spiritual resources?
            </p>
            <p style="margin: 6px 0 0 0; font-size: 12px; color: #1a1a1a; font-family: Arial, sans-serif;">
              Visit us at <strong style="color: #f97316;">www.ramakrishna-johannesburg.org.za</strong>
            </p>
          </div>
        </div>
      `;
      pdfContent.appendChild(footer);

      // ... Set state and open preview
      setPreviewHtml(pdfContent.outerHTML);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Error generating preview:', error);
      alert('Sorry, there was an error generating the preview. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirmDownload = async () => {
    if (!previewRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      // Dynamically import html2pdf to reduce initial bundle size
      const html2pdf = (await import('html2pdf.js')).default;
      const contentToPrint = previewRef.current.firstElementChild as HTMLElement;

      // Generate PDF with improved settings
      const opt = {
        margin: [15, 15, 20, 15], // top, left, bottom, right in mm
        filename: `${lessonTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: 800,
          windowWidth: 800
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        },
        // Use both CSS-aware and legacy algorithms so page-break hints are respected
        // and try to avoid splitting table rows, list items, and paragraphs across pages
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['tr', 'li', 'p', 'blockquote', 'img', 'h1', 'h2', 'h3', '.avoid-break']
        }
      };

      // Generate PDF and add page numbers
      const pdfInstance = html2pdf().set(opt).from(contentToPrint);

      await pdfInstance.toPdf().get('pdf').then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(9);
          pdf.setTextColor(150, 150, 150);
          const pageText = `Page ${i} of ${totalPages}`;
          const textWidth = pdf.getTextWidth(pageText);
          pdf.text(pageText, (pageWidth - textWidth) / 2, pageHeight - 8);
        }
      }).save();

      setIsPreviewOpen(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenPreview}
        disabled={isGenerating}
        className={cn(
          'gap-2 text-gray-600 hover:text-indian-saffron hover:border-indian-saffron',
          className
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="hidden sm:inline">Preparing...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </>
        )}
      </Button>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Preview & Edit Document</DialogTitle>
            <p className="text-sm text-gray-500 mt-2">
              You can click directly inside the document below to edit text, delete lines, or fix spacing before generating the final PDF.
            </p>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto bg-gray-100 p-4 border-y">
            <div
              ref={previewRef}
              className="mx-auto shadow-md"
              style={{ width: '800px', maxWidth: '100%', minHeight: '100%' }}
            >
              <div
                className="bg-white min-h-full outline-none"
                contentEditable={true}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>

          <DialogFooter className="p-4 bg-white">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)} disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDownload} disabled={isGenerating} className="bg-indian-saffron text-white hover:bg-indian-saffron/90">
              {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save as PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadPdfButton;

