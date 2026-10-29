import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tjader } from "@/components/Brand";
import { FORETAG, TAGLINE } from "@/lib/foretag";
import { skickaMeddelande } from "@/lib/skicka";
import { FormFalt } from "@/components/FormFalt";

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
        namn: `${fd.get("namn") ?? ""} ${fd.get("efternamn") ?? ""}`.trim(),
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
      <section className="study pt-40 pb-24 sm:pt-48">
        <div className="container-page">
          <p className="label text-brass">Contact</p>
          <h1 className="mt-8 max-w-3xl text-4xl sm:text-6xl">{TAGLINE.rad2}</h1>
          <p className="voice measure mt-8 text-xl text-ivory/80">
            {TAGLINE.rad1} {TAGLINE.rad3}
          </p>

          <dl className="mt-20 grid gap-12 border-t border-ivory/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label text-brass">Telephone</dt>
              <dd className="mt-4">
                <a
                  href={`tel:${FORETAG.telefonLank}`}
                  className="font-display text-2xl font-light hover:text-brass"
                >
                  {FORETAG.telefon}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-brass">Mail</dt>
              <dd className="mt-4">
                <a
                  href={`mailto:${FORETAG.epost}`}
                  className="font-display text-xl font-light break-all hover:text-brass"
                >
                  {FORETAG.epost}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-brass">Atelier</dt>
              <dd className="mt-4 text-ivory/80">
                {FORETAG.gatuadress}
                <br />
                {FORETAG.postnummer} {FORETAG.ort}, {FORETAG.land}
                <br />
                <a
                  href={FORETAG.karta}
                  target="_blank"
                  rel="noreferrer"
                  className="voice mt-2 inline-block text-ivory/60 underline decoration-ivory/30 underline-offset-4 hover:text-ivory"
                >
                  Get directions
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-brass">Hours</dt>
              <dd className="mt-4 text-ivory/80">
                {FORETAG.oppettider.map((o) => (
                  <span key={o.dag} className="block">
                    {o.dag} {o.tid}
                  </span>
                ))}
                <span className="mt-4 flex gap-5">
                  <a
                    href={FORETAG.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ivory"
                  >
                    Instagram
                  </a>
                  <a
                    href={FORETAG.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ivory"
                  >
                    Facebook
                  </a>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="paper py-20 sm:py-28">
        <div className="container-page">
          {klart ? (
            <div className="mx-auto max-w-xl text-center">
              <Tjader className="mx-auto w-14 text-green" />
              <h2 className="mt-10 text-3xl">Thank you for your message</h2>
              <p className="voice mt-4 text-xl text-ink-soft">We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto grid max-w-3xl gap-8">
              <h2 className="text-center text-3xl sm:text-4xl">What can we do for you?</h2>
              <FormFalt />
              <label className="flex items-start gap-3 text-base text-ink-soft">
                <input type="checkbox" required className="mt-1.5 accent-green" />
                <span>
                  I agree that {FORETAG.namn} stores my details in order to respond to my message.
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
          )}
        </div>
      </section>

      <section aria-label="Map" className="bg-green-deep">
        <iframe
          title="Map of the A.W. Bauer & Co. atelier at Brunnsgatan 4, Stockholm"
          src="https://www.google.com/maps?q=Brunnsgatan+4,+111+38+Stockholm&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full grayscale-[0.85] sepia-[0.25]"
        />
      </section>
    </>
  );
}
