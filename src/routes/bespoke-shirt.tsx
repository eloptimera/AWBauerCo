import { createFileRoute, Link } from "@tanstack/react-router";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { BildPlats } from "@/components/BildPlats";
import { BESPOKE_SHIRT } from "@/lib/innehall";

export const Route = createFileRoute("/bespoke-shirt")({
  head: () => ({
    meta: [
      { title: "Bespoke Shirt – A.W. Bauer & Co." },
      { name: "description", content: BESPOKE_SHIRT.text[0] },
      { property: "og:title", content: "Bespoke Shirt – A.W. Bauer & Co." },
      { property: "og:description", content: BESPOKE_SHIRT.underrubrik },
      { property: "og:url", content: "/bespoke-shirt" },
    ],
    links: [{ rel: "canonical", href: "/bespoke-shirt" }],
  }),
  component: BespokeShirt,
});

function BespokeShirt() {
  return (
    <>
      <section className="container-page pt-16 pb-12 sm:pt-24">
        <Reveal>
          <p className="eyebrow">{BESPOKE_SHIRT.rubrik}</p>
          <Heading as="h1" className="mt-6 max-w-3xl text-4xl leading-[1.12] sm:text-5xl">
            {BESPOKE_SHIRT.underrubrik}
          </Heading>
        </Reveal>
      </section>

      <section className="container-page grid gap-12 pb-20 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <BildPlats label={BESPOKE_SHIRT.rubrik} className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={120}>
          {BESPOKE_SHIRT.text.map((t) => (
            <p key={t} className="mb-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              {t}
            </p>
          ))}
          <Link to="/appointment" className="btn-base btn-primary mt-4">
            {BESPOKE_SHIRT.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
