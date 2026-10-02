import { Link } from 'react-router-dom'
import { contactInfo } from '../../../data/contacts'
import { useModalContext } from '../../../context/ModalContext'
import './Header.css'

export const Header = () => {
  const { openRequestModal } = useModalContext()

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/main" className="logo" aria-label="ОргТехСервис — На главную">
          <div className="logo-badge">
            <img src="/images/logo.svg" alt="ОргТехСервис" className="logo-image" />
          </div>
        </Link>

        {/* Info Blocks */}
        <div className="header-info-blocks">
          <a
            href={contactInfo.addressLink}
            target="_blank"
            rel="noopener noreferrer"
            className="header-info-block header-info-block--link"
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

        {/* Actions */}
        <div className="header-actions">
          <a href={`tel:${contactInfo.phone}`} className="header-phone" aria-label={`Позвонить ${contactInfo.phoneFormatted}`}>
            <div className="header-phone-icon-wrap" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="header-phone-details">
              <span className="header-phone-val">{contactInfo.phoneFormatted}</span>
              <span className="header-phone-status">
                <span className="status-dot"></span>
                Позвонить нам
              </span>
            </div>
          </a>

          <button
            type="button"
            className="header-cta-btn"
            onClick={() => openRequestModal()}
            aria-label="Оставить заявку"
          >
            <span className="header-cta-text">Оставить заявку</span>
            <div className="header-cta-icon-wrap" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}