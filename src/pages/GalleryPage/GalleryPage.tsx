import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GalleryItem } from '../../components/ui/GalleryItem'
import { PhotoModal } from '../../components/ui/PhotoModal'
import { BackIcon } from '../../components/ui/Icon'
import { galleryImages } from '../../data/gallery'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

import './GalleryPage.css'
import '../../styles/components/Button.css'

export const GalleryPage = () => {
  useDocumentTitle('Наши работы — ОргТехСервис - Ремонт оргтехники в Мариуполе')
  const [modalSrc, setModalSrc] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <section className="container">
      {/* Back button */}
      <button className="btn btn-back" onClick={() => navigate(-1)}>
        <BackIcon className="back-icon" />
        <span className="back-text">Назад</span>
      </button>

      <h2 className="gallery-page-title">Все работы</h2>

      <section className="gallery-page">
        <div className="gallery-grid">
          {galleryImages.map((src, idx) => (
            <GalleryItem key={idx} src={src} onClick={() => setModalSrc(src)} />
          ))}
        </div>

        {modalSrc && <PhotoModal src={modalSrc} onClose={() => setModalSrc(null)} />}
      </section>
    </section>
  )
}