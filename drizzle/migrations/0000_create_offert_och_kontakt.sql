CREATE TABLE public.offertforfragningar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  namn text NOT NULL,
  telefon text NOT NULL,
  epost text NOT NULL,
  adress text NOT NULL,
  uppdragstyper text[] NOT NULL DEFAULT '{}',
  yta_kvm integer,
  onskat_startdatum date,
  meddelande text,
  bild_urls text[] NOT NULL DEFAULT '{}',
  gdpr_samtycke boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.offertforfragningar TO anon, authenticated;
GRANT ALL ON public.offertforfragningar TO service_role;

ALTER TABLE public.offertforfragningar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vem som helst kan skicka offertforfragan"
ON public.offertforfragningar FOR INSERT TO anon, authenticated
WITH CHECK (gdpr_samtycke = true);

CREATE TABLE public.kontaktmeddelanden (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  namn text NOT NULL,
  epost text NOT NULL,
  telefon text,
  meddelande text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.kontaktmeddelanden TO anon, authenticated;
GRANT ALL ON public.kontaktmeddelanden TO service_role;

ALTER TABLE public.kontaktmeddelanden ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vem som helst kan skicka meddelande"
ON public.kontaktmeddelanden FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Offertbilder kan laddas upp av alla"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'offertbilder');