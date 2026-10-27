import type { ReactNode } from 'react'
import '../features/srigen/theme.css'
export const metadata={title:'SRIGEN — 001 First Drop',description:'一双鞋，一次发售。全球限量 300 双。One silhouette. One drop. 300 pairs.'}
export default function RootLayout({children}:{children:ReactNode}) {return <html lang="zh-CN"><body style={{margin:0}}>{children}</body></html>}
