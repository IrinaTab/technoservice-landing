import type { ReactNode } from 'react'
import {
    CashlessIcon,
    GuaranteeIcon,
    VisitIcon,
} from '../components/ui/Icon/icons'

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
        icon: <CashlessIcon />,
    },
    {
        id: 'guarantee',
        title: 'Гарантия на работы',
        description:
            'Даём официальную гарантию до 12 месяцев на все виды ремонтных работ и используемые запасные части.',
        icon: <GuaranteeIcon />,
    },
    {
        id: 'visit',
        title: 'Выезд к клиенту',
        description:
            'Оперативно выезжаем в офис или на дом по Мариуполю. Заправляем картриджи и проводим ремонт на месте.',
        icon: <VisitIcon />,
    },
]