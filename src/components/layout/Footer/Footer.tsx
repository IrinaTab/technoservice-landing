import { Link, useNavigate } from 'react-router-dom'
import { contactInfo } from '../../../data/contacts'
import { servicesData } from '../../../data/services'
import { useModalContext } from '../../../context/ModalContext'
import './Footer.css'

export const Footer = () => {
  const { openRequestModal } = useModalContext()
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate('/')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo" aria-label="ОргТехСервис — На главную" onClick={scrollToTop}>
              <img src="/images/logo.svg" alt="ОргТехСервис" className="footer-logo-img" />
            </Link>

            <p className="footer-desc">
              Специализированный сервисный центр по ремонту офисной техники,
              ноутбуков и заправке картриджей в г. Мариуполь ДНР
            </p>

            <button
              type="button"
              className="footer-cta-btn"
              onClick={() => openRequestModal()}
              aria-label="Оставить заявку"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Оставить заявку
            </button>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Услуги</h4>
            <ul className="footer-services-list">
              {servicesData.map((service) => (
                <li key={service.id} className="footer-services-item">
                  <Link to={`/service/${service.id}`} className="footer-service-link">
                    <span className="footer-service-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Контакты</h4>
            <ul className="footer-contacts-list">
              <li className="footer-contact-item">
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a href={contactInfo.addressLink} target="_blank" rel="noopener noreferrer" title="Открыть на Яндекс.Картах">
                  {contactInfo.address}
                </a>
              </li>

              <li className="footer-contact-item">
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>График: {contactInfo.workHours}</span>
              </li>

              <li className="footer-contact-item">
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneFormatted}</a>
              </li>

              <li className="footer-contact-item">
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>

              <li className="footer-contact-item">
                <svg className="footer-contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" aria-hidden="true" fill="currentColor">
                  <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376v103.3c0 18.1 14.6 32.7 32.7 32.7 9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1-123.1-51.3zm335.1 139.7l-166.6-69.5 214.1-239.3-47.5 308.8z" />
                </svg>
                <a href={contactInfo.tgLink} target="_blank" rel="noopener noreferrer nofollow">
                  {contactInfo.tg}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Навигация</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/" className="footer-nav-link" onClick={scrollToTop}>
                  <span className="footer-nav-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  Главная
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/gallery" className="footer-nav-link">
                  <span className="footer-nav-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  Галерея
                </Link>
              </li>
              <li className="footer-nav-item">
                <button type="button" className="footer-nav-link footer-nav-btn" onClick={() => scrollToSection('why-us')}>
                  <span className="footer-nav-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  Почему мы
                </button>
              </li>
              <li className="footer-nav-item">
                <button type="button" className="footer-nav-link footer-nav-btn" onClick={() => scrollToSection('reviews')}>
                  <span className="footer-nav-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  Отзывы
                </button>
              </li>
              <li className="footer-nav-item">
                <Link to="/privacy" className="footer-nav-link">
                  <span className="footer-nav-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-copy">
            © {currentYear} Сервисный центр «ОргТехСервис». Все права защищены.
          </p>
          <Link to="/privacy" className="footer-bottom-privacy">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}