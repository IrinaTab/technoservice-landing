// scripts/generate-og-image.mjs
// Создает og-image.jpg 1200x630 из banner.webp с белым фоном

import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const input = join(projectRoot, 'public', 'images', 'hero', 'banner.webp')
const output = join(projectRoot, 'public', 'images', 'og-image.jpg')

const WIDTH = 1200
const HEIGHT = 630

async function main() {
    console.log('🖼️  Генерация og-image.jpg...')

    // 1. Изменяем размер баннера так, чтобы он вписался в 1200x630 (без обрезки, с сохранением пропорций)
    const resized = await sharp(input)
        .resize({
            width: WIDTH,
            height: HEIGHT,
            fit: 'contain',          // вписываем целиком
            background: { r: 255, g: 255, b: 255, alpha: 1 } // белый фон для пустых полей
        })
        .jpeg({ quality: 85 })
        .toFile(output)

    console.log(`✅ Готово: ${output}`)
    console.log(`   Размер: ${resized.width}×${resized.height}`)
}

main().catch((err) => {
    console.error('❌ Ошибка:', err)
    process.exit(1)
})