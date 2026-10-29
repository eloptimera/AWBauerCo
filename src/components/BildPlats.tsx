// Temporary image slot. The project has no A.W. Bauer photography yet; replace each
// <BildPlats> with a real <img> once photos are delivered.
export function BildPlats({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-sm border border-dashed border-line bg-sand/40 text-center text-xs tracking-[0.18em] text-muted-foreground uppercase ${className}`}
    >
      <span className="px-6">Image · {label}</span>
    </div>
  );
}
