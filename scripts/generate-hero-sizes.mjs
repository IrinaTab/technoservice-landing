// scripts/generate-hero-sizes.mjs
//
// Генерирует responsive-версии hero-баннера (WebP) для srcset:
//   banner-400.webp, banner-800.webp, banner-1100.webp
//
// Запуск: npm run generate-hero
// (или напрямую: node scripts/generate-hero-sizes.mjs)

import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const sourceJpg = join(projectRoot, 'public', 'images', 'hero', 'banner.jpg')
const heroDir = join(projectRoot, 'public', 'images', 'hero')

// Исходник — 1100px шириной
const SIZES = [400, 800, 1100]
const QUALITY = 82

async function main() {
    if (!existsSync(sourceJpg)) {
        console.error(`❌ Не найден файл: ${sourceJpg}`)
        process.exit(1)
    }

    const meta = await sharp(sourceJpg).metadata()
    console.log(`📐 Исходник: ${meta.width}×${meta.height}`)

    for (const width of SIZES) {
        if (width > meta.width) {
            console.log(`⏭  ${width}px пропущен — исходник меньше`)
            continue
        }
        const outPath = join(heroDir, `banner-${width}.webp`)
        await sharp(sourceJpg)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(outPath)
        console.log(`✅ ${outPath}`)
    }

    console.log('🎉 Готово!')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})