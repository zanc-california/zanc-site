import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../lib/siteMeta';

export type DocumentMeta = {
  /** Page title without the site suffix — e.g. 'Zambian Independence Celebration 2026'. */
  title?: string;
  description?: string;
  /** Route path used for the canonical + og:url, e.g. '/independence'. */
  path?: string;
  /** Absolute or root-relative image URL for social previews. */
  image?: string;
  /** og:type — 'website' for most pages, 'article' for stories. */
  type?: string;
  /** Schema.org JSON-LD injected for this route only. */
  jsonLd?: Record<string, unknown>;
};

const MANAGED_ATTR = 'data-zanc-meta';

function setTag(selector: string, create: () => HTMLElement, content: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    el.setAttribute(MANAGED_ATTR, '');
    document.head.appendChild(el);
  }
  if (el.tagName === 'LINK') el.setAttribute('href', content);
  else el.setAttribute('content', content);
}

function meta(name: string, content: string) {
  setTag(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  }, content);
}

function property(prop: string, content: string) {
  setTag(`meta[property="${prop}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', prop);
    return el;
  }, content);
}

/**
 * Per-route document metadata for a client-rendered SPA: title, description, canonical, Open Graph
 * / Twitter cards, and optional JSON-LD. Keeps link previews (WhatsApp, Facebook, search) accurate
 * as visitors move between routes.
 */
export function useDocumentMeta({ title, description, path, image, type = 'website', jsonLd }: DocumentMeta) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const desc = description ?? DEFAULT_DESCRIPTION;
    const url = path ? absoluteUrl(path) : undefined;
    const img = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

    document.title = fullTitle;
    meta('description', desc);
    property('og:title', fullTitle);
    property('og:description', desc);
    property('og:type', type);
    property('og:image', img);
    property('og:site_name', SITE_NAME);
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', fullTitle);
    meta('twitter:description', desc);
    meta('twitter:image', img);

    if (url) {
      property('og:url', url);
      setTag('link[rel="canonical"]', () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      }, url);
    }

    if (!jsonLdKey) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED_ATTR, '');
    script.textContent = jsonLdKey;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [title, description, path, image, type, jsonLdKey]);
}
