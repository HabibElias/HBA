import { LanguageProvider } from "@/lib/context/language-context";
import { ContentProvider } from "@/lib/context/content-context";
import { getPublicContent, getCopyrightYear } from "@/lib/cms/public";
import { Suspense } from 'react';
import { HeaderNav } from "@/components/navigation/header-nav";
import { Footer } from "@/components/navigation/footer";
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, year] = await Promise.all([getPublicContent('shell'), getCopyrightYear()]);
  return (
    <LanguageProvider>
      <ContentProvider value={content}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Suspense fallback={null}><HeaderNav /></Suspense>
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer year={year} />
      </ContentProvider>
    </LanguageProvider>
  );
}
