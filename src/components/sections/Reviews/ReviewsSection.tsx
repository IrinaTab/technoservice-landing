import { useState, useRef } from 'react'
import './ReviewsSection.css'

const YANDEX_ORG_ID = '35023895183'
const YANDEX_ORG_URL = 'https://yandex.ru/maps/org/zapravka_kartridzhey/35023895183/'

export const ReviewsSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCollapse = () => {
    setIsOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={sectionRef} className="reviews-section" id="reviews">
      <h2 className="reviews-section-title">ОТЗЫВЫ О НАС</h2>
      <p className="reviews-section-subtitle">Реальные отзывы наших клиентов с Яндекс Карт</p>

      {/* Верхний триггер (галочка вниз, поворачивается при раскрытии) */}
      <button
        type="button"
        className={`reviews-toggle-btn reviews-toggle-btn--top ${isOpen ? 'is-open' : ''}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Свернуть отзывы' : 'Раскрыть отзывы'}
      >
        <svg
          className="reviews-toggle-icon"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>

      {/* Раскрывающийся контент отзывов */}
      <div className={`reviews-accordion-content ${isOpen ? 'is-expanded' : ''}`}>
        <div className="reviews-accordion-inner">
          <iframe
            src={`https://yandex.ru/sprav/widget/rating-badge/${YANDEX_ORG_ID}?type=rating`}
            width="150"
            height="50"
            frameBorder="0"
            title="Рейтинг Яндекс Карт"
            className="reviews-rating-badge"
          />

          <div className="reviews-widget-wrapper">
            <iframe
              src={`https://yandex.ru/maps-reviews-widget/${YANDEX_ORG_ID}?comments`}
              title="Отзывы с Яндекс Карт"
              className="reviews-widget-iframe"
            />
            <a
              href={YANDEX_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-widget-link"
            >
              Открыть на Яндекс Картах
            </a>
          </div>

          <a
            href={YANDEX_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary reviews-cta"
          >
            Оставить отзыв
          </a>

          {/* Нижний триггер сворачивания со стрелкой вверх */}
          <div className="reviews-bottom-action">
            <button
              type="button"
              className="reviews-toggle-btn reviews-toggle-btn--bottom"
              onClick={handleCollapse}
              aria-label="Свернуть отзывы"
            >
              <svg
                className="reviews-toggle-icon"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
