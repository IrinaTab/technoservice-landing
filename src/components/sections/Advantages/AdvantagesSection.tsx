import { SectionHeader } from '../../ui/SectionHeader'
import { advantagesData } from '../../../data/advantages'
import { AdvantageCard } from './AdvantageCard'
import './Advantages.css'
import '../../../styles/components/Section.css'

export const AdvantagesSection = () => {
  return (
    <section id="why-us" className="section why-us-section">
      <div className="container">
        <SectionHeader
          tag="Наши преимущества"
          title="Почему выбирают нас"
          subtitle="Надёжный сервисный центр для частных лиц и бизнеса с прозрачными условиями"
        />

        <div className="advantages-grid">
          {advantagesData.map((advantage) => (
            <AdvantageCard
              key={advantage.id}
              title={advantage.title}
              description={advantage.description}
              icon={advantage.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}