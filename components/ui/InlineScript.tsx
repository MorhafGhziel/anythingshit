'use client';

/**
 * Executes during HTML parsing on full page loads. On client-side renders the tag is inert
 * (`text/plain`), which avoids React's script warning; `suppressHydrationWarning` accepts the
 * difference. Pattern from the Next.js "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
