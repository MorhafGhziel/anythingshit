import type { ReactNode } from 'react';

// The real root layout lives in `app/[locale]/layout.tsx`, which sets `lang` and `dir`.
// This pass-through exists so the top-level `not-found.tsx` has a layout to render in.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
