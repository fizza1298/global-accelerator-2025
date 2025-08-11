import React, { useEffect, useRef, useState } from "react";

export default function Carousel({
  slides,                 // array of React nodes
  initial = 0,
  onChange = () => {},
  className = "",
  ariaLabel = "Slides"
}) {
  const [idx, setIdx] = useState(initial);
  const trackRef = useRef(null);
  const startX = useRef(null);
  const deltaX = useRef(0);

  const go = (n) => {
    const next = Math.max(0, Math.min(n, slides.length - 1));
    setIdx(next);
    onChange(next);
  };
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${idx * 100}%)`;
    }
  }, [idx]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // touch / pointer
  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
    deltaX.current = 0;
  };
  const onPointerMove = (e) => {
    if (startX.current == null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    deltaX.current = x - startX.current;
  };
  const onPointerUp = () => {
    if (startX.current == null) return;
    const threshold = 40; // px
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <div className={`relative overflow-hidden select-none ${className}`} aria-label={ariaLabel}>
      {/* track */}
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-out pb-28 md:pb-32"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {slides.map((s, i) => (
          <div key={i} className="min-w-full px-2 md:px-0">{s}</div>
        ))}
      </div>


<button
  onClick={prev}
  disabled={idx === 0}
  aria-label="Previous"
  className="absolute left-6 md:left-12 bottom-24 md:bottom-28
             rounded-full bg-white shadow px-4 py-4 text-xl text-gray-900 z-20
             hover:bg-white disabled:opacity-50"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>


<button
  onClick={next}
  disabled={idx === slides.length - 1}
  aria-label="Next"
  className="absolute right-6 md:right-12 bottom-24 md:bottom-28
             rounded-full bg-white shadow px-4 py-4 text-xl text-gray-900 z-20
             hover:bg-white disabled:opacity-50"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
</button>


     
        <div className="absolute left-0 right-0 bottom-4 md:bottom-6 flex justify-center gap-3">
        {slides.map((_, i) => (
        <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === idx ? "true" : "false"}
            className={`h-3 w-3 rounded-full ${i === idx ? "bg-blue-600" : "bg-gray-300"}`}
        />
        ))}
        </div>

    </div>
  );
}
