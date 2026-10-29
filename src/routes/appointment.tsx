import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";
import { BESPOKE_SHIRT, HEAD_CUTTER, PRISER } from "@/lib/innehall";
import { skickaMeddelande } from "@/lib/skicka";

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
        namn: String(fd.get("namn") ?? ""),
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
      <section className="container-page py-28">
        <div className="mx-auto max-w-xl rounded-sm border border-line bg-card p-10 text-center">
          <p className="eyebrow">Thank you</p>
          <h1 className="mt-5 text-3xl">Your request has been received</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We will be in touch to confirm your appointment. You are also welcome to call us at{" "}
            {FORETAG.telefon}.
          </p>
          <Link to="/" className="btn-base btn-outline mt-8">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="container-page pt-16 pb-12 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Appointment</p>
          <Heading as="h1" className="mt-6 max-w-2xl text-4xl leading-[1.12] sm:text-5xl">
            {BESPOKE_SHIRT.cta}
          </Heading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {HEAD_CUTTER.text[1]}
          </p>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="grid max-w-3xl gap-6 rounded-sm border border-line bg-card p-8 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="namn" className="text-sm font-medium">
                  Name
                </label>
                <input id="namn" name="namn" required autoComplete="name" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="telefon" className="text-sm font-medium">
                  Phone
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="epost" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="epost"
                  name="epost"
                  type="email"
                  required
                  autoComplete="email"
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="datum" className="text-sm font-medium">
                  Preferred date (optional)
                </label>
                <input id="datum" name="datum" type="date" className="field mt-2" />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-medium">What are you interested in?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRISER.lista.map(({ plagg: p }) => (
                  <label
                    key={p}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${
                      plagg.includes(p)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-line hover:bg-sand"
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

            <div>
              <label htmlFor="meddelande" className="text-sm font-medium">
                Message (optional)
              </label>
              <textarea id="meddelande" name="meddelande" rows={5} className="field mt-2" />
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input type="checkbox" required className="mt-1 accent-primary" />
              <span>
                I agree that {FORETAG.namn} stores my details in order to respond to my request.
                Read more in our{" "}
                <Link to="/privacy-policy" className="underline">
                  privacy policy
                </Link>
                .
              </span>
            </label>

            {fel && <p className="text-sm text-destructive">{fel}</p>}

            <div>
              <button type="submit" disabled={skickar} className="btn-base btn-primary">
                {skickar ? "Sending …" : "Send request"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
