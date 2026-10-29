import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { Tjader, TjaderFylld, TjaderSketch, Wordmark } from "@/components/Brand";
import { Reveal } from "@/components/Reveal";
import { Prislista } from "@/components/Prislista";
import { useActiveStep, useScrollProgress } from "@/hooks/use-scroll-progress";
import { FORETAG, TAGLINE } from "@/lib/foretag";
import { ATELIER_AVSNITT, ATELIER_INTRO, BESPOKE_SHIRT, HEAD_CUTTER, PRISER } from "@/lib/innehall";

import fitting from "@/assets/photos/fitting.jpg";
import fittingSmall from "@/assets/photos/fitting-800.jpg";
import cutting from "@/assets/photos/cutting.jpg";
import pinstripe from "@/assets/photos/pinstripe.jpg";
import shears from "@/assets/photos/shears.jpg";
import bomber from "@/assets/photos/bomber.jpg";
import portrait from "@/assets/photos/portrait.jpg";
import workwear from "@/assets/photos/workwear.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.W. Bauer & Co. – Bespoke Tailoring in Stockholm since 1863" },
      { name: "description", content: `${TAGLINE.rad1} ${TAGLINE.rad2} ${TAGLINE.rad3}` },
      { property: "og:title", content: "A.W. Bauer & Co. – Bespoke Tailoring in Stockholm" },
      { property: "og:description", content: TAGLINE.rad3 },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: fitting,
        imageSrcSet: `${fittingSmall} 800w, ${fitting} 1254w`,
        imageSizes: "100vw",
      },
    ],
  }),
  component: Start,
});

const avsnitt = (id: string) => ATELIER_AVSNITT.find((a) => a.id === id)!;

const PROCESS = [
  {
    ...avsnitt("fitting"),
    bild: fitting,
    alt: "A client being measured across the back during a fitting",
  },
  {
    ...avsnitt("cutting"),
    bild: cutting,
    alt: "Hands cutting dark cloth with tailor's shears on the cutting table",
  },
  {
    ...avsnitt("tailoring"),
    bild: pinstripe,
    alt: "A finished chalk-stripe suit worn with a denim shirt and knitted tie",
  },
];

const ROMERSKA = ["I", "II", "III"];

function Start() {
  return (
    <>
      <Hero />
      <SinceSektion />
      <HeadCutter />
      <Process />
      <Saxen />
      <ShirtsOchKnitwear />
      <Priser />
      <Avslut />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, 0);

  return (
    <section ref={ref} className="relative h-[170vh] bg-green-deep" aria-label="Introduction">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <img
          src={fitting}
          srcSet={`${fittingSmall} 800w, ${fitting} 1254w`}
          sizes="100vw"
          alt="A client being measured for a bespoke coat"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_35%] will-change-transform"
          style={{ transform: "scale(calc(1.16 - 0.16 * var(--p, 0)))" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-green-deep"
          style={{ opacity: "calc(0.45 + 0.4 * var(--p, 0))" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(18_33_26/0.75)_100%)]"
        />

        <div
          className="relative px-5 text-center text-ivory"
          style={{
            opacity: "calc(1 - var(--p, 0) * 1.8)",
            transform: "translateY(calc(var(--p, 0) * -6vh))",
          }}
        >
          <h1>
            <Wordmark className="mx-auto w-[min(84vw,46rem)]" label="A.W. Bauer & Co." />
          </h1>
          <p className="voice mx-auto mt-8 max-w-xl text-xl text-ivory/85 sm:text-2xl">
            {TAGLINE.rad3}
          </p>
        </div>

        <p
          aria-hidden="true"
          className="label absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-ivory/60"
          style={{ opacity: "calc(1 - var(--p, 0) * 4)" }}
        >
          Brunnsgatan 4, Stockholm
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------- Since 1863: the drawing becomes the emblem */

function SinceSektion() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, 1);

  return (
    <section ref={ref} className="paper relative h-[200vh]" aria-labelledby="since-rubrik">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="container-page grid items-center gap-6 pt-20 md:grid-cols-[5fr_6fr] md:gap-20 md:pt-16">
          <div className="relative mx-auto w-[min(44vw,22rem)] text-ink md:w-[min(62vw,22rem)]">
            <TjaderSketch
              className="w-full text-ink/70"
              style={{ opacity: "calc(1 - var(--p, 0) * 1.2)" }}
            />
            <TjaderFylld
              className="absolute inset-0 w-full text-green"
              style={{ clipPath: "inset(max(0%, calc(100% - var(--p, 0) * 140%)) 0 0 0)" }}
            />
          </div>

          <div style={{ opacity: "calc(0.25 + var(--p, 0) * 1.5)" }}>
            <p className="font-display text-[clamp(3.25rem,11vw,8.5rem)] leading-none font-light text-brass">
              {FORETAG.sedan}
            </p>
            <h2 id="since-rubrik" className="mt-3 text-2xl sm:mt-6 sm:text-4xl">
              {TAGLINE.rad1}
            </h2>
            <p className="measure mt-4 text-base text-ink-soft sm:mt-6 sm:text-[1.1875rem]">
              {ATELIER_INTRO.text[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Head cutter */

function HeadCutter() {
  return (
    <section className="study py-28 sm:py-40" aria-labelledby="head-cutter-rubrik">
      <div className="container-page grid items-center gap-14 md:grid-cols-2 md:gap-24">
        <Reveal>
          <figure className="mx-auto max-w-md border border-brass/40 p-3">
            <img
              src={portrait}
              alt="Portrait of a tailor in a pinstripe suit, adjusting his glasses"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale"
            />
          </figure>
        </Reveal>
        <div>
          <p className="label text-brass">{HEAD_CUTTER.titel}</p>
          <h2 id="head-cutter-rubrik" className="mt-6 text-4xl sm:text-5xl">
            {HEAD_CUTTER.namn}
          </h2>
          <p className="measure mt-8 text-xl text-ivory/85">{HEAD_CUTTER.text[0]}</p>
          <p className="voice measure mt-6 text-xl text-ivory/70">{HEAD_CUTTER.text[1]}</p>
          <Link to="/appointment" className="btn-base btn-outline mt-12 text-ivory">
            {BESPOKE_SHIRT.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- The process, told while scrolling */

function Process() {
  const [aktiv, setAktiv] = useState(0);
  const steg = useRef<(HTMLElement | null)[]>([]);
  const onChange = useCallback((i: number) => i >= 0 && setAktiv(i), []);
  useActiveStep(steg, onChange);

  return (
    <section className="paper py-24 sm:py-32" aria-labelledby="process-rubrik">
      <div className="container-page">
        <h2 id="process-rubrik" className="max-w-2xl text-3xl sm:text-4xl">
          {ATELIER_INTRO.text[0]}
        </h2>
        <div className="plate-rule mt-10 max-w-xs" />

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Pinned photograph (desktop) */}
          <div className="relative hidden md:block">
            <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden bg-green-deep">
              {PROCESS.map((p, i) => (
                <img
                  key={p.id}
                  src={p.bild}
                  alt={i === aktiv ? p.alt : ""}
                  aria-hidden={i !== aktiv}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out"
                  style={{
                    opacity: i === aktiv ? 1 : 0,
                    transform: i === aktiv ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}
            </div>
          </div>

          <ol>
            {PROCESS.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => {
                  steg.current[i] = el;
                }}
                className="flex min-h-[70vh] flex-col justify-center py-10 first:pt-0 md:min-h-[85vh]"
              >
                <img
                  src={p.bild}
                  alt={p.alt}
                  loading="lazy"
                  className="mb-10 aspect-[4/5] w-full object-cover md:hidden"
                />
                <p
                  className={`font-display text-xl tracking-[0.3em] transition-colors duration-700 ${
                    i === aktiv ? "text-brass" : "text-ink-soft/60"
                  }`}
                >
                  {ROMERSKA[i]}
                </p>
                <h3 className="mt-4 text-4xl sm:text-5xl">{p.rubrik}</h3>
                {p.text.map((t) => (
                  <p key={t} className="measure mt-6 text-ink-soft">
                    {t}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- A pause: the shears, held back */

function Saxen() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, 1);

  return (
    <section ref={ref} className="relative h-[160vh] bg-green-deep" aria-label="The atelier">
      <div className="sticky top-0 flex h-svh items-end overflow-hidden">
        <img
          src={shears}
          alt="A tailor seen from behind, holding large shears behind his back"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[50%_88%] will-change-transform"
          style={{ transform: "scale(calc(1.12 - 0.12 * var(--p, 0)))" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-green-deep/85 via-green-deep/10 to-transparent"
        />
        <p
          className="voice relative container-page pb-16 text-3xl text-ivory sm:pb-24 sm:text-5xl md:text-right"
          style={{
            opacity: "calc(var(--p, 0) * 2.2 - 0.3)",
            transform: "translateY(calc((1 - var(--p, 0)) * 3vh))",
          }}
        >
          Unflaggingly adapted to your vision.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Shirts & knitwear */

function ShirtsOchKnitwear() {
  const shirts = avsnitt("shirts");
  const knitwear = avsnitt("knitwear");
  return (
    <section className="bg-ivory py-24 sm:py-32" aria-label="Shirts and knitwear">
      <div className="container-page grid gap-16 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <img
            src={workwear}
            alt="A white bespoke shirt cuff beneath a blue workwear jacket, a tennis ball in the pocket"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>

        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <h2 className="text-4xl sm:text-5xl">{shirts.rubrik}</h2>
          <p className="voice measure mt-6 text-xl">{shirts.text[0]}</p>
          <p className="measure mt-5 text-ink-soft">{shirts.text[2]}</p>
          <Link to="/bespoke-shirt" className="btn-base btn-outline mt-10">
            {BESPOKE_SHIRT.rubrik}
          </Link>

          <div className="mt-20 border-t border-line pt-12">
            <h2 className="text-3xl sm:text-4xl">{knitwear.rubrik}</h2>
            <p className="measure mt-6 text-ink-soft">{knitwear.text[1]}</p>
            <Link
              to="/atelier"
              hash="knitwear"
              className="voice mt-6 inline-block underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Read more in the atelier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Pricing */

function Priser() {
  return (
    <section className="bg-mahogany py-24 text-ivory sm:py-32" aria-labelledby="priser-rubrik">
      <div className="container-page grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 id="priser-rubrik" className="text-4xl sm:text-5xl">
            {PRISER.rubrik}
          </h2>
          <p className="voice mt-8 text-lg text-ivory/75">{PRISER.text}</p>
          <Reveal className="mt-12 hidden md:block">
            <img
              src={bomber}
              alt="A camel bespoke jacket on a tailor's dummy, seen from the back"
              loading="lazy"
              className="aspect-[2/3] w-full object-cover"
            />
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Prislista />
          <Link to="/appointment" className="btn-base mt-12 bg-ivory text-ink hover:bg-kraft">
            {BESPOKE_SHIRT.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Closing */

function Avslut() {
  return (
    <section className="paper py-28 sm:py-40" aria-labelledby="avslut-rubrik">
      <div className="container-page flex flex-col items-center text-center">
        <Tjader className="w-20 text-green" />
        <h2 id="avslut-rubrik" className="mt-10 max-w-2xl text-3xl sm:text-4xl">
          {TAGLINE.rad2}
        </h2>
        <p className="voice mt-6 text-lg text-ink-soft">
          {FORETAG.oppettider.map((o) => `${o.dag} ${o.tid}`).join(", ")}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/appointment" className="btn-base btn-primary">
            {BESPOKE_SHIRT.cta}
          </Link>
          <a href={`tel:${FORETAG.telefonLank}`} className="btn-base btn-outline">
            {FORETAG.telefon}
          </a>
        </div>
      </div>
    </section>
  );
}
