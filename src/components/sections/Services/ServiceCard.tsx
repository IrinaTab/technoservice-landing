import { memo, type ReactNode } from 'react'
import { CheckIcon } from '../../ui/Icon'
import { useNavigate } from 'react-router-dom'

interface ServiceCardProps {
  id: string
  title: string
  icon: ReactNode
  perks: string[]
}

export const ServiceCard = memo(function ServiceCard({
  id,
  title,
  icon,
  perks,
}: ServiceCardProps) {
  const navigate = useNavigate()
  return (
    <div className="service-card">
      <div>
        <div className="service-icon" aria-hidden="true">
          {icon}
        </div>
        <h3 className="service-title">{title}</h3>
        <ul className="service-perks">
          {perks.map((perk, index) => (
            <li key={index} className="service-perk-item">
              <span className="service-perk-icon">
                <CheckIcon />
              </span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="btn btn-outline"
        onClick={() => navigate(`/service/${id}`)}
      >
        Подробнее
      </button>
    </div>
  )
})