import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Brand";

const VANSTER = [
  { to: "/atelier", label: "Atelier" },
  { to: "/bespoke-shirt", label: "Bespoke Shirt" },
] as const;

const HOGER = [{ to: "/contact", label: "Contact" }] as const;

const LANK =
  "label opacity-75 transition-opacity duration-500 hover:opacity-100 [&.active]:opacity-100";

/**
 * Fixed header. On the home page it starts transparent over the dark hero and turns
 * to kraft paper once the hero has scrolled away; on every other page it is kraft from the start.
 */
export function Header() {
  const [oppen, setOppen] = useState(false);
  const [scrollat, setScrollat] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/" && !scrollat;

  useEffect(() => {
    const onScroll = () => setScrollat(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => setOppen(false), [pathname]);

  const ljus = overHero && !oppen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-700 ${
        ljus
          ? "border-b border-transparent text-ivory"
          : "border-b border-line bg-kraft/95 text-ink backdrop-blur-sm"
      }`}
    >
      <div className="container-page grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-6">
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main menu">
          {VANSTER.map((l) => (
            <Link key={l.to} to={l.to} className={LANK}>
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="label justify-self-start md:hidden"
          aria-expanded={oppen}
          aria-controls="mobilmeny"
          onClick={() => setOppen((o) => !o)}
        >
          {oppen ? "Close" : "Menu"}
        </button>

        <Link to="/" aria-label="A.W. Bauer & Co. — home" className="block">
          <Wordmark className="w-44 sm:w-56" label="A.W. Bauer & Co." />
        </Link>

        <nav className="hidden items-center justify-end gap-8 md:flex" aria-label="Secondary menu">
          {HOGER.map((l) => (
            <Link key={l.to} to={l.to} className={LANK}>
              {l.label}
            </Link>
          ))}
          <Link
            to="/appointment"
            className={`label border px-4 py-2.5 transition-colors duration-500 ${
              ljus
                ? "border-ivory/60 hover:bg-ivory hover:text-ink"
                : "border-ink/40 hover:border-green hover:bg-green hover:text-ivory"
            }`}
          >
            Book a Consultation
          </Link>
        </nav>

        <Link to="/appointment" className="label justify-self-end md:hidden">
          Book
        </Link>
      </div>

      {oppen && (
        <nav
          id="mobilmeny"
          aria-label="Mobile menu"
          className="paper flex h-[calc(100svh-5rem)] flex-col justify-between border-t border-line px-5 pt-10 pb-12 md:hidden"
        >
          <ul className="space-y-6">
            {[
              { to: "/", label: "Home" },
              ...VANSTER,
              ...HOGER,
              { to: "/appointment", label: "Book a Consultation" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-display text-3xl font-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="voice text-ink-soft">Brunnsgatan 4, Stockholm</p>
        </nav>
      )}
    </header>
  );
}
