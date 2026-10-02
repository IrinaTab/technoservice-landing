import type { SVGProps } from 'react'
import { Icon } from './Icon'

// Пропсы для всех иконок — стандартные SVG-пропсы
type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string
}

// ============ ФУНКЦИОНАЛЬНЫЕ ИКОНКИ ============

/** Галочка (в круге) — используется в списках perks и в форме */
export const CheckIcon = ({ size = 12, className, ...props }: IconProps) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="currentColor"
        aria-hidden="true"
        {...props}
    >
        <path d="M 25 2 C 12.317 2 2 12.317 2 25 C 2 37.683 12.317 48 25 48 C 37.683 48 48 37.683 48 25 C 48 20.44 46.660281 16.189328 44.363281 12.611328 L 42.994141 14.228516 C 44.889141 17.382516 46 21.06 46 25 C 46 36.579 36.579 46 25 46 C 13.421 46 4 36.579 4 25 C 4 13.421 13.421 4 25 4 C 30.443 4 35.393906 6.0997656 39.128906 9.5097656 L 40.4375 7.9648438 C 36.3525 4.2598437 30.935 2 25 2 z M 43.236328 7.7539062 L 23.914062 30.554688 L 15.78125 22.96875 L 14.417969 24.431641 L 24.083984 33.447266 L 44.763672 9.046875 L 43.236328 7.7539062 z" />
    </svg>
)

/** Стрелка «Назад» (влево) */
export const BackIcon = ({ size = 24, className, ...props }: IconProps) => (
    <Icon className={className} size={size} {...props}>
        <path d="M15 18l-6-6 6-6" />
    </Icon>
)

/** Телефон */
export const PhoneIcon = ({ size = 18, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2" {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
)

/** Стрелка вправо (для кнопок «Подробнее» и т.д.) */
export const ArrowRightIcon = ({ size = 20, className, ...props }: IconProps) => (
    <Icon className={className} size={size} {...props}>
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
    </Icon>
)

/** Карандаш + документ — «Оставить заявку» */
export const SendRequestIcon = ({ size = 18, className, ...props }: IconProps) => (
    <Icon className={className} size={size} {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </Icon>
)

// ============ ИКОНКИ УСЛУГ (28×28) ============

export const CartridgeIcon = ({ size = 28, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
    </Icon>
)

export const RepairIcon = ({ size = 28, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </Icon>
)

export const EnterpriseIcon = ({ size = 28, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
)

// ============ ИКОНКИ ПРЕИМУЩЕСТВ (30×30) ============

export const CashlessIcon = ({ size = 30, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </Icon>
)

export const GuaranteeIcon = ({ size = 30, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </Icon>
)

export const VisitIcon = ({ size = 30, className, ...props }: IconProps) => (
    <Icon className={className} size={size} strokeWidth="2.2" {...props}>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </Icon>
)