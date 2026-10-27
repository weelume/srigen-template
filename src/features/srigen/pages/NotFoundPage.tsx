'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FloatingShoe, Title } from '../components/Motion'
import { Shell } from '../components/Shell'
import { pageHref } from '../routing'
import type { PageProps } from '../types'
export default function NotFoundPage({locale:configured,basePath}:PageProps) {
  const path=usePathname(),locale=configured??(path.startsWith('/en/')||path==='/en'?'en':'zh')
  return <Shell locale={locale} basePath={basePath}><section className="sg-section sg-not-found"><div className="sg-inner-shoe"><FloatingShoe/></div><p className="sg-eyebrow">404 — {locale==='zh'?'这个页面已售罄':'SOLD OUT OF PAGES'}</p><h1><Title>{locale==='zh'?'这一双\n并不存在':'THIS PAIR\nDOESN’T EXIST.'}</Title></h1><p>{locale==='zh'?'这个页面也许已经随模具一起退场。001 依然真实存在，300 双，只有一个入口。':'Whatever was here got the mould treatment. The 001 is still very real — 300 pairs, one door in.'}</p><Link className="sg-pill" href={pageHref(basePath,locale,'drop')}>{locale==='zh'?'获取发售提醒':'Notify me for the drop'}</Link><Link className="sg-text-link" href={pageHref(basePath,locale)}>{locale==='zh'?'返回首页':'Back to the one page that matters'}</Link></section></Shell>
}
