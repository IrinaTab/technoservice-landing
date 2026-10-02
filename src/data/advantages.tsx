import type { ReactNode } from 'react'

// Иконка "Безналичный расчёт"
const CashlessIcon = (
    <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
)

// Иконка "Гарантия на работы"
const GuaranteeIcon = (
    <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)

// Иконка "Выезд к клиенту"
const VisitIcon = (
    <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
)

export interface Advantage {
    id: string
    title: string
    description: string
    icon: ReactNode
}

export const advantagesData: Advantage[] = [
    {
        id: 'cashless',
        title: 'Безналичный расчёт',
        description:
            'Работаем с юридическими и физическими лицами. Предоставляем полный пакет документов (счёт, акты, договор).',
        icon: CashlessIcon,
    },
    {
        id: 'guarantee',
        title: 'Гарантия на работы',
        description:
            'Даём официальную гарантию до 12 месяцев на все виды ремонтных работ и используемые запасные части.',
        icon: GuaranteeIcon,
    },
    {
        id: 'visit',
        title: 'Выезд к клиенту',
        description:
            'Оперативно выезжаем в офис или на дом по Мариуполю. Заправляем картриджи и проводим ремонт на месте.',
        icon: VisitIcon,
    },
]