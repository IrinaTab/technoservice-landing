// scripts/generate-gallery.mjs
//
// Скрипт автоматически генерирует src/data/gallery.ts
// на основе файлов из public/images/works/
//
// Запуск:
//   npm run generate-gallery
//
// Что делает:
//   1. Читает все .jpg/.jpeg/.png файлы из public/images/works/
//   2. ИСКЛЮЧАЕТ .webp (они подставляются автоматически в компонентах)
//   3. Сортирует по номеру (1.jpg, 2.jpg, ..., 36.jpg)
//   4. Генерирует TypeScript-файл с массивом путей

import { readdirSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const worksDir = join(projectRoot, 'public', 'images', 'works')
const outputFile = join(projectRoot, 'src', 'data', 'gallery.ts')

// Поддерживаемые форматы (БЕЗ webp — он генерируется автоматически)
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

// ====== Проверки ======

if (!existsSync(worksDir)) {
    console.error(`❌ Папка не найдена: ${worksDir}`)
    console.error('   Создайте папку public/images/works/ с фото.')
    process.exit(1)
}

// ====== Чтение файлов ======

const files = readdirSync(worksDir)
    .filter((file) => {
        const lower = file.toLowerCase()
        // Исключаем .webp — они не должны быть в списке
        if (lower.endsWith('.webp')) return false
        return SUPPORTED_EXTENSIONS.some((ext) => lower.endsWith(ext))
    })
    .sort((a, b) => {
        // Сортировка по числовому префиксу (1, 2, 10, 20, а не 1, 10, 2, 20)
        const aNum = parseInt(a.match(/^\d+/)?.[0] ?? '0', 10)
        const bNum = parseInt(b.match(/^\d+/)?.[0] ?? '0', 10)
        if (aNum !== bNum) return aNum - bNum
        return a.localeCompare(b)
    })

if (files.length === 0) {
    console.warn('⚠️  В папке нет изображений')
    console.warn(`   Путь: ${worksDir}`)
    process.exit(0)
}

// ====== Генерация контента ======

const paths = files.map((file) => `/images/works/${file}`)

const content = `// ⚠️ ЭТОТ ФАЙЛ СГЕНЕРИРОВАН АВТОМАТИЧЕСКИ
// Не редактируйте вручную — изменения будут перезаписаны.
//
// Чтобы обновить:
//   1. Добавьте/удалите фото в public/images/works/
//   2. Запустите: npm run generate-gallery
//
// Примечание: .webp-версии подставляются автоматически в GalleryItem
// и PhotoModal через <picture>. В этом файле только оригиналы (.jpg/.png).
//
// Сгенерировано: ${new Date().toISOString()}
// Всего изображений: ${paths.length}

export const galleryImages: string[] = ${JSON.stringify(paths, null, 2)}
`

writeFileSync(outputFile, content, 'utf-8')

console.log(`✅ Сгенерировано ${paths.length} изображений (без .webp)`)
console.log(`   Файл: src/data/gallery.ts`)
console.log('')
console.log('Первые 3:')
paths.slice(0, 3).forEach((p) => console.log(`   ${p}`))
if (paths.length > 3) {
    console.log('   ...')
    console.log('Последние 3:')
    paths.slice(-3).forEach((p) => console.log(`   ${p}`))
}