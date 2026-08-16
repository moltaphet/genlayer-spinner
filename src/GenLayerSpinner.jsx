import React from "react";

const PATHS = [
  "M182.5 33L19 372.5L178.5 310L121 280L182.5 151.5Z",
  "M217.5 33L217.5 151.5L279 280L221.5 310L381 372.5Z",
  "M200 195L165.5 265.5L200 283L234.5 265.5Z",
];

const WAVE =
  "M-600 0q50 -18 100 0" + "t100 0".repeat(13) + "L800 640L-600 640Z";

let uid = 0;

/**
 * GenLayer loading spinner.
 *
 * Colour is inherited from the surrounding text (currentColor), so the same
 * component works on light and dark backgrounds with no variant.
 *
 * @param {number} size    rendered size in px
 * @param {boolean} orbits show the two orbital rings (turn off below ~40px)
 * @param {number} progress 0–1 for determinate mode; omit for an endless loop
 * @param {string} label   accessible name; pass "" for a decorative spinner
 */
export default function GenLayerSpinner({
  size = 48,
  orbits = true,
  progress,
  label = "Loading",
  className = "",
  ...rest
}) {
  const clipId = React.useMemo(() => `gls-clip-${uid++}`, []);
  const determinate = typeof progress === "number";
  const level = determinate ? 385 - (385 - 18) * Math.min(Math.max(progress, 0), 1) : null;

  const paths = PATHS.map((d, i) => <path key={i} d={d} />);

  return (
    <svg
      className={`gls ${orbits ? "gls--orbits" : "gls--compact"} ${className}`}
      width={size}
      height={size}
      viewBox={orbits ? "-30 6 460 460" : "14 16.75 372 372"}
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <defs>
        <clipPath id={clipId}>{paths}</clipPath>
      </defs>

      {orbits && (
        <>
          <g className="gls-orbit gls-orbit--out">
            <circle className="gls-track" cx="200" cy="236" r="216" />
            <circle className="gls-dot" cx="-16" cy="236" r="8" />
          </g>
          <g className="gls-orbit gls-orbit--in">
            <circle className="gls-track" cx="200" cy="236" r="196" />
            <circle className="gls-dot" cx="396" cy="236" r="10" />
          </g>
        </>
      )}

      <g className="gls-ghost">{paths}</g>

      <g clipPath={`url(#${clipId})`}>
        <g
          className="gls-level"
          style={determinate ? { animation: "none", transform: `translateY(${level}px)` } : undefined}
        >
          <g className="gls-wave">
            <path className="gls-fill" d={WAVE} />
          </g>
        </g>
      </g>
    </svg>
  );
}
