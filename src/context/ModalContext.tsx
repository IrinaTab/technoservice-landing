import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from 'react'
import { ym } from 'react-metrika'
import { sendRequest } from '../utils/sendRequest'
import { formatPhone } from '../utils/formatPhone'

const DEFAULT_SERVICE = 'Заправка картриджей'
const YANDEX_METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID) || 0

export interface ModalFormData {
    name?: string
    phone?: string
    email?: string
    service?: string
    comment?: string
}

export interface ModalContextValue {
    isContactModalOpen: boolean
    isRequestModalOpen: boolean
    selectedService: string
    formSubmitted: boolean
    formSubmitting: boolean
    formError: string | null
    formData: Partial<ModalFormData>
    captchaToken: string | null

    openContactModal: () => void
    closeContactModal: () => void
    openRequestModal: (serviceName?: string) => void
    closeRequestModal: () => void
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: FormEvent) => void
    setCaptchaToken: (token: string | null) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<string>(DEFAULT_SERVICE)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<ModalFormData>>({})
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)

    const openContactModal = useCallback(() => {
        setIsContactModalOpen(true)
    }, [])

    const closeContactModal = useCallback(() => {
        setIsContactModalOpen(false)
    }, [])

    const openRequestModal = useCallback((serviceName?: string) => {
        setIsRequestModalOpen(true)
        setSelectedService(serviceName || DEFAULT_SERVICE)
    }, [])

    const closeRequestModal = useCallback(() => {
        setIsRequestModalOpen(false)
        setSelectedService(DEFAULT_SERVICE)
        setFormSubmitted(false)
        setFormSubmitting(false)
        setFormError(null)
        setFormData({})
        setCaptchaToken(null)
    }, [])

    const handleInputChange = useCallback(
        (
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
            if (formError) setFormError(null)
        },
        [formError]
    )

    const handlePhoneChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const formatted = formatPhone(e.target.value)
            setFormData((prev) => ({ ...prev, phone: formatted }))
            if (formError) setFormError(null)
        },
        [formError]
    )

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault()
            setFormError(null)
            setFormSubmitting(true)

            const result = await sendRequest({
                name: formData.name || '',
                phone: formData.phone || '',
                service: formData.service || selectedService,
                comment: formData.comment || '',
                captchaToken: captchaToken || '',
            })

            setFormSubmitting(false)

            if (result.success) {
                setFormSubmitted(true)
                ym(YANDEX_METRIKA_ID, 'reachGoal', 'FORM_SUBMIT')
            } else {
                setFormError(
                    result.error ||
                    'Не удалось отправить заявку. Позвоните нам: +7 (949) 712 80 83'
                )
            }
        },
        [formData, selectedService, captchaToken]
    )

    const value = useMemo<ModalContextValue>(
        () => ({
            isContactModalOpen,
            isRequestModalOpen,
            selectedService,
            formSubmitted,
            formSubmitting,
            formError,
            formData,
            captchaToken,
            openContactModal,
            closeContactModal,
            openRequestModal,
            closeRequestModal,
            handleInputChange,
            handlePhoneChange,
            handleSubmit,
            setCaptchaToken,
        }),
        [
            isContactModalOpen,
            isRequestModalOpen,
            selectedService,
            formSubmitted,
            formSubmitting,
            formError,
            formData,
            captchaToken,
            openContactModal,
            closeContactModal,
            openRequestModal,
            closeRequestModal,
            handleInputChange,
            handlePhoneChange,
            handleSubmit,
        ]
    )

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModalContext = (): ModalContextValue => {
    const ctx = useContext(ModalContext)
    if (!ctx) {
        throw new Error('useModalContext must be used within ModalProvider')
    }
    return ctx
}