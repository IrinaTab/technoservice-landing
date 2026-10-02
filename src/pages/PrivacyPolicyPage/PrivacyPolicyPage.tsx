import { useNavigate } from 'react-router-dom'
import { contactInfo } from '../../data/contacts'
import { BackIcon } from '../../components/ui/Icon'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import './PrivacyPolicyPage.css'

export const PrivacyPolicyPage = () => {
    const navigate = useNavigate()
    useDocumentTitle('Политика конфиденциальности — ОргТехСервис')

    return (
        <div className="privacy-wrapper container">
            {/* Back button */}
            <button className="btn btn-back" onClick={() => navigate(-1)}>
                <BackIcon className="back-icon" />
                <span className="back-text">Назад</span>
            </button>

            <div className="privacy-container">
                <h1 className="privacy-title">Политика конфиденциальности</h1>

                <p className="privacy-intro">
                    Настоящая Политика конфиденциальности регулирует порядок обработки и защиты
                    персональных данных пользователей сайта <strong>ОргТехСервис</strong> (далее — «Сайт»).
                </p>

                <section className="privacy-section">
                    <h2>1. Термины и определения</h2>
                    <p>
                        <strong>Оператор</strong> — ИП Иочбалис Владислав Васильевич, ИНН: 931000136230, ОГРН: 323930100025687
                        <br /><br />
                        <strong>Персональные данные</strong> — любая информация, относящаяся к прямо или косвенно определённому или определяемому физическому лицу.
                        <br /><br />
                        <strong>Обработка персональных данных</strong> — любые действия с персональными данными, включая сбор, хранение, использование, передачу, удаление.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>2. Какие данные мы собираем</h2>
                    <p>Мы собираем следующие данные:</p>
                    <ul className="privacy-list">
                        <li>Имя и фамилия (при заполнении формы заявки)</li>
                        <li>Номер телефона</li>
                        <li>E-mail (если пользователь указывает)</li>
                        <li>Технические данные: IP‑адрес, тип устройства, браузер, cookie‑файлы</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>3. Цели обработки данных</h2>
                    <p>Мы обрабатываем персональные данные для:</p>
                    <ul className="privacy-list">
                        <li>Обработки заявок и связи с клиентом</li>
                        <li>Исполнения договора на оказание услуг</li>
                        <li>Улучшения работы сайта и аналитики (Яндекс.Метрика)</li>
                        <li>Рассылки уведомлений (при наличии согласия)</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>4. Сроки и безопасность</h2>
                    <p>
                        Персональные данные хранятся столько, сколько необходимо для достижения целей обработки. Мы принимаем технические и организационные меры для защиты данных от неправомерного доступа.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>5. Права пользователя</h2>
                    <p>
                        Пользователь вправе запросить доступ к своим данным, внести исправления, отозвать согласие или потребовать удаления данных.
                        <br /><br />
                        Для реализации этих прав отправьте запрос на электронную почту:
                        {' '}
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="privacy-email-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactInfo.email}
                        </a>.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>6. Изменения Политики</h2>
                    <p>
                        Оператор вправе вносить изменения в настоящую Политику конфиденциальности. Новая редакция публикуется на странице и вступает в силу с момента публикации.
                    </p>
                </section>
            </div>
        </div>
    )
}