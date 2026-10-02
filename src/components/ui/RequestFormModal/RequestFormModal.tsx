import HCaptcha from '@hcaptcha/react-hcaptcha'
import { serviceOptions } from '../../../data/form'
import { Modal } from '../Modal'
import { CheckIcon } from '../Icon'
import { useModalContext } from '../../../context/ModalContext'
import '../../../styles/components/Modal.css'

// Sitekey из hCaptcha Dashboard
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY || ''

export const RequestFormModal = () => {
    const {
        isRequestModalOpen,
        closeRequestModal,
        formSubmitted,
        formSubmitting,
        formError,
        formData,
        selectedService,
        handleInputChange,
        handlePhoneChange,
        handleSubmit,
        captchaToken,
        setCaptchaToken,
    } = useModalContext()

    return (
        <Modal
            isOpen={isRequestModalOpen}
            onClose={closeRequestModal}
            ariaLabel="Оставить заявку"
        >
            {!formSubmitted ? (
                <>
                    <h3 className="modal-title">Оставить заявку</h3>
                    <p className="modal-subtitle">Заполните форму, и мы перезвоним вам</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Ваше имя
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Иван"
                                className="form-input"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                disabled={formSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">
                                Номер телефона
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                placeholder="+7 (___) ___-__-__"
                                className="form-input"
                                value={formData.phone || ''}
                                onChange={handlePhoneChange}
                                disabled={formSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="service">
                                Интересующая услуга
                            </label>
                            <select
                                id="service"
                                name="service"
                                className="form-select"
                                value={formData.service || selectedService}
                                onChange={handleInputChange}
                                disabled={formSubmitting}
                            >
                                {serviceOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="comment">
                                Комментарий (необязательно)
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows={3}
                                placeholder="Укажите модель техники или проблему..."
                                className="form-textarea"
                                value={formData.comment || ''}
                                onChange={handleInputChange}
                                disabled={formSubmitting}
                            />
                        </div>

                        <div className="modal-polit">
                            <input
                                type="checkbox"
                                id="policy"
                                name="policy"
                                required
                                disabled={formSubmitting}
                            />
                            <label className="modal-polit-agree" htmlFor="policy">
                                Я даю согласие на обработку своих персональных данных в соответствии с
                                <a className="modal-polit-link" href="/privacy">
                                    {' '}
                                    Политикой конфиденциальности*
                                </a>
                            </label>
                        </div>

                        {/* hCaptcha widget */}
                        <div className="form-group form-captcha">
                            <HCaptcha
                                sitekey={HCAPTCHA_SITEKEY}
                                onVerify={setCaptchaToken}
                                onExpire={() => setCaptchaToken(null)}
                                theme="light"
                                size="normal"
                            />
                        </div>

                        {formError && (
                            <div className="modal-error" role="alert">
                                {formError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={formSubmitting}
                        >
                            {formSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="modal-success">
                    <div className="modal-success-icon">
                        <CheckIcon size={32} />
                    </div>
                    <h3 className="modal-title">Заявка принята!</h3>
                    <p className="modal-subtitle">
                        Спасибо, {formData.name || 'клиент'}! Мастер свяжется с вами по номеру{' '}
                        <strong>{formData.phone}</strong> в ближайшее время.
                    </p>
                    <button
                        type="button"
                        className="btn btn-block modal-success-btn"
                        onClick={closeRequestModal}
                    >
                        Отлично
                    </button>
                </div>
            )}
        </Modal>
    )
}