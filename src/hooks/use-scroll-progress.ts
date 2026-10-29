import { useEffect, type RefObject } from "react";

/**
 * Writes how far a tall section has been scrolled through as a CSS custom property
 * (`--p`, 0 → 1) on the element itself. Animations read it in CSS, so scrolling never
 * re-renders React. With reduced motion the value is pinned to `reducedValue`.
 *
 * Progress runs from the moment the section's top reaches the top of the viewport
 * until its bottom reaches the bottom of the viewport (i.e. while its sticky child is pinned).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, reducedValue = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches) {
        el.style.setProperty("--p", String(reducedValue));
        return;
      }
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : rect.top <= 0 ? 1 : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", update);
    };
  }, [ref, reducedValue]);
}

/** Index of the step currently in the middle of the viewport, for scroll-told sequences. */
export function useActiveStep(
  refs: RefObject<(HTMLElement | null)[]>,
  onChange: (i: number) => void,
) {
  useEffect(() => {
    const els = (refs.current ?? []).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onChange(els.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [refs, onChange]);
}
