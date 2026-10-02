import { contactInfo } from '../../../data/contacts'
import { Modal } from '../Modal'
import { PhoneIcon, SendRequestIcon, ArrowRightIcon } from '../Icon'
import { useModalContext } from '../../../context/ModalContext'
import '../../../styles/components/Modal.css'
import './ContactChoiceModal.css'

export const ContactChoiceModal = () => {
    const { isContactModalOpen, closeContactModal, openRequestModal } = useModalContext()

    const handleRequestClick = () => {
        closeContactModal()
        openRequestModal()
    }

    return (
        <Modal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
            ariaLabel="Связаться с нами"
        >
            <div className="contact-modal-content">
                <h3 className="contact-modal-title">Связаться с нами</h3>
                <p className="contact-modal-subtitle">Выберите удобный способ связи</p>

                <div className="contact-modal-buttons">
                    {/* Позвонить нам — <a href="tel:..."> для мобильных */}
                    <a
                        href={`tel:${contactInfo.phone}`}
                        className="contact-modal-btn contact-modal-btn-phone"
                        aria-label={`Позвонить по номеру ${contactInfo.phoneFormatted}`}
                    >
                        <div className="contact-modal-btn-icon">
                            <PhoneIcon size={24} />
                        </div>
                        <div className="contact-modal-btn-content">
                            <span className="contact-modal-btn-title">Позвонить нам</span>
                            <span className="contact-modal-btn-phone-number">
                                {contactInfo.phoneFormatted}
                            </span>
                        </div>
                        <ArrowRightIcon className="contact-modal-btn-arrow" size={20} />
                    </a>

                    {/* Оставить заявку — кнопка */}
                    <button
                        type="button"
                        className="contact-modal-btn contact-modal-btn-request"
                        onClick={handleRequestClick}
                    >
                        <div className="contact-modal-btn-icon">
                            <SendRequestIcon size={22} />
                        </div>
                        <div className="contact-modal-btn-content">
                            <span className="contact-modal-btn-title">Оставить заявку</span>
                            <span className="contact-modal-btn-desc">
                                Мы перезвоним вам в течение 10 минут
                            </span>
                        </div>
                        <ArrowRightIcon className="contact-modal-btn-arrow" size={20} />
                    </button>
                </div>
            </div>
        </Modal>
    )
}