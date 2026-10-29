import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { BESPOKE_SHIRT } from "@/lib/innehall";
import workwear from "@/assets/photos/workwear.jpg";

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
  const [inledning, ...resten] = BESPOKE_SHIRT.text;
  return (
    <>
      <section className="bg-ivory pt-40 pb-20 sm:pt-48">
        <div className="container-page">
          <p className="label text-ink-soft">{BESPOKE_SHIRT.rubrik}</p>
          <h1 className="mt-8 max-w-4xl text-4xl sm:text-6xl">{BESPOKE_SHIRT.underrubrik}</h1>
          <div className="plate-rule mt-12 max-w-xs" />
        </div>
      </section>

      <section className="bg-ivory pb-28 sm:pb-36">
        <div className="container-page grid gap-14 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <img
              src={workwear}
              alt="A white bespoke shirt cuff beneath a blue workwear jacket"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover md:sticky md:top-28"
            />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <p className="voice measure text-2xl leading-snug">{inledning}</p>
            {resten.map((t) => (
              <p key={t} className="measure mt-8 text-ink-soft">
                {t}
              </p>
            ))}
            <Link to="/appointment" className="btn-base btn-primary mt-14">
              {BESPOKE_SHIRT.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
