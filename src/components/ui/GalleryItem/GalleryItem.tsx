import { memo } from 'react'
import './GalleryItem.css'

interface GalleryItemProps {
  src: string
  onClick: () => void
  alt?: string
}

export const GalleryItem = memo(function GalleryItem({
  src,
  onClick,
  alt = '',
}: GalleryItemProps) {
  // Заменяем .jpg/.jpeg/.png на .webp для современного формата
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')

  return (
    <div
      className="gallery-item-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className="gallery-item-img"
          loading="lazy"
        />
      </picture>
    </div>
  )
})