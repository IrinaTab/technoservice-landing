import { lazy, Suspense } from 'react'
import { Hero } from '../../components/sections/Hero'
import { ServicesSection } from '../../components/sections/Services'
import { AdvantagesSection } from '../../components/sections/Advantages'
import { CTABanner } from '../../components/sections/CTA'
import { LazyVisible } from '../../hooks/useLazyVisible'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

const GallerySection = lazy(() =>
  import('../../components/sections/Gallery').then((m) => ({
    default: m.GallerySection,
  }))
)
const ReviewsSection = lazy(() =>
  import('../../components/sections/Reviews').then((m) => ({
    default: m.ReviewsSection,
  }))
)

export const HomePage = () => {
  useDocumentTitle('ОргТехСервис — Ремонт оргтехники и заправка картриджей в Мариуполе')

  return (
    <>
      <Hero />
      <ServicesSection />
      <AdvantagesSection />

      <LazyVisible minHeight={400}>
        <Suspense fallback={null}>
          <GallerySection />
        </Suspense>
      </LazyVisible>

      <LazyVisible minHeight={200}>
        <Suspense fallback={null}>
          <ReviewsSection />
        </Suspense>
      </LazyVisible>

      <CTABanner />
    </>
  )
}