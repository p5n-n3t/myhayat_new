"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Static full copy with one randomly chosen word sparkling for 1.5 seconds.
 * No letter-by-letter animation, no reflow, no hydration randomness.
 */
export function WordTwinkle({ text, className = "" }: { text: string; className?: string }) {
  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const indices = useMemo(
    () => words.map((word, index) => word.trim() ? index : -1).filter((index) => index >= 0),
    [words]
  );
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !indices.length) return;
    let previous = -1;
    const selectWord = () => {
      const options = indices.filter((index) => index !== previous);
      const pool = options.length ? options : indices;
      previous = pool[Math.floor(Math.random() * pool.length)];
      setActive(previous);
    };
    selectWord();
    const interval = window.setInterval(selectWord, 1500);
    return () => window.clearInterval(interval);
  }, [indices]);

  return (
    <p className={"word-twinkle-copy " + className}>
      {words.map((word, index) => /^\s+$/.test(word)
        ? <span key={index}>{word}</span>
        : <span key={index} className={active === index ? "word-twinkle word-twinkle--active" : "word-twinkle"}>{word}</span>
      )}
    </p>
  );
}
