import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MetrikaCounter, ym } from 'react-metrika'
import { ScrollToTopButton } from './components/layout/ScrollToTop'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { ModalProvider } from './context/ModalContext'
import { PageLoader } from './components/ui/PageLoader'

// ===== Номер счётчика Яндекс.Метрики =====
const YANDEX_METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID) || 0

const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({
    default: m.PrivacyPolicyPage,
  }))
)

const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
)

const ServiceDetail = lazy(() =>
  import('./pages/ServiceDetail').then((m) => ({ default: m.ServiceDetail }))
)

const ContactChoiceModal = lazy(() =>
  import('./components/ui/ContactChoiceModal').then((m) => ({
    default: m.ContactChoiceModal,
  }))
)

const RequestFormModal = lazy(() =>
  import('./components/ui/RequestFormModal').then((m) => ({
    default: m.RequestFormModal,
  }))
)

/**
 * Отслеживает переходы между страницами в SPA.
 * Вызывает ym('hit', ...) при каждой смене маршрута.
 */
const MetrikaRouteTracker = () => {
  const location = useLocation()

  useEffect(() => {
    // Небольшая задержка, чтобы title успел обновиться
    const timer = setTimeout(() => {
      ym(YANDEX_METRIKA_ID, 'hit', window.location.href, {
        title: document.title,
        referer: document.referrer,
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <ModalProvider>
      {/* Счётчик Яндекс.Метрики */}
      <MetrikaCounter
        id={YANDEX_METRIKA_ID}
        options={{
          ssr: true,
          webvisor: true,
          clickmap: true,
          accurateTrackBounce: true,
          trackLinks: true,
        }}
      />

      {/* Отслеживание переходов в SPA */}
      <MetrikaRouteTracker />

      <Header />

      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<Navigate to="/" replace />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Suspense>
      </main>

      <ScrollToTopButton />
      <Footer />

      <Suspense fallback={null}>
        <ContactChoiceModal />
        <RequestFormModal />
      </Suspense>
    </ModalProvider>
  )
}

export default App