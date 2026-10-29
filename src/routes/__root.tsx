import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import ogImage from "@/assets/photos/fitting-1200.jpg";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <section className="paper flex min-h-[70vh] items-center justify-center px-5 pt-24">
      <div className="max-w-md text-center">
        <p className="label text-ink-soft">404</p>
        <h1 className="mt-6 text-4xl">This page is not in our books</h1>
        <p className="voice mt-4 text-lg text-ink-soft">
          It may have moved, or the address may be mistyped.
        </p>
        <Link to="/" className="btn-base btn-primary mt-10">
          Back to the atelier
        </Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A.W. Bauer & Co. – Bespoke Tailoring in Stockholm since 1863" },
      {
        name: "description",
        content:
          "A.W.Bauer & Co is a modern bespoke-only service at Brunnsgatan 4 in Stockholm. Bespoke suits, coats, shirts and knitwear. We have outfitted men of distinction since 1863.",
      },
      { property: "og:site_name", content: "A.W. Bauer & Co." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: ogImage },
      { name: "theme-color", content: "#12211a" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preload",
        href: "/fonts/jost-latin-300-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/eb-garamond-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.ico?v=3", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png?v=3", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/icon-192.png?v=3", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=3" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "A.W. Bauer & Co.",
          legalName: "Bauer & Co Aktiebolag",
          description:
            "A modern bespoke-only service. Bespoke tailoring of suits, coats, shirts and knitwear in Stockholm since 1863.",
          url: "https://www.awbauerco.com",
          telephone: "+468104780",
          email: "contact@awbauerco.com",
          foundingDate: "1863",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Brunnsgatan 4",
            postalCode: "111 38",
            addressLocality: "Stockholm",
            addressCountry: "SE",
          },
          openingHours: "Mo-Fr 09:00-17:00",
          sameAs: ["https://www.instagram.com/a.w.bauer.co/", "https://www.facebook.com/awbauerco"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 overflow-x-clip">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
