// ===== Форма заявки =====
export interface FormData {
  name: string
  phone: string
  email?: string
  service?: string
  comment?: string
}

// Типы Service и Advantage переехали в src/data/services.tsx и src/data/advantages.tsx
// Тип ContactInfo — в src/data/contacts.ts (выводится автоматически через `as const`)