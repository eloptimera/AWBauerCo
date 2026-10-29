import { createFileRoute, Link } from "@tanstack/react-router";
import { Tjader } from "@/components/Brand";
import { Prislista } from "@/components/Prislista";
import { Reveal } from "@/components/Reveal";
import { ATELIER_AVSNITT, ATELIER_INTRO, BESPOKE_SHIRT, PRISER } from "@/lib/innehall";

import fitting from "@/assets/photos/fitting.jpg";
import cutter from "@/assets/photos/cutter.jpg";
import suit from "@/assets/photos/suit.jpg";
import workwear from "@/assets/photos/workwear.jpg";

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

const BILDER: Record<string, { src: string; alt: string } | undefined> = {
  fitting: { src: fitting, alt: "A client being measured across the back during a fitting" },
  cutting: { src: cutter, alt: "A cutter at his bench with shears and tape measure" },
  tailoring: { src: suit, alt: "A finished grey suit worn in the workroom" },
  shirts: {
    src: workwear,
    alt: "A white bespoke shirt cuff beneath a blue workwear jacket, a tennis ball in the pocket",
  },
};

// Fitting, cutting and tailoring are the order a garment is made in; shirts and knitwear are not steps.
const STEG: Record<string, string> = { fitting: "I", cutting: "II", tailoring: "III" };

function Atelier() {
  return (
    <>
      <section className="study pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label text-brass">{ATELIER_INTRO.rubrik}</p>
            <h1 className="mt-8 text-4xl sm:text-6xl">{ATELIER_INTRO.text[0]}</h1>
            <p className="voice measure mt-10 text-xl text-ivory/80">{ATELIER_INTRO.text[1]}</p>
          </div>
          <Tjader className="hidden w-28 justify-self-end self-end text-brass/70 md:col-span-3 md:col-start-10 md:block" />
        </div>

        <nav aria-label="Atelier sections" className="container-page mt-20">
          <ul className="flex flex-wrap gap-x-10 gap-y-4 border-t border-ivory/15 pt-8">
            {[...ATELIER_AVSNITT, { id: "pricing", rubrik: PRISER.rubrik }].map((a) => (
              <li key={a.id}>
                <Link
                  to="/atelier"
                  hash={a.id}
                  className="label text-ivory/70 transition-colors duration-500 hover:text-ivory"
                >
                  {a.rubrik}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {ATELIER_AVSNITT.map((a, i) => {
        const bild = BILDER[a.id];
        const spegel = i % 2 === 1;
        return (
          <section
            key={a.id}
            id={a.id}
            aria-labelledby={`${a.id}-rubrik`}
            className={`scroll-mt-20 py-24 sm:py-32 ${i % 2 === 0 ? "paper" : "bg-ivory"}`}
          >
            <div className="container-page grid items-center gap-14 md:grid-cols-12 md:gap-10">
              {bild && (
                <Reveal className={`md:col-span-5 ${spegel ? "md:order-2 md:col-start-8" : ""}`}>
                  <img
                    src={bild.src}
                    alt={bild.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Reveal>
              )}
              <div
                className={
                  bild
                    ? `md:col-span-6 ${spegel ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`
                    : "md:col-span-8 md:col-start-3"
                }
              >
                {STEG[a.id] && (
                  <p className="font-display text-xl tracking-[0.3em] text-brass">{STEG[a.id]}</p>
                )}
                <h2 id={`${a.id}-rubrik`} className="mt-4 text-4xl sm:text-5xl">
                  {a.rubrik}
                </h2>
                {a.text.map((t, j) => (
                  <p
                    key={t}
                    className={`measure mt-6 ${j === 0 && a.text.length > 1 ? "voice text-xl" : "text-ink-soft"}`}
                  >
                    {t}
                  </p>
                ))}
                {a.id === "shirts" && (
                  <Link to="/bespoke-shirt" className="btn-base btn-outline mt-10">
                    {BESPOKE_SHIRT.rubrik}
                  </Link>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section
        id="pricing"
        aria-labelledby="pricing-rubrik"
        className="scroll-mt-20 bg-mahogany py-24 text-ivory sm:py-32"
      >
        <div className="container-page grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="pricing-rubrik" className="text-4xl sm:text-5xl">
              {PRISER.rubrik}
            </h2>
            <p className="voice mt-8 text-lg text-ivory/75">{PRISER.text}</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Prislista />
            <Link to="/appointment" className="btn-base mt-12 bg-ivory text-ink hover:bg-kraft">
              {BESPOKE_SHIRT.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
