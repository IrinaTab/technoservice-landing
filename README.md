# ОргТехСервис — Лендинг сервисного центра

Сайт сервисного центра по ремонту оргтехники и заправке картриджей в Мариуполе.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (http://localhost:5173)
npm run dev

# Production-сборка
npm run build

# Просмотр production-сборки
npm run preview
```

## 📜 Скрипты

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Production-сборка (с автогенерацией галереи) |
| `npm run preview` | Просмотр production-сборки локально |
| `npm run lint` | Проверка кода через `oxlint` |
| `npm run generate-gallery` | Автогенерация `src/data/gallery.ts` из `public/images/works/` |
| `npm run convert-to-webp` | Конвертация изображений в WebP (требует `sharp`) |

## 🏗️ Технологии

- **React 19** — UI-библиотека
- **TypeScript** — типизация
- **React Router 7** — роутинг
- **Vite 8** — сборщик
- **Sharp** — конвертация изображений в WebP

## 📁 Структура проекта

```
src/
├── App.tsx                  # Корневой компонент (роутинг + ModalProvider)
├── main.tsx                 # Точка входа
├── index.css                # Глобальные стили + импорт переменных
│
├── components/
│   ├── layout/              # Макет
│   │   ├── Header/          # Шапка
│   │   ├── Footer/          # Подвал
│   │   └── ScrollToTop/     # Скролл наверх + кнопка
│   │
│   ├── sections/            # Секции главной
│   │   ├── Hero/            # Главный экран
│   │   ├── Services/        # Услуги
│   │   ├── Advantages/      # Преимущества
│   │   ├── CTA/             # CTA-баннер
│   │   ├── Gallery/         # Галерея (lazy)
│   │   └── Reviews/         # Отзывы (lazy)
│   │
│   └── ui/                  # UI-компоненты
│       ├── ContactChoiceModal/  # Модалка «Позвонить или заявка»
│       ├── GalleryItem/          # Карточка фото
│       ├── Icon/                 # Все SVG-иконки
│       ├── Modal/                # Базовое модальное окно
│       ├── PhotoModal/           # Модалка просмотра фото
│       ├── RequestFormModal/     # Форма заявки
│       └── SectionHeader/        # Заголовок секции
│
├── context/
│   └── ModalContext.tsx     # Контекст для модалок
│
├── data/
│   ├── advantages.tsx       # Преимущества
│   ├── contacts.ts          # Контакты
│   ├── form.ts              # Опции формы
│   ├── gallery.ts           # Автогенерируемый список фото
│   └── services.tsx         # Услуги
│
├── hooks/
│   ├── useDocumentTitle.ts  # Динамический title
│   └── useLazyVisible.tsx   # IntersectionObserver для lazy-секций
│
├── pages/
│   ├── HomePage/            # Главная
│   ├── GalleryPage/         # Галерея
│   ├── PrivacyPolicyPage/   # Политика
│   └── ServiceDetail/       # Детали услуги
│
├── styles/
│   ├── components/          # Глобальные стили (Button, Modal, Section)
│   ├── globals.css          # Глобальные стили
│   └── variables.css        # CSS-переменные
│
├── types/
│   └── index.ts             # Общие типы
│
└── utils/
    ├── cn.ts                # Утилита для классов (заготовка)
    └── formatPhone.ts       # Форматирование телефона (заготовка)
```

## 🎨 Архитектура

### Контекст модалок

Все модалки управляются через `ModalContext`:

```tsx
const { openRequestModal, closeRequestModal } = useModalContext()
```

### Lazy loading

- **Страницы** — через `React.lazy` (в `App.tsx`)
- **Модалки** — через `React.lazy` (в `App.tsx`)
- **Секции Gallery и Reviews** — через `IntersectionObserver` (`useLazyVisible`)

### Оптимизация

- **React.memo** для карточек (`ServiceCard`, `AdvantageCard`, `GalleryItem`, `SectionHeader`)
- **useCallback**/**useMemo** в `ModalContext`
- **WebP** для изображений (с fallback на JPG через `<picture>`)
- **Manual chunks** — `react-vendor`, `router` выделены в отдельные чанки

## 🖼️ Работа с галереей

### Добавление новых фото

1. Скопируйте фото в `public/images/works/` (например, `37.jpg`)
2. Запустите:
   ```bash
   npm run generate-gallery
   ```
3. Готово! Фото автоматически появится в галерее

### Конвертация в WebP

1. Установите `sharp` (если не установлен):
   ```bash
   npm install --save-dev sharp
   ```
2. Запустите:
   ```bash
   npm run convert-to-webp
   ```
3. WebP-файлы создадутся рядом с JPG

## 🔍 SEO

- **Мета-теги** — `title`, `description`, `keywords`
- **Open Graph** — для соцсетей
- **Twitter Cards**
- **JSON-LD** — Schema.org `LocalBusiness`
- **`robots.txt`** и **`sitemap.xml`** в `public/`
- **Динамические title** — через `useDocumentTitle`

## 🚀 Производительность

| Метрика | Значение |
|---------|----------|
| Начальный бандл (gzip) | ~85 КБ |
| react-vendor (gzip) | ~60 КБ |
| router (gzip) | ~14 КБ |
| Lazy-чанки | 0.5–5 КБ каждый |
| Изображения | WebP (в 3-5 раз меньше JPG) |
| Первый рендер | Мгновенный |

## 📝 Разработка

### Стили

- CSS-переменные в `src/styles/variables.css`
- Компонентные стили — в папке компонента (`.css`)
- Глобальные — в `src/styles/globals.css`

### Компоненты

- Каждый компонент — в своей папке
- Структура: `Component.tsx`, `Component.css`, `index.ts`
- Импорт через `index.ts`: `import { Component } from './Component'`

### Данные

- Всё в `src/data/`
- Типы — в `src/types/`
- Галерея — автогенерируется скриптом

## 🌐 Деплой

### Nginx (рекомендуемая конфигурация)

```nginx
server {
  listen 80;
  server_name orgtechservice.ru;
  root /var/www/orgtechservice/dist;
  index index.html;

  # SPA fallback
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Gzip
  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;
  gzip_min_length 1000;

  # Кэш статики
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location /images/ {
    expires 30d;
    add_header Cache-Control "public";
  }
}
```

### Vercel / Netlify

Просто подключите репозиторий, build command: `npm run build`, output: `dist`.

## 📄 Лицензия

© 2026 ОргТехСервис. Все права защищены.