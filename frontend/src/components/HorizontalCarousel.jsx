import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HorizontalCarousel({ children, ariaLabel }) {
  const ref = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 1);
    setCanNext(scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollByAmount = (dir = 1) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        disabled={!canPrev}
        className="absolute left-0 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-5" />
      </button>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className="flex gap-4 overflow-x-auto pb-2 pl-0 pr-0 [-ms-overflow-style:none] [scrollbar-width:none] md:pl-12 md:pr-12 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        disabled={!canNext}
        className="absolute right-0 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export default HorizontalCarousel;
