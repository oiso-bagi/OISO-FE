import { useEffect, useState } from "react";

import * as styles from "../DashboardPage.css";

const SHOW_BUTTON_SCROLL_Y = 600;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY >= SHOW_BUTTON_SCROLL_Y);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!isVisible) return null;

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={styles.scrollToTopButton}
      aria-label="페이지 맨 위로 이동"
      onClick={scrollToTop}
    >
      <svg
        className={styles.scrollToTopIcon}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
      </svg>
    </button>
  );
}
