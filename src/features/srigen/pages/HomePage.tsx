'use client'
import Link from 'next/link'
import { brand } from '../config/brand'
import { boxContents, featureCards, imageRoot, images, looks, materials, quotes } from '../content/data'
import { useSrigenHost } from '../host'
import { pageHref } from '../routing'
import type { PageProps } from '../types'
import { Arrival, FlipCard, FloatingShoe, Manifesto, Reveal, ShoeBox, Shutter, Title } from '../components/Motion'
import { EndCTA, Shell } from '../components/Shell'
import { Countdown, SectionLabel, SpecTable } from '../components/UI'
import {Composition,DetailGallery,TechnicalScene,HingedReveal} from '../components/Scenes'

export default function HomePage({locale='zh',basePath}:PageProps) {
  const host=useSrigenHost()
  return <Shell locale={locale} basePath={basePath}>
    <section className="sg-hero" data-motion="shoe-box">
      <div className="sg-hero-meta"><span>● {locale==='zh'?'限量 — 300 双':'LIMITED — 300 PAIRS'}</span><span>REL. {brand.date}</span></div>
      <h1 className="sg-hero-word">{host.brandName[locale]}</h1>
      <ShoeBox locale={locale}/>
      <div className="sg-hero-bottom"><p>{locale==='zh'?'移动光标或轻触鞋盒 · 揭开 001':'RUN YOUR CURSOR OVER THE BOX'}</p><Link className="sg-pill" href={pageHref(basePath,locale,'drop')}>{locale==='zh'?'发售提醒':'Notify me'}</Link></div>
      <span className="sg-hero-copyright">® {host.brandName[locale]} INDUSTRIES</span>
    </section>
    <section className="sg-section sg-product" data-motion="floating-cards"><SectionLabel number="02">{locale==='zh'?'关于 001':'THE 001'}</SectionLabel><h2><Title highlight={locale==='zh'?'永不补货':'NO RESTOCK.'}>{locale==='zh'?'一双鞋\n一次发售\n永不补货':'ONE SHOE. ONE DROP.\nNO RESTOCK.'}</Title></h2><div className="sg-product-stage"><FloatingShoe/><div className="sg-feature-cards">{featureCards.map((card,i)=><Reveal className={`sg-feature-position sg-feature-${i}`} delay={i*0.07} key={card.title.en}><FlipCard label={locale==='zh'?`翻转查看${card.label.zh}`:`Flip to see ${card.label.en}`} front={<><i/><strong>{card.title[locale]}</strong><span>{card.body[locale]}</span><small>{locale==='zh'?'轻触翻面':'HOVER ↻'}</small></>} back={<><img src={imageRoot+card.image} alt={card.label[locale]}/><small>{card.label[locale]}</small></>}/></Reveal>)}</div></div><p className="sg-product-note">{locale==='zh'?'只裁切一次。300 双，一个配色，然后让模具永久退场。':'Cut once. Three hundred pairs, one colorway — then the mould is retired. Forever.'}</p></section>
    <Arrival locale={locale}/>
    <Manifesto locale={locale}/>
    <section className="sg-section sg-built"><SectionLabel number="05">{locale==='zh'?'精工打造 · 不止组装':'BUILT, NOT ASSEMBLED'}</SectionLabel><div className="sg-three-grid">{materials.map((item,i)=><HingedReveal key={item.title.en} index={i}><span className="sg-index">0{i+1}</span><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p></HingedReveal>)}</div></section>
    <section className="sg-section sg-anatomy-tease"><div className="sg-section-head"><SectionLabel number="06">{locale==='zh'?'解剖预告':'ANATOMY, TEASED'}</SectionLabel><Link href={pageHref(basePath,locale,'anatomy')}>{locale==='zh'?'查看完整解剖':'FULL TEARDOWN'}</Link></div><TechnicalScene locale={locale}/></section>
    <div className="sg-marquee" aria-label={locale==='zh'?'001 首次发售，限量 300 双，永不补货':'001 First drop, 300 pairs, no restock'}><div>{[0,1,2,3].map(i=><span aria-hidden={i>0} key={i}>{locale==='zh'?'SRIGEN 001　首次发售　限量 300　永不补货　':'SRIGEN 001　FIRST DROP　LIMITED — 300　NO RESTOCK　'}</span>)}</div></div>
    <section className="sg-section sg-in-box" data-motion="scroll-flip"><SectionLabel number="08">{locale==='zh'?'盒中之物':'WHAT’S IN THE BOX'}</SectionLabel><div className="sg-three-grid">{boxContents.map((item,i)=><FlipCard key={item.title.en} scrollFlip label={locale==='zh'?`翻转查看${item.title.zh}`:`Flip ${item.title.en}`} front={<><span className="sg-card-letter">{'ABC'[i]}</span><strong>{item.title[locale]}</strong><small>{locale==='zh'?'滚动翻面 · 轻触切换':'SCROLL TO FLIP'}</small></>} back={<><img src={imageRoot+item.image} alt={item.title[locale]}/><span>{item.body[locale]}</span><small>{item.title[locale]} — {locale==='zh'?'随盒附赠':'INCLUDED'}</small></>}/>)}</div></section>
    <Composition locale={locale}/>
    <DetailGallery locale={locale} basePath={basePath}/>
    <Shutter locale={locale}/>
    <SpecTable locale={locale}/>
    <section className="sg-section sg-story-tease"><img src={imageRoot+images.story} alt=""/><div className="sg-story-veil"/><div><SectionLabel number="13">{locale==='zh'?'我们的故事':'THE STORY'}</SectionLabel><h2><Title>{locale==='zh'?'让模具\n就此退场':'WE RETIRE\nTHE MOULD.'}</Title></h2><p>{locale==='zh'?'每一款轮廓都经过设计、裁切、编号，然后在公证人在场时销毁模具。这不是营销，而是契约。':"Every SRIGEN silhouette is designed, cut, numbered — and then the tooling is destroyed in front of a notary. That’s not marketing. It’s the contract."}</p><Link className="sg-text-link" href={pageHref(basePath,locale,'story')}>{locale==='zh'?'阅读品牌故事':'READ THE STORY'}</Link></div></section>
    <section className="sg-section sg-home-looks"><div className="sg-section-head"><SectionLabel number="14">{locale==='zh'?'穿上它 · 走上街头':'ON BODY, ON STREET'}</SectionLabel><Link href={pageHref(basePath,locale,'lookbook')}>{locale==='zh'?'查看街头图鉴':'SEE THE LOOKBOOK'}</Link></div><div className="sg-three-grid">{looks.slice(0,3).map((look,i)=><Reveal key={look.image} delay={i*0.12}><Link href={pageHref(basePath,locale,'lookbook')} className="sg-look"><img src={imageRoot+look.image} alt={look.title[locale]}/><span>LOOK 0{i+1}</span></Link></Reveal>)}</div></section>
    <section className="sg-section sg-drop-call"><SectionLabel number="15">{locale==='zh'?'限量首发':'THE DROP'}</SectionLabel><h2><Title>{locale==='zh'?'发售即是\n唯一入口':'THE DROP IS\nTHE STORE.'}</Title></h2><Countdown locale={locale}/><p className="sg-eyebrow">{brand.date} — 10:00 ET · {locale==='zh'?'300 双 · 唯一配色':'300 PAIRS · ONE COLORWAY'}</p><Link className="sg-pill" href={pageHref(basePath,locale,'drop')}>{locale==='zh'?'发售提醒':'Notify me'}</Link><p>{locale==='zh'?'不抽签 · 不补货 · 先到先得':'No raffles. No restocks. First come, first served.'}</p></section>
    <section className="sg-section sg-quotes"><SectionLabel number="16">{locale==='zh'?'街头之声':'THE WORD ON THE STREET'}</SectionLabel><div className="sg-three-grid">{quotes.map(([quote,author],i)=><Reveal key={author} delay={i%3*0.1}><blockquote><span>“</span><p>{quote[locale]}</p><cite>{author}</cite></blockquote></Reveal>)}</div></section>
    <EndCTA locale={locale} basePath={basePath}/>
  </Shell>
}
