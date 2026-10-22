import { LanguageProvider } from "@/lib/context/language-context";
import { ContentProvider } from "@/lib/context/content-context";
import { getPublicContent } from "@/lib/cms/public";
import { HeaderNav } from "@/components/navigation/header-nav";
import { Footer } from "@/components/navigation/footer";
export const dynamic = "force-dynamic";
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPublicContent();
  return (
    <LanguageProvider>
      <ContentProvider value={content}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <HeaderNav />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </ContentProvider>
    </LanguageProvider>
  );
}
