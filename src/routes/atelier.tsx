import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { BildPlats } from "@/components/BildPlats";
import { ATELIER_AVSNITT, ATELIER_INTRO, BESPOKE_SHIRT, PRISER } from "@/lib/innehall";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "Atelier – A.W. Bauer & Co." },
      { name: "description", content: ATELIER_INTRO.text[0] },
      { property: "og:title", content: "Atelier – A.W. Bauer & Co." },
      { property: "og:description", content: ATELIER_INTRO.text[0] },
      { property: "og:url", content: "/atelier" },
    ],
    links: [{ rel: "canonical", href: "/atelier" }],
  }),
  component: Atelier,
});

function Atelier() {
  return (
    <>
      <section className="container-page pt-16 pb-16 sm:pt-24">
        <Reveal>
          <p className="eyebrow">{ATELIER_INTRO.rubrik}</p>
          <Heading as="h1" className="mt-6 max-w-3xl text-4xl leading-[1.12] sm:text-5xl">
            {ATELIER_INTRO.text[0]}
          </Heading>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {ATELIER_INTRO.text[1]}
          </p>
        </Reveal>
        <nav aria-label="Atelier sections" className="mt-10 flex flex-wrap gap-2">
          {[...ATELIER_AVSNITT, { id: "pricing", rubrik: PRISER.rubrik }].map((a) => (
            <Link
              key={a.id}
              to="/atelier"
              hash={a.id}
              className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:bg-sand"
            >
              {a.rubrik}
            </Link>
          ))}
        </nav>
      </section>

      {ATELIER_AVSNITT.map((a, i) => (
        <section
          key={a.id}
          id={a.id}
          className={`scroll-mt-28 py-16 sm:py-24 ${i % 2 === 0 ? "bg-tint" : ""}`}
        >
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <BildPlats label={a.rubrik} className="aspect-[4/3]" />
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <Heading className="mt-4 text-3xl sm:text-4xl">{a.rubrik}</Heading>
              {a.text.map((t) => (
                <p key={t} className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {t}
                </p>
              ))}
              {a.id === "shirts" && (
                <Link to="/bespoke-shirt" className="btn-base btn-outline mt-8">
                  {BESPOKE_SHIRT.rubrik}
                </Link>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      <section id="pricing" className="container-page scroll-mt-28 py-16 sm:py-24">
        <Reveal>
          <p className="eyebrow">{String(ATELIER_AVSNITT.length + 1).padStart(2, "0")}</p>
          <Heading className="mt-4 text-3xl sm:text-4xl">{PRISER.rubrik}</Heading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {PRISER.text}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
            {PRISER.lista.map((p) => (
              <div key={p.plagg} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm tracking-[0.14em] uppercase">{p.plagg}</dt>
                <dd className="font-display text-lg tabular-nums">{p.pris}</dd>
              </div>
            ))}
          </dl>
          <Link to="/appointment" className="btn-base btn-primary mt-10">
            {BESPOKE_SHIRT.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
