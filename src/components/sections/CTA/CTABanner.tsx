import { useModalContext } from '../../../context/ModalContext'
import './CTABanner.css'

export const CTABanner = () => {
    const { openRequestModal } = useModalContext()

    return (
        <section className="cta-banner-section">
            <div className="container">
                <div className="cta-banner">
                    <div>
                        <h2 className="cta-banner-title">Срочно нужен ремонт техники?</h2>
                        <p className="cta-banner-desc">
                            Оставьте заявку прямо сейчас — инженер свяжется с вами в ближайшее время и рассчитает точную стоимость.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="cta-banner-btn"
                        onClick={() => openRequestModal()}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        <span>Оставить заявку</span>
                    </button>
                </div>
            </div>
        </section>
    )
}