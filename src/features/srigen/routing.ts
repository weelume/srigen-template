import type { Locale } from './types'
export function parseRoute(parts: string[]) {
  return { locale: (parts[0] === 'en' ? 'en' : 'zh') as Locale, slug: (parts[0] === 'en' ? parts.slice(1) : parts).join('/') }
}
export function pageHref(base: string, locale: Locale, slug = '') {
  return `${base.replace(/\/$/, '')}${locale === 'en' ? '/en' : ''}${slug ? '/' + slug : ''}` || '/'
}
export function switchLanguage(base: string, locale: Locale, pathname: string, search: string, hash: string) {
  const local = pathname.slice(base.length).replace(/^\/en(?=\/|$)/, '').replace(/^\//, '')
  return pageHref(base, locale, local) + search + hash
}
