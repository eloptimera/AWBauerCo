import { Reveal } from "@/components/Reveal";
import { PRISER } from "@/lib/innehall";

/** The price list, set like a tailor's note with dotted leaders. */
export function Prislista({ ton = "mork" }: { ton?: "mork" | "ljus" }) {
  const mork = ton === "mork";
  return (
    <dl className={`border-t ${mork ? "border-ivory/20" : "border-line"}`}>
      {PRISER.lista.map((p, i) => (
        <Reveal key={p.plagg} delay={i * 90}>
          <div
            className={`flex items-baseline gap-4 border-b py-5 ${mork ? "border-ivory/20" : "border-line"}`}
          >
            <dt className="font-display text-sm tracking-[0.22em] uppercase">{p.plagg}</dt>
            <span
              aria-hidden="true"
              className={`flex-1 translate-y-[-0.3em] border-b border-dotted ${
                mork ? "border-ivory/30" : "border-ink/30"
              }`}
            />
            <dd className="font-display text-lg font-light tabular-nums">{p.pris}</dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
