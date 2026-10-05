import { useEffect, useRef, type ReactNode } from 'react'

export interface ModalProps {
    /** Открыта ли модалка */
    isOpen: boolean
    /** Колбэк при закрытии (клик по оверлею, кнопка ✕, Escape) */
    onClose: () => void
    /** Содержимое модалки */
    children: ReactNode
    /** Дополнительный CSS-класс для .modal-content */
    className?: string
    /** Показывать ли кнопку-крестик (по умолчанию true) */
    showCloseButton?: boolean
    /** aria-label для диалога (для скринридеров) */
    ariaLabel?: string
}

/**
 * Базовое модальное окно.
 *
 * Возможности:
 * - клик по оверлею закрывает
 * - закрытие по Escape
 * - блокировка скролла body через position: fixed (мобильные браузеры
 *   не сдвигают страницу при фокусе на input)
 * - восстановление позиции скролла после закрытия
 * - автофокус на первом интерактивном элементе
 * - фокус остаётся внутри модалки (focus trap)
 */
export const Modal = ({
    isOpen,
    onClose,
    children,
    className = '',
    showCloseButton = true,
    ariaLabel = 'Диалоговое окно',
}: ModalProps) => {
    const contentRef = useRef<HTMLDivElement>(null)

    // ===== 1. Escape + блокировка скролла body =====
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        // Блокировка скролла с компенсацией скроллбара
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        const prevOverflow = document.body.style.overflow
        const prevPaddingRight = document.body.style.paddingRight
        const prevPosition = document.body.style.position
        const prevTop = document.body.style.top
        const prevWidth = document.body.style.width

        // Запоминаем текущую позицию скролла, чтобы вернуть её после закрытия
        const scrollY = window.scrollY

        document.body.style.overflow = 'hidden'
        // Фиксация body — мобильные браузеры не будут скроллить страницу при фокусе
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = prevOverflow
            document.body.style.paddingRight = prevPaddingRight
            document.body.style.position = prevPosition
            document.body.style.top = prevTop
            document.body.style.width = prevWidth
            // Возвращаем страницу на ту же позицию, где она была
            window.scrollTo(0, scrollY)
        }
    }, [isOpen, onClose])

    // ===== 2. Autofocus + Focus trap =====
    useEffect(() => {
        if (!isOpen) return
        const container = contentRef.current
        if (!container) return

        // Находим первый интерактивный элемент и фокусируемся
        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

        const focusables = container.querySelectorAll<HTMLElement>(focusableSelector)
        const firstFocusable = focusables[0]
        if (firstFocusable) {
            // небольшая задержка, чтобы анимация не мешала
            setTimeout(() => firstFocusable.focus(), 50)
        }

        // Focus trap: держим Tab внутри модалки
        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return
            const focusables = container.querySelectorAll<HTMLElement>(focusableSelector)
            if (focusables.length === 0) return

            const first = focusables[0]
            const last = focusables[focusables.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleTab)
        return () => document.removeEventListener('keydown', handleTab)
    }, [isOpen])

    // ===== 3. Не рендерим, если закрыта =====
    if (!isOpen) return null

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
        >
            <div ref={contentRef} className={`modal-content ${className}`.trim()}>
                {showCloseButton && (
                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ✕
                    </button>
                )}
                {children}
            </div>
        </div>
    )
}