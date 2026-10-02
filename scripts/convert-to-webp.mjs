// scripts/convert-to-webp.mjs
//
// Конвертирует все .jpg/.jpeg/.png в public/images/ в .webp
// Запуск: npm run convert-to-webp

import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const imagesDir = join(projectRoot, 'public', 'images')

const targetDirs = [
    join(imagesDir, 'works'),
    join(imagesDir, 'hero'),
    join(imagesDir, 'services'),
]

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

const WEBP_QUALITY = 80

async function convertFile(filePath) {
    const ext = extname(filePath).toLowerCase()
    if (!SUPPORTED_EXTENSIONS.includes(ext)) return null

    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')

    if (existsSync(webpPath)) {
        return { skipped: true, path: webpPath }
    }

    try {
        await sharp(filePath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(webpPath)

        const originalSize = statSync(filePath).size
        const webpSize = statSync(webpPath).size
        const ratio = ((1 - webpSize / originalSize) * 100).toFixed(1)

        return {
            skipped: false,
            path: webpPath,
            originalSize,
            webpSize,
            ratio,
        }
    } catch (err) {
        console.error(`❌ Ошибка: ${filePath}`, err.message)
        return null
    }
}

async function processDirectory(dir) {
    if (!existsSync(dir)) {
        console.warn(`⚠️  Папка не найдена: ${dir}`)
        return
    }

    const files = readdirSync(dir).filter((file) => {
        const ext = extname(file).toLowerCase()
        return SUPPORTED_EXTENSIONS.includes(ext)
    })

    console.log(`\n📁 ${dir}`)
    console.log(`   Файлов: ${files.length}`)

    let converted = 0
    let skipped = 0
    let totalOriginal = 0
    let totalWebp = 0

    for (const file of files) {
        const filePath = join(dir, file)
        const result = await convertFile(filePath)

        if (!result) continue

        if (result.skipped) {
            skipped++
        } else {
            converted++
            totalOriginal += result.originalSize
            totalWebp += result.webpSize

            const kb = (n) => (n / 1024).toFixed(1)
            console.log(
                `   ✅ ${basename(result.path)}  ${kb(result.originalSize)} КБ → ${kb(result.webpSize)} КБ (-${result.ratio}%)`
            )
        }
    }

    if (converted > 0) {
        const kb = (n) => (n / 1024).toFixed(1)
        const totalRatio = ((1 - totalWebp / totalOriginal) * 100).toFixed(1)
        console.log(`\n   📊 Итого:`)
        console.log(`   Конвертировано: ${converted}`)
        console.log(`   Пропущено: ${skipped} (уже существует)`)
        console.log(`   ${kb(totalOriginal)} КБ → ${kb(totalWebp)} КБ (-${totalRatio}%)`)
    } else {
        console.log(`   Все файлы уже сконвертированы (${skipped})`)
    }
}

console.log('🖼️  Конвертация изображений в WebP...')

for (const dir of targetDirs) {
    await processDirectory(dir)
}

console.log('\n✅ Готово!')