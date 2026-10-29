import { Link } from "@tanstack/react-router";
import { FORETAG, TAGLINE } from "@/lib/foretag";
import { Tjader, Wordmark1863 } from "@/components/Brand";

export function Footer() {
  return (
    <footer className="study">
      <div className="container-page pt-24 pb-10">
        <div className="flex flex-col items-center text-center">
          <Tjader className="w-20 text-brass" />
          <Wordmark1863 className="mt-8 w-64 sm:w-80" />
          <p className="voice mt-8 max-w-md text-lg text-ivory/75">{TAGLINE.rad3}</p>
        </div>

        <div className="mt-20 grid gap-12 border-t border-ivory/15 pt-12 text-[1.02rem] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="label text-brass">Atelier</h2>
            <p className="mt-4 text-ivory/80">
              {FORETAG.gatuadress}
              <br />
              {FORETAG.postnummer} {FORETAG.ort}
              <br />
              {FORETAG.land}
            </p>
            <a
              href={FORETAG.karta}
              target="_blank"
              rel="noreferrer"
              className="voice mt-3 inline-block text-ivory/60 underline decoration-ivory/30 underline-offset-4 hover:text-ivory"
            >
              Get directions
            </a>
          </div>

          <div>
            <h2 className="label text-brass">Hours</h2>
            <dl className="mt-4 space-y-1 text-ivory/80">
              {FORETAG.oppettider.map((o) => (
                <div key={o.dag} className="flex gap-3">
                  <dt>{o.dag}</dt>
                  <dd className="text-ivory/60">{o.tid}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="label text-brass">Contact</h2>
            <ul className="mt-4 space-y-1 text-ivory/80">
              <li>
                <a href={`tel:${FORETAG.telefonLank}`} className="hover:text-ivory">
                  {FORETAG.telefon}
                </a>
              </li>
              <li>
                <a href={`mailto:${FORETAG.epost}`} className="hover:text-ivory">
                  {FORETAG.epost}
                </a>
              </li>
              <li className="flex gap-5 pt-3">
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
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="label text-brass">The house</h2>
            <ul className="mt-4 space-y-1 text-ivory/80">
              <li>
                <Link to="/atelier" className="hover:text-ivory">
                  Atelier
                </Link>
              </li>
              <li>
                <Link to="/atelier" hash="pricing" className="hover:text-ivory">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/bespoke-shirt" className="hover:text-ivory">
                  Bespoke Shirt
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-ivory">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ivory">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-ivory/15 pt-8 text-sm text-ivory/50">
          <span>
            © {new Date().getFullYear()} {FORETAG.juridisktNamn}, org.nr {FORETAG.orgnr}
          </span>
          <Link to="/privacy-policy" className="hover:text-ivory">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
