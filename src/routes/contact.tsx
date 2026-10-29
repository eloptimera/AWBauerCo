import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heading } from "@/components/Paint";
import { Reveal } from "@/components/Reveal";
import { FORETAG, TAGLINE } from "@/lib/foretag";
import { skickaMeddelande } from "@/lib/skicka";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact – A.W. Bauer & Co., Brunnsgatan 4, Stockholm" },
      {
        name: "description",
        content: `${FORETAG.namn}, ${FORETAG.adress}. Phone ${FORETAG.telefon}, ${FORETAG.epost}.`,
      },
      { property: "og:title", content: "Contact – A.W. Bauer & Co." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    try {
      await skickaMeddelande({
        namn: String(fd.get("namn") ?? ""),
        epost: String(fd.get("epost") ?? ""),
        telefon: String(fd.get("telefon") ?? ""),
        meddelande: String(fd.get("meddelande") ?? ""),
      });
      setKlart(true);
    } catch {
      setFel(`Your message could not be sent. Please try again or call us at ${FORETAG.telefon}.`);
    } finally {
      setSkickar(false);
    }
  }

  return (
    <>
      <section className="container-page pt-16 pb-12 sm:pt-24">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <Heading as="h1" className="mt-6 max-w-2xl text-4xl leading-[1.12] sm:text-5xl">
            {TAGLINE.rad2}
          </Heading>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {TAGLINE.rad1} {TAGLINE.rad3}
          </p>
        </Reveal>
      </section>

      <section className="container-page grid gap-14 pb-20 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <dl className="space-y-6 text-sm">
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2">
                <a
                  href={`tel:${FORETAG.telefonLank}`}
                  className="font-display text-2xl hover:opacity-70"
                >
                  {FORETAG.telefon}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${FORETAG.epost}`} className="font-display text-2xl hover:opacity-70">
                  {FORETAG.epost}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Atelier</dt>
              <dd className="mt-2 text-muted-foreground">
                {FORETAG.namn}
                <br />
                {FORETAG.gatuadress}
                <br />
                {FORETAG.postnummer} {FORETAG.ort}
                <br />
                {FORETAG.land}
                <br />
                <a href={FORETAG.karta} target="_blank" rel="noreferrer" className="underline">
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Follow us</dt>
              <dd className="mt-2 flex gap-4 text-muted-foreground">
                <a href={FORETAG.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  Instagram
                </a>
                <a href={FORETAG.facebook} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  Facebook
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Company</dt>
              <dd className="mt-2 text-muted-foreground">
                {FORETAG.juridisktNamn} · Org.nr {FORETAG.orgnr}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          {klart ? (
            <div className="rounded-sm border border-line bg-card p-8">
              <h2 className="text-2xl">Thank you for your message</h2>
              <p className="mt-4 text-sm text-muted-foreground">We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 rounded-sm border border-line bg-card p-8">
              <h2 className="text-2xl">Send a message</h2>
              <div>
                <label htmlFor="k-namn" className="text-sm font-medium">
                  Name
                </label>
                <input id="k-namn" name="namn" required autoComplete="name" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="k-epost" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="k-epost"
                  name="epost"
                  type="email"
                  required
                  autoComplete="email"
                  className="field mt-2"
                />
              </div>
              <div>
                <label htmlFor="k-telefon" className="text-sm font-medium">
                  Phone (optional)
                </label>
                <input id="k-telefon" name="telefon" type="tel" autoComplete="tel" className="field mt-2" />
              </div>
              <div>
                <label htmlFor="k-meddelande" className="text-sm font-medium">
                  Message
                </label>
                <textarea id="k-meddelande" name="meddelande" rows={5} required className="field mt-2" />
              </div>
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1 accent-primary" />
                <span>
                  I agree that {FORETAG.namn} stores my details in order to respond to my message.
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
                  {skickar ? "Sending …" : "Send message"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </section>

      <section className="container-page pb-20">
        <Reveal>
          <iframe
            title="Map of the A.W. Bauer & Co. atelier at Brunnsgatan 4, Stockholm"
            src="https://www.google.com/maps?q=Brunnsgatan+4,+111+38+Stockholm&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full rounded-sm border border-line"
          />
        </Reveal>
      </section>
    </>
  );
}
