import { Fragment } from 'react'
import { useModalContext } from '../../../context/ModalContext'
import './Hero.css'

export const Hero = () => {
  const { openContactModal } = useModalContext()

  const tickerItems = [
    'Быстрая заправка картриджей от 15 минут',
    'Официальная гарантия на все работы',
    'Ремонт принтеров, МФУ и ноутбуков',
    'Выезд мастера в день заявки по Мариуполю',
    'Комплексное обслуживание предприятий',
    'Безналичный расчёт и закрывающие документы',
  ]

  const StarIcon = () => (
    <svg className="ticker-divider-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  )

  return (
    <section className="hero-section">
      {/* Running Marquee Ticker */}
      <div className="hero-ticker-container">
        <div className="hero-ticker-track">
          {/* First sequence */}
          <div className="hero-ticker-group">
            {tickerItems.map((item, index) => (
              <Fragment key={`ticker-1-${index}`}>
                <span className="ticker-item">{item}</span>
                <StarIcon />
              </Fragment>
            ))}
          </div>
          {/* Second duplicate sequence for seamless loop */}
          <div className="hero-ticker-group" aria-hidden="true">
            {tickerItems.map((item, index) => (
              <Fragment key={`ticker-2-${index}`}>
                <span className="ticker-item">{item}</span>
                <StarIcon />
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Mobile-only info blocks */}
        <div className="header-info-mobile">
          <a
            href="https://yandex.ru/maps/?text=Мариуполь%2C+пр.+Металлургов%2C+58"
            target="_blank"
            rel="noopener noreferrer"
            className="header-info-block"
            title="Открыть на Яндекс.Картах"
          >
            <div className="header-info-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="header-info-content">
              <span className="header-info-title">пр. Металлургов, 58</span>
              <span className="header-info-desc">ориентир: Горводоканал</span>
            </div>
          </a>
          <div className="header-info-block">
            <div className="header-info-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="header-info-content">
              <span className="header-info-title">Пн–Сб: 09:00–17:00</span>
              <span className="header-info-desc">Воскресенье — выходной</span>
            </div>
          </div>
        </div>
        {/* Main H1 Title */}
        <h1 className="hero-title">
          Ремонт оргтехники и <span className="hero-title-highlight">заправка картриджей</span> в Мариуполе
        </h1>

        {/* Main 2-Column Showcase */}
        <div className="hero-box-main">
          {/* Banner Column (Full Image, Not Cropped) */}
          <div className="hero-box-banner">
            <div className="hero-banner-wrapper">
              <picture>
                <source srcSet="/images/hero/banner.webp" type="image/webp" />
                <img
                  className="banner"
                  src="/images/hero/banner.jpg"
                  alt="Ремонт оргтехники и заправка картриджей в Мариуполе"
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* Secondary Content Column */}
          <div className="hero-box-secondary">
            <p className="hero-subtitle">
              Профессиональное обслуживание офисной техники и ноутбуков любой сложности. Качественные расходные материалы, компонентный ремонт и оперативный выезд мастера.
            </p>

            <h2 className="hero-title-small">Почему клиенты выбирают нас:</h2>

            <div className="hero-badges">
              {/* Badge 1: Профессионалы */}
              <div className="hero-badge-item">
                <div className="hero-badge-icon-wrap" aria-hidden="true">
                  <svg className="hero-badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span>Опытные сертифицированные инженеры</span>
              </div>

              {/* Badge 2: Широкий спектр */}
              <div className="hero-badge-item">
                <div className="hero-badge-icon-wrap" aria-hidden="true">
                  <svg className="hero-badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span>Полный спектр услуг: от принтеров до ноутбуков</span>
              </div>

              {/* Badge 3: Скорость */}
              <div className="hero-badge-item">
                <div className="hero-badge-icon-wrap" aria-hidden="true">
                  <svg className="hero-badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span>Экспресс-заправка картриджей от 15 минут</span>
              </div>

              {/* Badge 4: Гарантия */}
              <div className="hero-badge-item">
                <div className="hero-badge-icon-wrap" aria-hidden="true">
                  <svg className="hero-badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <span>Официальная гарантия на все виды работ</span>
              </div>

              {/* Badge 5: Выезд */}
              <div className="hero-badge-item">
                <div className="hero-badge-icon-wrap" aria-hidden="true">
                  <svg className="hero-badge-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <span>Оперативный выезд мастера в офис или на дом</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary hero-btn"
                onClick={openContactModal}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span>Заказать ремонт</span>
              </button>

              <a href="#services" className="btn btn-dark hero-btn-secondary">
                <span>Все услуги</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}