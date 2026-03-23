import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';
import { sanitizeRichText } from '../utils/sanitizeRichText';

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<{ title: string; content: string; cover_image_url: string | null; published_at: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      const { data, error: err } = await supabase
        .from('news')
        .select('title, content, cover_image_url, published_at')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (err) {
        setError(err.message);
        setArticle(null);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">Loading...</div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/news">
          <Button variant="primary">Back to News</Button>
        </Link>
      </div>
    );
  }

  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  const sanitizedContent = sanitizeRichText(article.content);

  return (
    <div>
      <PageHeader title={article.title} />
      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {dateStr && <p className="text-sm text-gray-500 mb-6">Published on {dateStr}</p>}
          {article.cover_image_url && (
            <div className="mb-8 rounded-lg overflow-hidden aspect-video w-full bg-gray-100">
              <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link to="/news">
              <Button variant="outline">← Back to News</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsArticle;
