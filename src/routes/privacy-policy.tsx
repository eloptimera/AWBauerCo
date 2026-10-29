import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heading } from "@/components/Paint";
import { FORETAG } from "@/lib/foretag";

// NOTE: Draft policy written for the new site, not taken from awbauerco.com.
// Have A.W. Bauer & Co. review it before launch.

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy – A.W. Bauer & Co." },
      {
        name: "description",
        content: "How A.W. Bauer & Co. handles the personal data you share through this website.",
      },
      { property: "og:title", content: "Privacy Policy – A.W. Bauer & Co." },
      { property: "og:url", content: "/privacy-policy" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function Sektion({ titel, children }: { titel: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl text-primary">{titel}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <article className="container-page max-w-3xl pt-16 pb-8 sm:pt-24">
      <p className="eyebrow">Privacy Policy</p>
      <Heading as="h1" className="mt-6 text-4xl leading-[1.12] sm:text-5xl">
        How we handle your personal data
      </Heading>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        This page describes what personal data we collect through this website, why we collect it,
        and the rights you have under the General Data Protection Regulation (GDPR).
      </p>

      <Sektion titel="Data controller">
        <p>
          {FORETAG.juridisktNamn} ({FORETAG.namn}), org.nr {FORETAG.orgnr}, {FORETAG.adress}, is
          the controller of your personal data. You can reach us at{" "}
          <a className="underline" href={`mailto:${FORETAG.epost}`}>
            {FORETAG.epost}
          </a>{" "}
          or {FORETAG.telefon}.
        </p>
      </Sektion>

      <Sektion titel="What we collect">
        <p>We only collect what you enter in our forms:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className="font-medium text-foreground">Consultation requests:</strong> name,
            phone number, email, the garments you are interested in, a preferred date and your
            message.
          </li>
          <li>
            <strong className="font-medium text-foreground">Contact form:</strong> name, email,
            phone number and your message.
          </li>
        </ul>
        <p>If you call or email us directly, we handle the details you share in the same way.</p>
      </Sektion>

      <Sektion titel="Why we process it">
        <p>
          We use your details to answer your enquiry and to book and prepare your consultation and
          fittings. The legal basis is that processing is necessary to take steps at your request
          before entering into a contract, and thereafter to perform the contract. If you become a
          client, we also keep records we are required to retain under Swedish accounting law.
        </p>
        <p>We do not sell your data and do not send newsletters unless you have asked for them.</p>
      </Sektion>

      <Sektion titel="How long we keep it">
        <p>
          We keep an enquiry for as long as it is relevant. If it does not lead to an order, we
          delete it when we no longer have reason to keep it. Data that forms part of our
          accounting records is kept for the period required by law.
        </p>
      </Sektion>

      <Sektion titel="Who has access">
        <p>
          Form submissions are stored in a database service we use to run the website (Supabase),
          which processes the data on our behalf. The website is hosted by a provider that can see
          technical traffic data such as IP addresses. Beyond this, we only disclose data where
          required by law.
        </p>
      </Sektion>

      <Sektion titel="Cookies and embedded content">
        <p>
          This website does not use cookies for tracking, analytics or marketing. The contact page
          shows an embedded Google Map; Google may set cookies or collect technical data when the
          map loads, in line with Google's own privacy policy.
        </p>
      </Sektion>

      <Sektion titel="Your rights">
        <p>You have the right to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>know what data we hold about you and receive a copy,</li>
          <li>have inaccurate data corrected,</li>
          <li>request erasure or restriction of processing,</li>
          <li>object to processing based on legitimate interest.</li>
        </ul>
        <p>
          Contact us and we will help you. You also have the right to lodge a complaint with the{" "}
          <a
            className="underline"
            href="https://www.imy.se/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swedish Authority for Privacy Protection (IMY)
          </a>
          .
        </p>
      </Sektion>

      <p className="mt-14 text-sm text-muted-foreground">
        Questions?{" "}
        <Link to="/contact" className="underline">
          Contact us
        </Link>
        .
      </p>
    </article>
  );
}
