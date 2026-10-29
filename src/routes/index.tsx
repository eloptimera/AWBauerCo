import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { BildPlats } from "@/components/BildPlats";
import { FORETAG, TAGLINE } from "@/lib/foretag";
import { ATELIER_AVSNITT, ATELIER_INTRO, BESPOKE_SHIRT, HEAD_CUTTER } from "@/lib/innehall";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.W. Bauer & Co. – Bespoke Tailoring in Stockholm since 1863" },
      {
        name: "description",
        content: `${TAGLINE.rad1} ${TAGLINE.rad2} ${TAGLINE.rad3}`,
      },
      { property: "og:title", content: "A.W. Bauer & Co. – Bespoke Tailoring in Stockholm" },
      { property: "og:description", content: TAGLINE.rad3 },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Start,
});

function Start() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden bg-primary pt-24 pb-16 text-primary-foreground">
        <div className="container-page">
          <p className="eyebrow text-primary-foreground/70">
            {FORETAG.namn} · {FORETAG.ort}
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.08] sm:text-6xl">{TAGLINE.rad3}</h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-primary-foreground/80">
            {TAGLINE.rad1}
            <br />
            {TAGLINE.rad2}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/appointment"
              className="btn-base bg-primary-foreground text-primary hover:opacity-90"
            >
              {BESPOKE_SHIRT.cta}
            </Link>
            <Link
              to="/atelier"
              className="btn-base border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
            >
              The Atelier
            </Link>
          </div>
        </div>
      </section>

      {/* Head cutter */}
      <section className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal>
          <BildPlats label={`${HEAD_CUTTER.titel} ${HEAD_CUTTER.namn}`} className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{HEAD_CUTTER.titel}</p>
          <Heading className="mt-4 text-3xl sm:text-4xl">{HEAD_CUTTER.namn}</Heading>
          {HEAD_CUTTER.text.map((t) => (
            <p key={t} className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t}
            </p>
          ))}
        </Reveal>
      </section>

      {/* Atelier overview */}
      <section className="bg-tint py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">{ATELIER_INTRO.rubrik}</p>
                <Heading className="mt-4 max-w-xl text-3xl sm:text-4xl">
                  {ATELIER_INTRO.text[0]}
                </Heading>
              </div>
              <Link
                to="/atelier"
                className="inline-flex items-center gap-2 self-start border-b border-foreground/40 pb-0.5 text-sm font-medium transition-colors duration-300 hover:border-foreground md:self-end"
              >
                Visit the atelier
                <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ATELIER_AVSNITT.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <Link
                  to="/atelier"
                  hash={a.id}
                  className="group flex h-full min-h-[14rem] flex-col justify-between rounded-sm border border-line bg-card p-6 transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-8">
                    <h3 className="text-xl">{a.rubrik}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/80">
                      {a.kort}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke shirt */}
      <section className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <Reveal className="lg:order-2">
          <BildPlats label={BESPOKE_SHIRT.rubrik} className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{BESPOKE_SHIRT.rubrik}</p>
          <Heading className="mt-4 text-3xl sm:text-4xl">{BESPOKE_SHIRT.underrubrik}</Heading>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            {BESPOKE_SHIRT.text[0]}
          </p>
          <Link to="/bespoke-shirt" className="btn-base btn-outline mt-8">
            Discover the bespoke shirt
          </Link>
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="container-page">
        <Reveal>
          <div className="rounded-sm bg-primary px-8 py-16 text-primary-foreground sm:px-16 sm:py-20">
            <h2 className="max-w-xl text-3xl sm:text-4xl">{TAGLINE.rad1}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">{TAGLINE.rad2}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="btn-base bg-background text-foreground hover:opacity-90"
              >
                {BESPOKE_SHIRT.cta}
              </Link>
              <a
                href={`tel:${FORETAG.telefonLank}`}
                className="btn-base border border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {FORETAG.telefon}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
