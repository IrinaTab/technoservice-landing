import { ServiceCard } from './ServiceCard'
import { SectionHeader } from '../../ui/SectionHeader'
import { servicesData } from '../../../data/services'
import './Services.css'
import '../../../styles/components/Section.css'
import '../../../styles/components/Button.css'

export const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader
          tag="ГАРАНТИЯ КАЧЕСТВА"
          title="НАШИ УСЛУГИ"
          subtitle="Решаем любые задачи по восстановлению и обслуживанию оргтехники с гарантией качества"
        />

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              icon={service.icon}
              perks={service.perks}
            />
          ))}
        </div>
      </div>
    </section>
  )
}