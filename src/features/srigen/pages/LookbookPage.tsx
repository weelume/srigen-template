'use client'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { imageRoot, looks } from '../content/data'
import type { Locale, PageProps } from '../types'
import { Title } from '../components/Motion'
import {useSceneProgress} from '../components/scroll'
import { EndCTA, Shell } from '../components/Shell'
import { SectionLabel } from '../components/UI'

function Frame({look,index,locale}:{look:typeof looks[number];index:number;locale:Locale}) {
  const ref=useRef<HTMLElement>(null),reduced=useReducedMotion()
  const scrollYProgress=useSceneProgress({target:ref,offset:['start end','end start']})
  const y=useTransform(scrollYProgress,[0,1],['-8%','8%'])
  return <figure className={`sg-lookbook-frame sg-frame-${index}`} ref={ref}><div className="sg-photo-window"><motion.img src={imageRoot+look.image} alt={look.title[locale]} style={reduced?{}:{y}} loading={index<2?'eager':'lazy'}/><div className="sg-photo-stamp">001<br/>VOLT</div></div><figcaption><strong>{look.title[locale]}</strong><span>{locale==='zh'?'001 街头实录 · 画面':'001 IN THE WILD · FRAME'} 0{index+1}</span></figcaption></figure>
}
export default function LookbookPage({locale='zh',basePath}:PageProps) {
  return <Shell locale={locale} basePath={basePath}><section className="sg-section sg-inner-hero sg-lookbook-hero"><SectionLabel number="03">{locale==='zh'?'街头图鉴':'LOOKBOOK'}</SectionLabel><h1><Title highlight={locale==='zh'?'一座城市':'CITY.'}>{locale==='zh'?'一个夜晚\n一座城市':'ONE NIGHT,\nONE CITY.'}</Title></h1><p>{locale==='zh'?'让真正期待它的人穿上 001。从黄昏走到黎明，一条穿越城市的路线。没有影棚，没有修饰。':'The 001 shot on the people who asked for it — one route through the city, dusk to dawn. No studio, no retouching.'}</p></section><section className="sg-section sg-lookbook-grid" aria-label={locale==='zh'?'六组街头穿搭':'Six streetwear looks'}>{looks.map((look,index)=><Frame key={look.image} look={look} index={index} locale={locale}/>)}</section><EndCTA locale={locale} basePath={basePath} title={locale==='zh'?'就这样\n穿上街头':'WEAR IT\nLIKE THIS.'}/></Shell>
}
