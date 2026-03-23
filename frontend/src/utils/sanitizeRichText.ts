const ALLOWED_TAGS = new Set([
  'A',
  'B',
  'BLOCKQUOTE',
  'BR',
  'EM',
  'H2',
  'H3',
  'H4',
  'I',
  'LI',
  'OL',
  'P',
  'STRONG',
  'UL',
]);

const DROP_WITH_CONTENTS = new Set([
  'EMBED',
  'IFRAME',
  'LINK',
  'META',
  'OBJECT',
  'SCRIPT',
  'STYLE',
]);

function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) return true;

  try {
    const url = new URL(trimmed, window.location.origin);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeElement(element: Element) {
  const tagName = element.tagName.toUpperCase();
  const childElements = Array.from(element.children);
  childElements.forEach((child) => sanitizeElement(child));

  if (DROP_WITH_CONTENTS.has(tagName)) {
    element.remove();
    return;
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    const parent = element.parentNode;
    if (!parent) return;

    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    element.remove();
    return;
  }

  const preservedHref = tagName === 'A' ? element.getAttribute('href') ?? '' : '';
  Array.from(element.attributes).forEach((attribute) => {
    element.removeAttribute(attribute.name);
  });

  if (tagName === 'A') {
    if (isSafeHref(preservedHref)) {
      const safeHref = preservedHref.trim();
      element.setAttribute('href', safeHref);
      element.setAttribute('rel', 'noopener noreferrer');
      if (/^https?:/i.test(safeHref)) {
        element.setAttribute('target', '_blank');
      }
    } else {
      const parent = element.parentNode;
      if (!parent) return;

      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      element.remove();
    }
  }
}

export function sanitizeRichText(html: string): string {
  if (!html.trim()) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return `<p>${escapeHtml(html)}</p>`;
  }

  const parser = new DOMParser();
  const documentFragment = parser.parseFromString(`<body>${html}</body>`, 'text/html');

  Array.from(documentFragment.body.children).forEach((child) => sanitizeElement(child));
  Array.from(documentFragment.body.childNodes).forEach((node) => {
    if (node.nodeType === Node.COMMENT_NODE) {
      node.parentNode?.removeChild(node);
    }
  });

  return documentFragment.body.innerHTML;
}
