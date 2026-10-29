// Company details for A.W. Bauer & Co. — single source for header, footer, contact and schema.
export const FORETAG = {
  namn: "A.W. Bauer & Co.",
  juridisktNamn: "Bauer & Co Aktiebolag",
  sedan: 1863,
  gatuadress: "Brunnsgatan 4",
  postnummer: "111 38",
  ort: "Stockholm",
  land: "Sweden",
  adress: "Brunnsgatan 4, 111 38 Stockholm, Sweden",
  telefon: "+46 8 104780",
  telefonLank: "+468104780",
  epost: "contact@awbauerco.com",
  orgnr: "556307-4540",
  instagram: "https://www.instagram.com/a.w.bauer.co/",
  facebook: "https://www.facebook.com/awbauerco",
  // Regular hours from Google Business. Saturday is shown as closed there because of
  // All Saints' Day (31 Oct 2026) — confirm with AW whether Saturdays are normally open.
  oppettider: [
    { dag: "Monday – Friday", tid: "09–17" },
    { dag: "Saturday", tid: "Closed" },
    { dag: "Sunday", tid: "Closed" },
  ],
  karta:
    "https://www.google.com/maps/search/?api=1&query=A.W.+Bauer+%26+Co+Brunnsgatan+4+Stockholm",
} as const;

// Verbatim from awbauerco.com (spelling of "Stockholm" corrected).
export const TAGLINE = {
  rad1: "A.W.Bauer & Co is a modern bespoke-only service.",
  rad2: "Located at Brunnsgatan 4 in Stockholm, Sweden.",
  rad3: "We have outfitted men of distinction since 1863.",
} as const;
