import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import katex from 'katex';
import hljs from 'highlight.js';

interface MarkdownWithLatexProps {
  content: string;
}

export const MarkdownWithLatex: React.FC<MarkdownWithLatexProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const processMathAndMarkdown = (rawText: string): string => {
    if (!rawText) return '';

    // Save escaped dollars
    let text = rawText.replace(/\\\$/g, '%%DOLLAR_PLACEHOLDER%%');

    // Process block math: $$ ... $$
    text = text.replace(/\$\$(.+?)\$\$/gs, (_, mathContent) => {
      try {
        const rendered = katex.renderToString(mathContent.trim(), {
          displayMode: true,
          throwOnError: false,
        });
        return `<div class="my-4 overflow-x-auto">${rendered}</div>`;
      } catch (err) {
        return mathContent;
      }
    });

    // Process inline math: $ ... $
    text = text.replace(/\$([^\$\n]+?)\$/g, (_, mathContent) => {
      try {
        return katex.renderToString(mathContent.trim(), {
          displayMode: false,
          throwOnError: false,
        });
      } catch (err) {
        return mathContent;
      }
    });

    // Restore dollar signs
    text = text.replace(/%%DOLLAR_PLACEHOLDER%%/g, '$');

    // Custom renderer for marked
    const renderer = new marked.Renderer();

    // Ensure links open in new tab
    const originalLink = renderer.link.bind(renderer);
    renderer.link = (href: string | null, title: string | null, text: string) => {
      const html = originalLink(href, title, text);
      return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
    };

    // Render youtube code blocks as embedded responsive iframes
    const originalCode = renderer.code.bind(renderer);
    renderer.code = (code: string, language: string | undefined, isEscaped: boolean) => {
      if (language === 'youtube') {
        const videoId = code.trim();
        return `<div class="my-6 w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg bg-black">
          <iframe
            class="w-full aspect-video border-0"
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>`;
      }
      return originalCode(code, language, isEscaped);
    };

    const html = marked.parse(text, {
      renderer,
      gfm: true,
      breaks: true,
    });

    return html as string;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <article
      ref={containerRef}
      className="mt-4 prose prose-slate max-w-none lg:prose-lg dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: processMathAndMarkdown(content) }}
    />
  );
};
