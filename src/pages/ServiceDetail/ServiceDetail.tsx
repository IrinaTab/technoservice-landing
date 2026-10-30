import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { servicesData } from '../../data/services'
import { CheckIcon, BackIcon } from '../../components/ui/Icon'
import { PhotoModal } from '../../components/ui/PhotoModal'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useModalContext } from '../../context/ModalContext'
import './ServiceDetail.css'
import '../../styles/components/Button.css'

export const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [modalSrc, setModalSrc] = useState<string | null>(null)
    const { openRequestModal } = useModalContext()
    const service = servicesData.find((s) => s.id === id)

    useDocumentTitle(
        service ? `${service.title} — ОргТехСервис` : 'Услуга не найдена — ОргТехСервис'
    )

    if (!service) {
        return <div className="container">Сервис не найден.</div>
    }

    const details = [
        service.details,
        service.detailsSecond,
        service.detailsThird,
        service.detailsFourth,
    ].filter(Boolean)

    const prices = [
        service.detailPrice,
        service.detailPriceSecond,
        service.detailPriceThird,
    ].filter(Boolean)

    return (
        <section className="service-detail">
            <div className="container">
                <button className="btn btn-back" onClick={() => navigate(-1)}>
                    <BackIcon className="back-icon" />
                    <span className="back-text">Назад</span>
                </button>

                <div className="service-detail-content">
                    <div className="service-detail-left">
                        <h1 className="service-detail-title">{service.title}</h1>

                        {details.length > 0 && (
                            <ul className="service-detail-list">
                                {details.map((detail, index) => (
                                    <li key={index} className="service-detail-text">
                                        <CheckIcon className="service-detail-check" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {prices.length > 0 && (
                            <article className="service-detail-article">
                                {prices.map((price, index) => (
                                    <p key={index} className="service-detail-price">{price}</p>
                                ))}
                            </article>
                        )}
                    </div>

                    <div className="service-detail-right">
                        <img
                            src={service.png}
                            alt={service.title}
                            loading="lazy"
                            className="service-detail-img"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setModalSrc(service.png || null)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    setModalSrc(service.png || null)
                                }
                            }}
                            aria-label="Открыть изображение на весь экран"
                        />
                    </div>
                </div>

                <div className="service-detail-cta">
                    <div className="service-detail-cta-content">
                        <p className="service-detail-cta-text">
                            Готовы доверить нам ремонт? Оставьте заявку — перезвоним в течение 20 минут.
                        </p>
                        <div className="service-detail-cta-actions">
                            <button
                                type="button"
                                className="btn service-detail-cta-back"
                                onClick={() => navigate(-1)}
                            >
                                <BackIcon className="back-icon" />
                                Назад
                            </button>
                            <button
                                type="button"
                                className="btn service-detail-cta-request"
                                onClick={() => openRequestModal(service.title)}
                            >
                                Оставить заявку
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {modalSrc && (
                <PhotoModal src={modalSrc} onClose={() => setModalSrc(null)} />
            )}
        </section>
    )
}