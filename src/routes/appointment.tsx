import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tjader } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";
import { BESPOKE_SHIRT, HEAD_CUTTER, PRISER } from "@/lib/innehall";
import { skickaMeddelande } from "@/lib/skicka";
import { FormFalt } from "@/components/FormFalt";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book a Consultation – A.W. Bauer & Co." },
      {
        name: "description",
        content: `Book a consultation at the A.W. Bauer & Co. atelier, ${FORETAG.adress}.`,
      },
      { property: "og:title", content: "Book a Consultation – A.W. Bauer & Co." },
      { property: "og:url", content: "/appointment" },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: Appointment,
});

function Appointment() {
  const [plagg, setPlagg] = useState<string[]>([]);
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  const vaxla = (p: string) =>
    setPlagg((v) => (v.includes(p) ? v.filter((x) => x !== p) : [...v, p]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    const datum = String(fd.get("datum") ?? "");
    const meddelande = [
      "[Consultation request]",
      plagg.length ? `Garments: ${plagg.join(", ")}` : null,
      datum ? `Preferred date: ${datum}` : null,
      String(fd.get("meddelande") ?? ""),
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await skickaMeddelande({
        namn: `${fd.get("namn") ?? ""} ${fd.get("efternamn") ?? ""}`.trim(),
        epost: String(fd.get("epost") ?? ""),
        telefon: String(fd.get("telefon") ?? ""),
        meddelande,
      });
      setKlart(true);
    } catch {
      setFel(`Your request could not be sent. Please try again or call us at ${FORETAG.telefon}.`);
    } finally {
      setSkickar(false);
    }
  }

  if (klart) {
    return (
      <section className="paper flex min-h-[80vh] items-center pt-32 pb-24">
        <div className="container-page flex flex-col items-center text-center">
          <Tjader className="w-20 text-green" />
          <h1 className="mt-10 text-4xl">Thank you</h1>
          <p className="voice measure mt-6 text-xl text-ink-soft">
            Your request has been received. We will be in touch to confirm your appointment. You are
            also welcome to call us at {FORETAG.telefon}.
          </p>
          <Link to="/" className="btn-base btn-outline mt-12">
            Back to the house
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="study pt-40 pb-20 sm:pt-48">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="text-4xl sm:text-6xl">{BESPOKE_SHIRT.cta}</h1>
            <p className="voice measure mt-8 text-xl text-ivory/80">{HEAD_CUTTER.text[1]}</p>
          </div>
          <dl className="space-y-6 md:col-span-4 md:col-start-9 md:self-end">
            <div>
              <dt className="label text-brass">Atelier</dt>
              <dd className="mt-2 text-ivory/80">{FORETAG.adress}</dd>
            </div>
            <div>
              <dt className="label text-brass">Hours</dt>
              <dd className="mt-2 text-ivory/80">
                {FORETAG.oppettider.map((o) => (
                  <span key={o.dag} className="block">
                    {o.dag} {o.tid}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="paper py-20 sm:py-28">
        <div className="container-page">
          <form onSubmit={onSubmit} className="mx-auto grid max-w-3xl gap-8">
            <h2 className="text-center text-3xl sm:text-4xl">What can we do for you?</h2>
            <FormFalt meddelandeKravs={false} />

            <fieldset>
              <legend className="label text-ink-soft">What are you interested in?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {PRISER.lista.map(({ plagg: p }) => (
                  <label
                    key={p}
                    className={`cursor-pointer border px-4 py-2.5 font-display text-xs tracking-[0.2em] uppercase transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-brass ${
                      plagg.includes(p)
                        ? "border-green bg-green text-ivory"
                        : "border-ink/30 hover:border-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={plagg.includes(p)}
                      onChange={() => vaxla(p)}
                    />
                    {p}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="sm:max-w-xs">
              <label htmlFor="datum" className="label text-ink-soft">
                Preferred date (optional)
              </label>
              <input id="datum" name="datum" type="date" className="field mt-3" />
            </div>

            <label className="flex items-start gap-3 text-base text-ink-soft">
              <input type="checkbox" required className="mt-1.5 accent-green" />
              <span>
                I agree that {FORETAG.namn} stores my details in order to respond to my request.
                Read more in our{" "}
                <Link to="/privacy-policy" className="underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </span>
            </label>

            {fel && (
              <p role="alert" className="text-destructive">
                {fel}
              </p>
            )}

            <div className="text-center">
              <button type="submit" disabled={skickar} className="btn-base btn-primary min-w-56">
                {skickar ? "Sending …" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
