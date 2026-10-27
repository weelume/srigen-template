export type Locale = 'zh' | 'en'
export interface PageProps { locale?: Locale; basePath: string }
export interface Bilingual { zh: string; en: string }
export const bi = (zh: string, en: string): Bilingual => ({ zh, en })
