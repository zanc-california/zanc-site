import { useEffect } from 'react';
import Button from './Button';
import { sanitizeRichText } from '../utils/sanitizeRichText';

export type ModalArticleContent = {
  title: string;
  date: string;
  imageUrl?: string | null;
  /** Plain-text paragraphs (static articles) */
  bodyParagraphs?: string[];
  /** HTML from CMS (Supabase) */
  htmlContent?: string | null;
  loading?: boolean;
  error?: string | null;
};

type NewsArticleModalProps = {
  open: boolean;
  onClose: () => void;
  article: ModalArticleContent | null;
};

const NewsArticleModal = ({ open, onClose, article }: NewsArticleModalProps) => {
  const sanitizedHtmlContent = article?.htmlContent ? sanitizeRichText(article.htmlContent) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close article"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-article-modal-title"
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-xl shadow-xl border border-mist flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-mist bg-cloud/80 shrink-0">
          <h2 id="news-article-modal-title" className="text-lg font-heading font-semibold text-zambia-green pr-2 line-clamp-2">
            {article?.title ?? 'Article'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-slate hover:text-zambia-green px-2 py-1 rounded-md text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-4 py-5 sm:px-6">
          {!article || article.loading ? (
            <p className="text-slate text-center py-8">Loading article…</p>
          ) : article.error ? (
            <p className="text-redwood text-center py-8">{article.error}</p>
          ) : (
            <>
              {article.date && <p className="text-sm text-slate mb-4">{article.date}</p>}
              {article.imageUrl ? (
                <div className="mb-6 rounded-lg overflow-hidden border border-mist bg-cloud aspect-[4/3] max-h-64 w-full">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : null}
              {article.bodyParagraphs && article.bodyParagraphs.length > 0 && (
                <div className="space-y-4 text-slate leading-relaxed">
                  {article.bodyParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {article.htmlContent && (
                <div
                  className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-zambia-green"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent ?? '' }}
                />
              )}
            </>
          )}
        </div>

        <div className="px-4 py-3 border-t border-mist bg-white shrink-0">
          <Button variant="outline" className="w-full sm:w-auto" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsArticleModal;
