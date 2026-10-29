import { Link } from "@tanstack/react-router";
import { FORETAG, TAGLINE } from "@/lib/foretag";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-tint">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg">{FORETAG.namn}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {TAGLINE.rad1}
            <br />
            {TAGLINE.rad2}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{TAGLINE.rad3}</p>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              {FORETAG.gatuadress}
              <br />
              {FORETAG.postnummer} {FORETAG.ort}, {FORETAG.land}
            </li>
            <li>
              <a href={`tel:${FORETAG.telefonLank}`} className="hover:text-foreground">
                {FORETAG.telefon}
              </a>
            </li>
            <li>
              <a href={`mailto:${FORETAG.epost}`} className="hover:text-foreground">
                {FORETAG.epost}
              </a>
            </li>
            <li className="pt-2">
              {FORETAG.oppettider.map((o) => (
                <span key={o.dag} className="block">
                  {o.dag}: {o.tid}
                </span>
              ))}
            </li>
            <li className="flex gap-4 pt-2">
              <a href={FORETAG.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Instagram
              </a>
              <a href={FORETAG.facebook} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Pages</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/atelier" className="hover:text-foreground">
                Atelier
              </Link>
            </li>
            <li>
              <Link to="/atelier" hash="pricing" className="hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/bespoke-shirt" className="hover:text-foreground">
                Bespoke Shirt
              </Link>
            </li>
            <li>
              <Link to="/appointment" className="hover:text-foreground">
                Book a Consultation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-wrap justify-between gap-2 py-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {FORETAG.juridisktNamn}
          </span>
          <span>Org.nr {FORETAG.orgnr}</span>
        </div>
      </div>
    </footer>
  );
}
