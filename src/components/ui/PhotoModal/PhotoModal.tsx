import { useEffect } from 'react'
import './PhotoModal.css'

interface PhotoModalProps {
  src: string
  onClose: () => void
}

export const PhotoModal = ({ src, onClose }: PhotoModalProps) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img src={src} alt="" className="photo-modal-img" />
        </picture>
      </div>
    </div>
  )
}