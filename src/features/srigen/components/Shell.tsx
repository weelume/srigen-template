'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { brand } from '../config/brand'
import { navigation } from '../content/data'
import { useSrigenHost } from '../host'
import { pageHref, switchLanguage } from '../routing'
import type { Locale, PageProps } from '../types'
import { Curtain, ease, Title } from './Motion'
import { Countdown } from './UI'
import { FooterWordmark, LaceCursor } from './Signature'

export function Shell({ children, locale = 'zh', basePath }: PageProps & { children: ReactNode }) {
  const [menu, setMenu] = useState(false)
  const [scrolled,setScrolled]=useState(false)
  const {scrollY}=useScroll()
  useMotionValueEvent(scrollY,'change',value=>setScrolled(value>24))
  const pathname = usePathname(), router = useRouter(), host = useSrigenHost(), reduced = useReducedMotion()
  const menuButton = useRef<HTMLButtonElement>(null), menuPanel = useRef<HTMLDivElement>(null)
  const [leaving,setLeaving]=useState(false)
  const routeTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined)
  useEffect(()=>()=>clearTimeout(routeTimer.current),[])
  useEffect(() => {
    const html = document.documentElement
    const oldTheme = html.getAttribute('data-srigen'), oldLang = html.lang
    html.dataset.srigen = 'active'; html.lang = locale === 'zh' ? 'zh-CN' : 'en'
    return () => { if(oldTheme === null) html.removeAttribute('data-srigen'); else html.dataset.srigen=oldTheme; html.lang=oldLang }
  },[locale])
  useEffect(() => {
    if(!menu)return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow='hidden'
    const first=menuPanel.current?.querySelector<HTMLAnchorElement>('a'); first?.focus()
    function keyboard(event: KeyboardEvent) {
      if(event.key==='Escape'){setMenu(false); menuButton.current?.focus()}
      if(event.key==='Tab') {
        const nodes = [menuButton.current,...Array.from(menuPanel.current?.querySelectorAll<HTMLElement>('a,button') ?? [])].filter((node):node is HTMLElement=>!!node)
        const firstNode=nodes[0], lastNode=nodes.at(-1)
        if(event.shiftKey && document.activeElement===firstNode){event.preventDefault();lastNode?.focus()}
        if(!event.shiftKey && document.activeElement===lastNode){event.preventDefault();firstNode?.focus()}
      }
    }
    document.addEventListener('keydown',keyboard)
    return () => {document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',keyboard)}
  },[menu])
  function language() {
    router.push(switchLanguage(basePath, locale==='zh'?'en':'zh', pathname, location.search, location.hash),{scroll:false})
    setMenu(false)
  }
  function transition(event:MouseEvent<HTMLDivElement>) {
    if(reduced||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
    const anchor=event.target instanceof Element?event.target.closest('a'):null
    const href=anchor?.getAttribute('href')
    if(!href||!href.startsWith('/')||anchor?.target==='_blank'||(basePath&&!href.startsWith(basePath+'/')&&href!==basePath)||href===pathname)return
    event.preventDefault();setMenu(false);setLeaving(true)
    clearTimeout(routeTimer.current);routeTimer.current=setTimeout(()=>router.push(href),450)
  }
  return <div className={`sg-root sg-${locale}`} lang={locale === 'zh' ? 'zh-CN' : 'en'} onClickCapture={transition} inert={leaving} aria-busy={leaving}>
    <a className="sg-skip" href="#sg-main">{locale==='zh'?'跳至内容':'Skip to content'}</a>
    <Curtain/>
    {leaving&&<motion.div className="sg-route-cover" aria-hidden="true" initial={{y:'100%'}} animate={{y:0}} transition={{duration:.45,ease}}><svg viewBox="0 0 1440 40"><motion.path d="M0 20 H360 Q400 2 440 20 T520 20 H1440" fill="none" stroke="currentColor" strokeWidth="4" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.55,repeat:Infinity}}/></svg></motion.div>}
    <LaceCursor/>
    <header className={`sg-header ${scrolled?'sg-header-scrolled':''} ${menu?'sg-menu-open':''}`}>
      <Link className="sg-logo" href={pageHref(basePath,locale)} aria-label={locale==='zh'?'返回首页':'Home'} onClick={()=>setMenu(false)}>{host.logoSrc?<img src={host.logoSrc} alt=""/>:null}<strong>{host.brandName[locale]}</strong><span>001</span></Link>
      <nav aria-label={locale==='zh'?'主导航':'Main navigation'} className="sg-desktop-nav">{navigation.map(item=><Link key={item.slug} href={pageHref(basePath,locale,item.slug)} aria-current={pathname.endsWith('/'+item.slug)?'page':undefined}>{item.title[locale]}</Link>)}</nav>
      <div className="sg-nav-actions"><button className="sg-language" onClick={language} aria-label={locale==='zh'?'Switch to English':'切换到中文'}>{locale==='zh'?'EN':'中'}</button><Link className="sg-pill sg-nav-cta" href={pageHref(basePath,locale,'drop')}>{locale==='zh'?'发售提醒':'Notify me'}</Link><button className="sg-menu-toggle" ref={menuButton} aria-expanded={menu} aria-controls="sg-menu" aria-label={menu?(locale==='zh'?'关闭菜单':'Close menu'):(locale==='zh'?'打开菜单':'Open menu')} onClick={()=>setMenu(value=>!value)}><i/><i/></button></div>
    </header>
    <AnimatePresence>{menu&&<motion.div id="sg-menu" ref={menuPanel} role="dialog" aria-modal="true" aria-label={locale==='zh'?'导航菜单':'Navigation menu'} className="sg-menu-panel" initial={reduced?false:{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} transition={{duration:reduced?0:0.6,ease}}><nav>{navigation.map((item,i)=><motion.div key={item.slug} initial={reduced?false:{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:i*0.08+0.15,ease,duration:0.6}}><Link href={pageHref(basePath,locale,item.slug)} onClick={()=>setMenu(false)}><small>0{i+1}</small>{item.title[locale]}</Link></motion.div>)}</nav><p>001 — {locale==='zh'?'限量 300 双 · 永不补货':'300 PAIRS · NO RESTOCK'}</p><Link className="sg-pill" href={pageHref(basePath,locale,'drop')} onClick={()=>setMenu(false)}>{locale==='zh'?'发售提醒':'Notify me'}</Link></motion.div>}</AnimatePresence>
    <main id="sg-main" key={pathname} inert={menu}>{children}</main>
    <Footer locale={locale} basePath={basePath}/>
    {host.marketplaceHref&&<Link className="sg-market" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]??(locale==='zh'?'打开模板市场':'Open template marketplace')}>{host.lightLogoSrc&&<img src={host.lightLogoSrc} alt=""/>}<span>{host.brandName[locale]}</span></Link>}
  </div>
}
function Footer({locale,basePath}:{locale:Locale;basePath:string}) {
  const host=useSrigenHost(), reduced=useReducedMotion()
  return <footer className="sg-footer sg-section"><div className="sg-footer-cols"><div><p className="sg-eyebrow">001 — {locale==='zh'?'首次发售':'FIRST DROP'}</p><h2>{locale==='zh'?<>一双鞋<br/>一次发售<br/>永不补货</>:<>ONE SHOE.<br/>ONE DROP.<br/>NO RESTOCK. EVER.</>}</h2></div><div><p className="sg-eyebrow">{locale==='zh'?'导航':'MENU'}</p>{navigation.map(item=><Link key={item.slug} href={pageHref(basePath,locale,item.slug)}>{item.title[locale]}</Link>)}</div><div><p className="sg-eyebrow">{locale==='zh'?'发售信息':'DROP INFO'}</p><p>REL. {brand.date} — 10:00 ET</p><p>{locale==='zh'?'全球限量 300 双':'300 pairs worldwide'}</p><p>{locale==='zh'?'单一配色 — 骨白 / 荧光绿':'One colorway — Bone / Volt'}</p><p className="sg-next-drop"><i/>{locale==='zh'?'下一次发售':'NEXT DROP'}<Countdown compact locale={locale}/></p></div></div><FooterWordmark word={host.brandName[locale]}/><div className="sg-footer-bottom"><p>© {new Date().getFullYear()} {host.brandName[locale]} · {locale==='zh'?'让每一次限量都值得等待':'MADE TO RUN OUT'}</p>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]??(locale==='zh'?'模板市场':'Template marketplace')}</Link>}{host.filing}<button className="sg-top" aria-label={locale==='zh'?'返回顶部':'Back to top'} onClick={()=>window.scrollTo({top:0,behavior:reduced?'instant':'smooth'})}>↑</button></div></footer>
}
export function EndCTA({locale,basePath,title}:{locale:Locale;basePath:string;title?:string}) {
  return <section className="sg-end-cta sg-section"><p className="sg-eyebrow">{title?'001':'17'} — {locale==='zh'?'邀你入场':'THE INVITATION'}</p><h2><Title>{title??(locale==='zh'?'别错过\n这次首发':'DON’T MISS\nTHE DROP.')}</Title></h2><Link className="sg-pill" href={pageHref(basePath,locale,'drop')}>{locale==='zh'?'获取发售提醒':'Get notified'}</Link><p className="sg-eyebrow">SRIGEN 001 — {brand.date}</p></section>
}
