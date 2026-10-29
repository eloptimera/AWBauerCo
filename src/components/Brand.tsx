import type { CSSProperties } from "react";
import wordmarkUrl from "@/assets/brand/wordmark.svg";
import wordmark1863Url from "@/assets/brand/wordmark-1863.svg";
import tjaderUrl from "@/assets/brand/tjader.svg";
import sketchUrl from "@/assets/brand/tjader-sketch.svg";
import fylldUrl from "@/assets/brand/tjader-fylld.svg";

/*
 * AW's marks, vectorised from their own artwork. They are drawn as CSS masks so they
 * take the current text colour: ink on kraft, ivory on bottle green, brass where needed.
 */

function Mark({
  src,
  ratio,
  label,
  className = "",
  style,
}: {
  src: string;
  ratio: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`block bg-current ${className}`}
      style={{
        aspectRatio: ratio,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        ...style,
      }}
    />
  );
}

export function Wordmark(props: { className?: string; label?: string; style?: CSSProperties }) {
  return (
    <Mark
      src={wordmarkUrl}
      ratio={4710 / 474}
      label={props.label ?? "A.W. Bauer & Co."}
      {...props}
    />
  );
}

export function Wordmark1863(props: { className?: string; label?: string }) {
  return (
    <Mark
      src={wordmark1863Url}
      ratio={4722 / 1008}
      label={props.label ?? "A.W. Bauer & Co. 1863"}
      {...props}
    />
  );
}

export function Tjader(props: { className?: string; label?: string; style?: CSSProperties }) {
  return <Mark src={tjaderUrl} ratio={966 / 888} {...props} />;
}

export function TjaderSketch(props: { className?: string; style?: CSSProperties }) {
  return <Mark src={sketchUrl} ratio={1035 / 916} {...props} />;
}

/** The filled version of the sketch, drawn on the exact same frame so the two line up 1:1. */
export function TjaderFylld(props: { className?: string; style?: CSSProperties }) {
  return <Mark src={fylldUrl} ratio={1035 / 916} {...props} />;
}
