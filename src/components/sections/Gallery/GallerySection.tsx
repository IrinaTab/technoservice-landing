import { useState } from 'react'
import { GalleryItem } from '../../ui/GalleryItem'
import { PhotoModal } from '../../ui/PhotoModal'
import { galleryImages } from '../../../data/gallery'
import './GallerySection.css'

const PREVIEW_COUNT = 3

export const GallerySection = () => {
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  const previewImages = galleryImages.slice(0, PREVIEW_COUNT)

  return (
    <section className="gallery-section">
      <h2 className="gallery-section-title">НАШИ РАБОТЫ</h2>

      <div className="gallery-preview-grid">
        {previewImages.map((src, idx) => (
          <GalleryItem
            key={idx}
            src={src}
            onClick={() => setModalSrc(src)}
          />
        ))}
      </div>

      <a href="/gallery" className="btn btn-primary gallery-cta">
        Смотреть все работы
      </a>

      {modalSrc && (
        <PhotoModal src={modalSrc} onClose={() => setModalSrc(null)} />
      )}
    </section>
  )
}