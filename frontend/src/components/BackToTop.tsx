import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-copper text-white shadow-lg hover:bg-copper-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

