import { useEffect, useState } from 'react';
import { useModalContext } from '../../../context/ModalContext';
import './ScrollToTopButton.css';

/**
 * Reusable "Scroll to Top" button.
 * Appears after the user scrolls down a bit and, when clicked,
 * smoothly scrolls the page to the top.
 * Скрывается, когда открыта любая модалка (контактная или заявки).
 */
export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const { isContactModalOpen, isRequestModalOpen } = useModalContext();

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

  const isAnyModalOpen = isContactModalOpen || isRequestModalOpen;
  const shouldShow = visible && !isAnyModalOpen;

  return (
    <button
      className={`scroll-to-top-btn ${shouldShow ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!shouldShow}
      tabIndex={shouldShow ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5l-7 7h4v7h6v-7h4z" />
      </svg>
    </button>
  );
};