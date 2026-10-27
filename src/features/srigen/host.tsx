'use client'
import { createContext, useContext, type ReactNode } from 'react'
import { brand } from './config/brand'
export interface SrigenHostConfig {
  brandName?: { zh: string; en: string }
  logoSrc?: string
  lightLogoSrc?: string
  marketplaceHref?: string
  marketplaceAriaLabel?: { zh: string; en: string }
  marketplaceLabel?: { zh: string; en: string }
  filing?: ReactNode
}
const HostContext = createContext<SrigenHostConfig>({})
export function SrigenHostProvider({ children, ...config }: SrigenHostConfig & { children: ReactNode }) {
  return <HostContext.Provider value={config}>{children}</HostContext.Provider>
}
export function useSrigenHost() {
  const host = useContext(HostContext)
  return { ...host, brandName: host.brandName ?? brand.name }
}
