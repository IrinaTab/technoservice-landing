import { useEffect, useState } from 'react';
import './ScrollToTopButton.css';

/**
 * Reusable "Scroll to Top" button.
 * Appears after the user scrolls down a bit and, when clicked,
 * smoothly scrolls the page to the top.
 * The visual style is defined in an external CSS file using project variables.
 */
export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ALWAYS render button; visibility controlled via CSS opacity
  return (
    <button
      className={`scroll-to-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5l-7 7h4v7h6v-7h4z" />
      </svg>
    </button>
  );
};
