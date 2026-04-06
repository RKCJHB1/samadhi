import React, { useState, useRef } from 'react';
import { Download, Loader2, Save, FileText, Edit3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [activeTab, setActiveTab] = useState('edit');
  const [pageSize, setPageSize] = useState('a4');
  const [pdfDataUri, setPdfDataUri] = useState('');
  const [isPreviewGenerating, setIsPreviewGenerating] = useState(false);

  const handleOpenPreview = async () => {
    if (!contentRef.current || isGenerating) return;

    setIsGenerating(true);
    setActiveTab('edit');
    setPdfDataUri('');

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

  const generatePdfWithSettings = async (action: 'preview' | 'download', formatSize: string) => {
    if (!previewRef.current) return;

    let printContainer: HTMLDivElement | null = null;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      // Clone the content so it's not affected by display: none from inactive tabs
      const contentToPrint = previewRef.current.firstElementChild?.cloneNode(true) as HTMLElement;
      if (!contentToPrint) return;

      // Append temporarily to the document body so html2canvas can measure it
      printContainer = document.createElement('div');
      printContainer.style.position = 'absolute';
      printContainer.style.left = '-9999px';
      printContainer.style.top = '0';
      printContainer.style.width = '800px';
      printContainer.appendChild(contentToPrint);
      document.body.appendChild(printContainer);

      const opt = {
        margin: [15, 15, 20, 15],
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
          format: formatSize,
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['tr', 'li', 'p', 'blockquote', 'img', 'h1', 'h2', 'h3', '.avoid-break']
        }
      };

      const pdfInstance = html2pdf().set(opt).from(contentToPrint);

      if (action === 'preview') {
        const pdfDataUriString = await pdfInstance.toPdf().get('pdf').then((pdf: any) => {
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
          return pdf.output('datauristring');
        });
        setPdfDataUri(pdfDataUriString);
      } else {
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
      }
    } catch (error) {
      console.error('Error with PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    } finally {
      if (printContainer && document.body.contains(printContainer)) {
        document.body.removeChild(printContainer);
      }
    }
  };

  const handleTabChange = async (val: string) => {
    if (val === 'preview') {
      setIsPreviewGenerating(true);
      await generatePdfWithSettings('preview', pageSize);
      setIsPreviewGenerating(false);
      setActiveTab(val);
    } else {
      setActiveTab(val);
    }
  };

  const handlePageSizeChange = async (val: string) => {
    setPageSize(val);
    if (activeTab === 'preview') {
      setIsPreviewGenerating(true);
      await generatePdfWithSettings('preview', val);
      setIsPreviewGenerating(false);
    }
  };

  const handleConfirmDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    await generatePdfWithSettings('download', pageSize);
    setIsGenerating(false);
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
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2 border-b">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle>Preview & Edit Document</DialogTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Edit the document layout directly or preview the final PDF format.
                </p>
              </div>
              <div className="flex items-center space-x-2 mr-6">
                <span className="text-sm text-gray-600 font-medium">Page Size:</span>
                <Select value={pageSize} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue placeholder="Page Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="letter">US Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-2 bg-gray-50/50">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit HTML Layout
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Preview PDF Pages
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              forceMount
              value="edit"
              className={cn(
                "flex-1 overflow-y-auto bg-gray-100 p-4 m-0 flex-col",
                activeTab === 'edit' ? 'flex' : 'hidden'
              )}
            >
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
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-hidden m-0 bg-gray-100 data-[state=active]:flex flex-col relative">
              {isPreviewGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 backdrop-blur-sm z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-indian-saffron mb-4" />
                  <p className="text-gray-600 font-medium">Generating PDF Preview...</p>
                </div>
              ) : null}
              {pdfDataUri && (
                <iframe
                  src={pdfDataUri}
                  className="w-full h-full border-none"
                  title="PDF Preview"
                />
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="p-4 bg-white border-t">
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

